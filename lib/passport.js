import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import jwtDecode from "jwt-decode";

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://auth.swoop.email/oauth2/authorize",
      tokenURL: "https://auth.swoop.email/oauth2/token",
      clientID: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      callbackURL: `${process.env.SITE}/api/auth/callback`,
      passReqToCallback: true,
    },
    async function (req, _accessToken, _refreshToken, params, _profile, done) {
      try {
        const swoop = jwtDecode(params.id_token);
        let email = swoop.email;

        let user = await req.db.collection("users").findOneAndUpdate(
          { email: email },
          { $setOnInsert: { email: email } },
          {
            projection: { email: 1, username: 1, role: 1, terms: 1 },
            upsert: true,
            returnOriginal: false,
          }
        );

        return done(null, user.value);
      } catch (error) {
        console.log(error);
        return done(
          new Error("Failed to retreive email from Swoop:" + error.message)
        );
      }
    }
  )
);

export default passport;

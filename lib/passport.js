import passport from "passport";
import OAuth2Strategy from "passport-oauth2";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://auth.swoop.email/oauth2/authorize",
      tokenURL: "https://auth.swoop.email/oauth2/token",
      clientID: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      callbackURL: `${process.env.SITE}/api/auth/callback`,
    },
    function (_accessToken, _refreshToken, params, profile, done) {
      console.log("Params", params);
      console.log("Profile", profile);
      done(null, profile); //TODO: profile is an empty object, use jwtDecode(params.id_token);
    }
  )
);

export default passport;

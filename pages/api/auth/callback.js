import nextConnect from "next-connect";
import middleware from "../../../middleware";
import passport from "../../../lib/passport";

const handler = nextConnect();
handler.use(middleware);

handler.get(
  passport.authenticate("oauth2", { session: false }),
  async (req, res) => {
    try {
      //setting the result of Swoop oauth in session
      req.session.set("user", req.user);
      await req.session.save();
    } catch (error) {
      console.log(error);
    }
    res.status(307);
    res.setHeader("Location", "/callback");
    res.setHeader("Content-Length", 0);
    res.end();
  }
);

export default handler;

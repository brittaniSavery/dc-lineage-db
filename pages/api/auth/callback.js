import nextConnect from "next-connect";
import middleware from "../../../middleware";
import passport from "../../../lib/passport";

const handler = nextConnect();
handler.use(middleware);

handler.get(passport.authenticate("oauth2", { session: true }), (req, res) => {
  console.log(req.user);
  res.redirect("/");
});

export default handler;

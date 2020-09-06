import nextConnect from "next-connect";
import middleware from "../../../middleware";
import passport from "../../../lib/passport";

const handler = nextConnect();
handler.use(middleware);

handler.get(passport.authenticate("oauth2", { scope: ["email"] }));

export default handler;

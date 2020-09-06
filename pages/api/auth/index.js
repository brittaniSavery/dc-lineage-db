import nextConnect from "next-connect";
import middleware from "../../../middleware";
import next from "next";

const handler = nextConnect();
handler.use(middleware);

handler.get((req, res) => {
  try {
    const user = req.session.get("user") || {};
    res.json(user);
  } catch (error) {
    next(Error(error));
  }
});

export default handler;

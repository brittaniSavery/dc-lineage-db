import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  res.json(req.user || { message: "Not Logged In" });
});

export default handler;

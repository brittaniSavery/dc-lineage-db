import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();
handler.use(middleware);

//TODO : get/search users
handler.get(async (req, res) => {
  res.end();
});

export default handler;

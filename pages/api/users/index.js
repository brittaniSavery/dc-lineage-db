import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let users = await req.db.collection("users").distinct("username");

  res.json(users.sort());
});

export default handler;

import nextConnect from "next-connect";
import middleware from "../../../middleware";
import { getAllUsers } from "../../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const users = await getAllUsers(req.db);
  res.json(users);
});

export default handler;

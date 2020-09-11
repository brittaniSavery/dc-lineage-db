import nextConnect from "next-connect";
import middleware from "../../../middleware";
import { createMongoQueryForFind } from "../../../lib/helpers";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let query = createMongoQueryForFind(req.query);
  let users = await req.db
    .collection("users")
    .find(query)
    .sort({ username: 1 })
    .toArray();
  res.json(users);
});

export default handler;

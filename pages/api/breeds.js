import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  //let doc = await req.db.collection("breeds").find().toArray();
  let query = req.query;
  for (const prop in query) {
    const value = query[prop];
    query[prop] = Number.isInteger(+value) ? Boolean(value) : value;
  }
  res.json(query);
});

export default handler;

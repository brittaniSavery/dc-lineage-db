import nextConnect from "next-connect";
import database from "../../../middleware/database";
import { createMongoQueryForFind } from "../../../lib/helpers";

const handler = nextConnect();
handler.use(database);

/** GET: All lineage data based on search criteria */
handler.get(async (req, res) => {
  let query = createMongoQueryForFind(req.query);

  const lineages = await req.db
    .collection("lineages")
    .find(query)
    .sort({ maleBreed: 1 })
    .skip(req.query.skip || 0)
    .limit(req.query.limit || 200)
    .toArray();

  res.json(lineages);
});

handler.post(async (req, res, next) => {
  try {
    const db = req.db.collection("lineages");
    let result = await db.insertOne(req.body);
    res.status(201);
    res.json({ lineageId: result.insertedId });
  } catch (error) {
    next(Error(error));
  }
});

export default handler;

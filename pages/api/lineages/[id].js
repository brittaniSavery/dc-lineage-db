import nextConnect from "next-connect";
import { ObjectId } from "mongodb";
import database, { getLineageById } from "../../../middleware/database";

const handler = nextConnect();
handler.use(database);

/** GET: Retrieves a specific lineage */
handler.get(async (req, res) => {
  let lineage = await getLineageById(req.db, req.query.id);

  if (lineage) {
    res.json(lineage);
  } else {
    res.status(404);
    res.send("Lineage not found.");
  }
});

handler.delete(async (req, res, next) => {
  try {
    const dbResult = await req.db
      .collection("lineages")
      .deleteOne({ _id: ObjectId(req.query.id) });

    if (dbResult.deletedCount === 0) {
      res.status(404);
      res.send("Lineage not found.");
    } else if (dbResult.result.ok) {
      res.status(204).end();
    } else {
      next(Error("Deletion failed."));
    }
  } catch (error) {
    next(Error(error));
  }
});

/**PUT: Update a specific lineage */
handler.put(async (req, res, next) => {
  const id = req.query.id;

  try {
    const dbResult = await req.db
      .collection("lineages")
      .replaceOne({ _id: ObjectId(id) }, req.body);

    if (dbResult.matchedCount === 0) {
      res.status(404);
      res.send("Lineage not found.");
    } else if (!dbResult.result.ok) {
      next(Error("Update failed."));
    } else {
      res.status(204).end();
    }
  } catch (error) {
    next(Error(error));
  }
});

export default handler;

import nextConnect from "next-connect";
import { ObjectId } from "mongodb";
import database from "../../../middleware/database";

const handler = nextConnect();
handler.use(database);

/** GET: Retrieves a specific lineage */
handler.get(async (req, res) => {
  let lineage = await req.db
    .collection("lineages")
    .findOne({ _id: ObjectId(req.query.id) });

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

    if (dbResult.result.n === 0) {
      res.status(404);
      res.send("Lineage not found.");
    } else if (dbResult.result.ok) res.status(204).end();
    else next(Error("Deletion failed."));
  } catch (error) {
    next(Error(error));
  }
});

/**PATCH: Update a specific lineage */
/* handler.patch(async (req, res, next) => {
  const id = req.query.id;

  try {
    let result = await req.db
      .collection("breeds")
      .updateOne({ _id: ObjectId(breedId) }, { $set: req.body });

    if (result.matchedCount === 0) {
      res.status(404);
      res.send("Breed not found.");
    } else if (result.modifiedCount === 0) {
      next(Error("Update failed."));
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(Error(error));
  }
}); */

export default handler;

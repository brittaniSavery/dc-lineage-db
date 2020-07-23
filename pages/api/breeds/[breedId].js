import nextConnect from "next-connect";
import { ObjectId } from "mongodb";
import database from "../../../middleware/database";

const handler = nextConnect();
handler.use(database);

/** GET: Retrieves a specific breed */
handler.get(async (req, res) => {
  console.log(req.query);
  let breed = await req.db
    .collection("breeds")
    .findOne({ _id: ObjectId(req.query.breedId) });

  if (breed) {
    res.json(breed);
  } else {
    res.status(404);
    res.send("Breed not found.");
  }
});

/**PATCH: Update a specific breed */
handler.patch(async (req, res, next) => {
  const breedId = req.query.breedId;

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
});

export default handler;

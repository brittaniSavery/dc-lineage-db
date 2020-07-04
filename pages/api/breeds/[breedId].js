import nextConnect from "next-connect";
import { ObjectId } from "mongodb";
import database from "../../../middleware/database";

const handler = nextConnect();
handler.use(database);

/** GET: A specific breed */
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

export default handler;

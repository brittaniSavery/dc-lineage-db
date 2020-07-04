import nextConnect from "next-connect";
import database from "../../../middleware/database";
import { createMongoQuery } from "../../../middleware/helpers";
import escapeRegExp from "lodash.escaperegexp";

const handler = nextConnect();
handler.use(database);

/** GET: All breed data based on search criteria */
handler.get(async (req, res) => {
  let query = createMongoQuery(req.query);
  let breeds = await req.db
    .collection("breeds")
    .find(query)
    .sort({ name: 1 })
    .toArray();
  res.json(breeds);
});

/** POST: Add new breed */
handler.post(async (req, res, next) => {
  let breed = req.body;
  try {
    const dbo = req.db.collection("breeds");

    //Check for duplicate
    let check = await dbo.findOne({
      name: new RegExp(escapeRegExp(breed.name), "i"),
    });
    if (check) {
      res.status(400);
      res.send("Breed already exists.");
    } else {
      let result = await dbo.insertOne(breed);
      res.status(201);
      res.json({ breedId: result.insertedId });
    }
  } catch (err) {
    next(Error(err));
  }
});

export default handler;

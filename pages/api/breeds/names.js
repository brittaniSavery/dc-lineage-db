import nextConnect from "next-connect";
import database from "../../../middleware/database";
import { createMongoQuery } from "../../../middleware/helpers";

/** GET: Array of breed names based on search criteria */
const namesOnly = nextConnect()
  .use(database)
  .get(async (req, res) => {
    let query = createMongoQuery(req.query);
    console.log(query);
    let breeds = await req.db.collection("breeds").distinct("name", query);
    breeds.sort();
    res.json(breeds);
  });

export default namesOnly;

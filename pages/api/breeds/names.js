import nextConnect from "next-connect";
import database, {
  getAllBreedNames,
  getMaleBreedNames,
  getFemaleBreedNames,
} from "../../../middleware/database";

const handler = nextConnect();
handler.use(database);

/** GET: All breed (names only) */
handler.get(async (req, res) => {
  let names = [];

  switch (req.query.type) {
    case "male":
      names = await getMaleBreedNames(req.db);
      break;
    case "female":
      names = await getFemaleBreedNames(req.db);
      break;
    default:
      names = await getAllBreedNames(req.db);
  }
  res.json(names);
});

export default handler;

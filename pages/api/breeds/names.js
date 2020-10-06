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
  let names;

  switch (req.query.type) {
    case "male":
      names = getMaleBreedNames(req.db);
      break;
    case "female":
      names = getFemaleBreedNames(req.db);
      break;
    default:
      names = getAllBreedNames(req.db);
  }
  res.json(names);
});

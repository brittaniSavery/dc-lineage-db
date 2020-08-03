import nextConnect from "next-connect";
import database from "../../../middleware/database";
import { createMongoQuery } from "../../../lib/helpers";
import escapeRegExp from "lodash.escaperegexp";

const handler = nextConnect();
handler.use(database);

/** GET: All lineage data based on search criteria */
handler.get(async (req, res) => {
  let query = createMongoQuery(req.query);
  let lineages = await req.db
    .collection("lineages")
    .find(query)
    .sort({ maleBreed: 1 })
    .toArray();
  res.json(lineages);
});

handler.post(async (req, res) => {
  const breedDb = req.db.collection("breeds");
  const lineagesDb = req.db.collection("lineages"); // eslint-disable-line no-unused-vars
  let lineage = req.body;

  const maleBreedFull = await breedDb.findOne({
    name: new RegExp(escapeRegExp(lineage.male.breed), "i"),
  });
  const femaleBreedFull = await breedDb.findOne({
    name: new RegExp(escapeRegExp(lineage.female.breed), "i"),
  });

  //making sure the combination is valid (drake with drake, pygmy with pygmy, etc.)
  const maleType = getBreedType(maleBreedFull);
  const femaleType = getBreedType(femaleBreedFull);
  if (maleType !== femaleType) {
    res.status(400);
    res.send(`A ${maleType} cannot breed with a ${femaleType}`);
    return;
  }

  //determining if the lineage contains any holiday dragons
  let holiday = [];
  if (maleBreedFull.holiday) holiday.push(maleBreedFull.holiday);
  if (femaleBreedFull.holiday) holiday.push(femaleBreedFull.holiday);
  if (holiday.length > 0) lineage.holiday = holiday;

  lineage.offspring = getLineageOffspring(maleBreedFull, femaleBreedFull);
  lineage.shiny = maleBreedFull.shiny || femaleBreedFull.shiny;

  let result = await lineagesDb.insertOne(lineage);
  res.status(201);
  res.json({ lineageId: result.insertedId });
});

//#region helper functions

/**
 * Returns the type of dragon a specific breed is
 * @param {object} breed
 */
function getBreedType(breed) {
  if (breed.drake) return "Drake";
  else if (breed.twoHead) return "Two-Headed Dragon";
  else if (breed.pygmy) return "Pygmy Dragon";
  else return "Regular Dragon";
}

/**
 * Generates the potential offspring breeds between the `male` and `female` dragons
 * @param {object} male - breed of the male dragon
 * @param {object} female - breed of the female dragon
 */
function getLineageOffspring(male, female) {
  //adding parents' breeeds and/or any variants
  let offspring = [
    ...(male.variants || [male.name]),
    ...(female.variants || [female.name]),
  ];

  //seeing if there are any hybrids shared between the two breeds
  if (male.hybrids && female.hybrids) {
    const hybrids = male.hybrids.filter((h) => female.hybrids.includes(h));
    offspring.push(...hybrids);
  }

  return offspring;
}

//#endregion

export default handler;

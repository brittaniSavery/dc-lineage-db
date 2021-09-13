import nextConnect from "next-connect";
import database from "../../../middleware/database";
import escapeRegExp from "lodash.escaperegexp";
import { DRAGON_TYPES } from "../../../lib/constants";

const handler = nextConnect();
handler.use(database);

handler.get(async (req, res) => {
  const db = req.db.collection("breeds");
  const maleName = req.query.male;
  const femaleName = req.query.female;

  const male = await db.findOne({
    name: new RegExp("^" + escapeRegExp(maleName) + "$", "i"),
  });
  const female = await db.findOne({
    name: new RegExp("^" + escapeRegExp(femaleName) + "$", "i"),
  });

  //making sure the combination is valid (drake with drake, pygmy with pygmy, etc.)
  if (male.type !== female.type) {
    res.status(400);
    res.send(
      `A ${DRAGON_TYPES[male.type]} cannot breed with a ${
        DRAGON_TYPES[female.type]
      }`
    );
    return;
  }

  let lineage = {};

  // determining if the lineage contains any holiday dragons
  let holiday = [];
  if (male.holiday) holiday.push(male.holiday);
  if (female.holiday) holiday.push(female.holiday);
  if (holiday.length > 0) lineage.holiday = holiday;

  res.json(lineage);
});

export default handler;

//#region helper functions

/**
 * Generates the potential offspring breeds between the `male` and `female` dragons
 * @param {object} male - breed of the male dragon
 * @param {object} female - breed of the female dragon
 */
// function getLineageOffspring(male, female) {
//   //adding parents' breeds and/or any variants
//   let offspring = [
//     ...(male.variants || [male.name]),
//     ...(female.variants || [female.name]),
//   ];

//   //seeing if there are any hybrids shared between the two breeds
//   if (male.hybrids && female.hybrids) {
//     const hybrids = male.hybrids.filter((h) => female.hybrids.includes(h));
//     offspring.push(...hybrids);
//   }

//   return offspring;
// }

// lineage.offspring = getLineageOffspring(male, female);

//#endregion

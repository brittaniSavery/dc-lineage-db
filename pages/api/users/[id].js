import nextConnect from "next-connect";
import middleware from "../../../middleware";
import { ObjectId } from "mongodb";
import escapeRegExp from "lodash.escaperegexp";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let user = await req.db
    .collection("users")
    .findOne({ _id: ObjectId(req.query.id) });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    res.send("User not found.");
  }
});

handler.put(async (req, res) => {
  const data = req.body;
  const check = await req.db
    .collection("users")
    .findOne({ username: new RegExp(escapeRegExp(data.username), "i") });

  if (check) {
    res.status(400);
    return res.send("Username is already taken.");
  }

  const result = await req.db.collection("users").findOneAndReplace(
    { _id: ObjectId(req.query.id) },
    { ...data },
    {
      projection: { email: 1, username: 1, role: 1, terms: 1 },
      returnOriginal: false,
    }
  );
  res.json(result.value);
});

export default handler;

import { MongoClient, ObjectId } from "mongodb";

const uri = `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function databaseSetup() {
  if (!client.isConnected()) await client.connect();
  return { dbClient: client, db: client.db(process.env.DATABASE_NAME) };
}

export async function getMaleBreedNames(db) {
  let breeds = await db.collection("breeds").distinct("name", { male: true });
  return breeds.sort();
}

export async function getFemaleBreedNames(db) {
  let breeds = await db.collection("breeds").distinct("name", { female: true });
  return breeds.sort();
}

export async function getAllBreedNames(db) {
  let breeds = await db.collection("breeds").distinct("name");
  return breeds.sort();
}

export async function getAllUsers(db) {
  let users = await db.collection("users").distinct("username");
  return users.sort();
}

export async function getLineageById(db, id) {
  return db.collection("lineages").findOne({ _id: ObjectId(id) });
}

export default async function databaseMiddleware(req, res, next) {
  const dbSetup = await databaseSetup();
  req.dbClient = dbSetup.dbClient;
  req.db = dbSetup.db;
  return next();
}

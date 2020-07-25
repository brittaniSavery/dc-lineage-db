import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

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

async function databaseMiddleware(req, res, next) {
  const dbSetup = await databaseSetup();
  req.dbClient = dbSetup.dbClient;
  req.db = dbSetup.db;
  return next();
}

const middleware = nextConnect();
middleware.use(databaseMiddleware);

export default middleware;

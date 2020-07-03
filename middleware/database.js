import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const uri = `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DATABASE_NAME);
  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;

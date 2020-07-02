import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@personal.av9ft.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
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

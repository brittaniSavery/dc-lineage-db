import { getMaleBreedNames, getFemaleBreedNames } from "../middleware/database";
import { MongoClient } from "mongodb";
import { breeds, maleBreedNames, femaleBreedNames } from "./test-constants";

let client;
let db;

beforeAll(async () => {
  client = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(global.__MONGO_DB_NAME__);
  await db.collection("breeds").insertMany(breeds);
});

afterAll(async () => {
  await client.close();
});

test("Returns all male breed names", async () => {
  const breeds = await getMaleBreedNames(db);
  expect(breeds).toEqual(expect.arrayContaining(maleBreedNames));
  expect(breeds).not.toEqual(expect.arrayContaining(femaleBreedNames));
});

test("Returns all female breed names", async () => {
  const breeds = await getFemaleBreedNames(db);
  expect(breeds).not.toEqual(expect.arrayContaining(maleBreedNames));
  expect(breeds).toEqual(expect.arrayContaining(femaleBreedNames));
});

/**
 * Extending the {expect} matcher to check if object within an array contains a specific set of properties
 * @param {Array} received - The array to seach within
 * @param {object} argument - The object of the set of properties to be find in array
 */
expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

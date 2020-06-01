const {
  getMaleBreeds,
  getFemaleBreeds,
  getRegularBreeds,
  getDrakeBreeds,
  getPygmyBreeds,
  getTwoHeadedBreeds,
} = require("../lib/breeds");

test("Returns all male breeds", () => {
  const breeds = getMaleBreeds();
  expect(breeds).toContainObject({ male: true });
});

test("Returns all female breeds", () => {
  const breeds = getFemaleBreeds();
  expect(breeds).toContainObject({ female: true });
});

test("Returns all regular breeds", () => {
  const breeds = getRegularBreeds();
  expect(breeds).toContainObject({
    drake: false,
    twoHead: false,
    pygmy: false,
  });
});

test("Returns all pygmy breeds", () => {
  const breeds = getPygmyBreeds();
  expect(breeds).toContainObject({ drake: false, twoHead: false, pygmy: true });
});

test("Returns all drake breeds", () => {
  const breeds = getDrakeBreeds();
  expect(breeds).toContainObject({ drake: true, twoHead: false, pygmy: false });
});

test("Returns all twoheaded breeds", () => {
  const breeds = getTwoHeadedBreeds();
  expect(breeds).toContainObject({ drake: false, twoHead: true, pygmy: false });
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

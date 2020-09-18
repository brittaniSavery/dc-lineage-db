export function createMongoQueryForFind(query) {
  let searchParams = {};

  //handling the OR condition for breed of dragons in lineages
  if (Object.prototype.hasOwnProperty.call(query, "allBreed")) {
    searchParams["$or"] = [
      { "male.breed": query.allBreed },
      { "female.breed": query.allBreed },
    ];
  }
  //handling the AND condition for breed of dragons in lineages
  else if (
    Object.prototype.hasOwnProperty.call(query, "maleBreed") ||
    Object.prototype.hasOwnProperty.call(query, "femaleBreed")
  ) {
    const maleBreed = query.maleBreed && { "male.breed": query.maleBreed };
    const femaleBreed = query.femaleBreed && {
      "female.breed": query.femaleBreed,
    };

    if (maleBreed && femaleBreed) {
      searchParams["$and"] = [maleBreed, femaleBreed];
    } else {
      searchParams = { ...searchParams, ...maleBreed, ...femaleBreed };
    }
  }
  //handling all other individual conditions
  else {
    for (const prop in query) {
      if (["skip", "limit", "public"].includes(prop)) continue;

      const value = query[prop];
      searchParams[prop] =
        prop !== "generation" && Number.isInteger(+value)
          ? Boolean(+value)
          : value;
    }
  }

  return searchParams;
}

/**
 * Generates an option array (with the `{label: string, value: any}` structure) to be consumed in a React-Select component. This wrapper was created due to the fact that React-Select requires `options` to be an array of objects with a very specific structure. If `options` is not in the correct structure, there will be unexpected results with the React-Select component.
 * @param {Array} options - list of options to be included in React-Select
 * @param {Function} getOptionLabel - generates the "Label" for the options
 * @param {Function} getOptionValue - generates the "Value" for the options
 */
export function createReactSelectOptions(
  options,
  getOptionLabel,
  getOptionValue
) {
  return options.map((option) => ({
    label: getOptionLabel(option),
    value: getOptionValue(option),
  }));
}

/**
 * Generates the text of a dragon's "name", which could be an actual name or the dragon's code or [Pending] for dragons not yet added to a lineage.
 * @param {object} dragon - object holding all the information of a dragon
 */
export function getDragonDisplay(dragon) {
  return dragon.name || (dragon.code && `(${dragon.code})`) || "[Pending]";
}

export function checkAuth(req) {
  const user = req.session.get("user") || null;

  //user is not logged-in, so cannot do any updates or inserts
  if (!user) return false;
}

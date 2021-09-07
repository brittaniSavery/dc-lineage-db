import { FORM_ERROR } from "final-form";
import React from "react";
import ExternalLink from "../components/ExternalLink";

/**
 * Takes an object (usually built from a query string) and transforms it into a search query that mongodb can understand
 * @param {object} query - contains the search criteria
 */
export function getMongoQueryForFind(query) {
  let searchParams = [];
  const utilFields = ["skip", "limit", "public"];
  const numericFields = ["generation", "holidayYear"];

  for (const prop in query) {
    if (utilFields.includes(prop)) continue;

    const value = query[prop];
    if (prop === "allBreed") {
      searchParams.push({
        $or: [
          { "male.breed": query.allBreed },
          { "female.breed": query.allBreed },
        ],
      });
    } else if (prop === "maleBreed" || prop === "femaleBreed") {
      if (query.maleBreed) {
        searchParams.push({ "male.breed": query.maleBreed });
        delete query.maleBreed;
      }

      if (query.femaleBreed) {
        searchParams.push({
          "female.breed": query.femaleBreed,
        });
        delete query.femaleBreed;
      }
    } else if (prop === "status") {
      if (query.status === "mate") {
        searchParams.push({
          $or: [
            { "male.code": { $exists: false } },
            { "female.code": { $exists: false } },
          ],
        });
      } else {
        searchParams.push(
          { "male.code": { $exists: true } },
          { "female.code": { $exists: true } },
          { sample: { $exists: query.status === "offspring" ? false : true } }
        );
      }
    } else if (prop === "holiday") {
      searchParams.push({ holiday: { ["$all"]: query.holiday.split(",") } });
    } else if (numericFields.includes(prop)) {
      searchParams.push({ [prop]: +value });
    } else {
      searchParams.push({
        [prop]: Number.isInteger(+value) ? Boolean(+value) : value,
      });
    }
  }
  return { $and: searchParams };
}

/**
 * Generates an option array (with the `{label: string, value: any}` structure) to be consumed in a React-Select component. This wrapper was created due to the fact that React-Select requires `options` to be an array of objects with a very specific structure. If `options` is not in the correct structure, there will be unexpected results with the React-Select component.
 * @param {Array} options - list of options to be included in React-Select
 * @param {Function} getOptionLabel - generates the "Label" for the options
 * @param {Function} getOptionValue - generates the "Value" for the options
 */
export function getReactSelectOptions(options, getOptionLabel, getOptionValue) {
  return options.map((option) => ({
    label: getOptionLabel(option),
    value: getOptionValue(option),
  }));
}

/**
 * Generates the text of a dragon's "name", which could be an actual name or the dragon's code or [Missing] for dragons not yet added to a lineage.
 * @param {object} dragon - object holding all the information of a dragon
 */
export function getDragonDisplay(dragon) {
  return (
    dragon.name ||
    (dragon.code && `<i>(${dragon.code})</i>`) ||
    "<b>[Missing]</b>"
  );
}

export function getSearchParamsForLineages(values, isPublic = false) {
  if (!values.couple) {
    delete values.maleBreed;
    delete values.femaleBreed;
  } else {
    delete values.allBreed;
  }

  delete values.couple;
  values.public = isPublic ? 1 : 0;

  return new URLSearchParams(values);
}

/**
 * Returns a link to either an offspring of the breeding pair or a generated example from ANOD
 * @param {object} lineage - dragon lineage
 * @param {boolean} useFull - to use the full text or shortened text for generated samples
 */
export function getSampleLink(lineage, useFull) {
  if (lineage.sample)
    return (
      <ExternalLink url={`https://dragcave.net/lineage/${lineage.sample}`}>
        ({lineage.sample})
      </ExternalLink>
    );
  else if (lineage.male.code && lineage.female.code)
    return (
      <ExternalLink
        url={`http://www.allureofnds.net/NDER/Lineage.php?dcode=${lineage.male.code}&gen=12&mate=${lineage.female.code}&style%5Bbg%5D=y&style%5Bborder%5D=n`}
      >
        {`Generated${useFull ? "by Allure of Negelected Dragons (AOND)" : ""}`}
      </ExternalLink>
    );
  else return null;
}

/**
 * Returns a form submit error when an api calls returns an error (mainly for adding and editing lineages/breeds)
 * @param {Response} apiCall - the response received from the api
 */
export async function setFormError(apiCall) {
  const error = await apiCall.text();
  return { [FORM_ERROR]: error };
}

export function checkAuth(req) {
  const user = req.session.get("user") || null;

  //user is not logged-in, so cannot do any updates or inserts
  if (!user) return false;
}

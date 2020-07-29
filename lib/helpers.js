export function createMongoQuery(query) {
  for (const prop in query) {
    const value = query[prop];
    query[prop] = Number.isInteger(+value) ? Boolean(+value) : value;
  }
  return query;
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

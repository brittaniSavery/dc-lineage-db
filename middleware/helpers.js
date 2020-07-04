export function createMongoQuery(query) {
  for (const prop in query) {
    const value = query[prop];
    query[prop] = Number.isInteger(+value) ? Boolean(+value) : value;
  }
  return query;
}

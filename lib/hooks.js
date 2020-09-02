import useSWR from "swr";

export function useUser(id) {
  const { data, mutate } = useSWR(id && `/api/users/${id}`);
  const loading = !data; //still running the query
  const user = data;
  return [user, { mutate, loading }];
}

export function useLineage(id) {
  const { data, mutate } = useSWR(id && `/api/lineages/${id}`);
  const loading = !data; //still running the query
  const lineage = data;
  return [lineage, { mutate, loading }];
}

import useSWR from "swr";

export function useAuth() {
  const { data, error, isValidating, mutate } = useSWR("/api/auth");

  if (!data || !data.email || error)
    return { auth: null, isLoading: isValidating };
  else {
    let auth = { user: { ...data } };
    auth.user.isSetup = Boolean(data.username);
    auth.user.isAdmin = data.role && data.role === "admin";
    return { auth, isLoading: isValidating, updateAuth: mutate };
  }
}

export function useLineage(id) {
  const { data, mutate } = useSWR(id && `/api/lineages/${id}`);
  const loading = !data; //still running the query
  const lineage = data;
  return [lineage, { mutate, loading }];
}

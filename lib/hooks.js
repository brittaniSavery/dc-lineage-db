import useSWR from "swr";

export function useAuth() {
  const { data, error, mutate } = useSWR("/api/auth");

  const loading = !data && !error;

  if (!data || !data.email || error) return { auth: null, isLoading: loading };
  else {
    let auth = { user: { ...data } };
    auth.user.isSetup = Boolean(data.username && data.terms);
    auth.user.isAdmin = data.role && data.role === "admin";
    return { auth, isLoading: loading, updateAuth: mutate };
  }
}

export function useLineageSearch(search, skip, limit) {
  let url;
  if (search) {
    url = `/api/lineages?${search}`;
    if (skip) url += `&skip=${skip}`;
    if (limit) url += `&limit=${limit}`;
  }

  const { data, error, isValidating } = useSWR(search && url);

  const searchError = !error?.message.includes("aborted") ? error : undefined;

  return {
    lineages: data,
    searchError: error,
    isSearchLoading: search && isValidating && !data && !searchError,
  };
}

export function useLineage(id, initialData = {}) {
  const { data, error, mutate, isValidating } = useSWR(
    id && `/api/lineages/${id}`,
    { initialData: initialData }
  );
  return {
    lineage: data,
    isLineageLoading: id && isValidating && !data && !error,
    updateLineageCache: mutate,
  };
}

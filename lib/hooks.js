import useSWR from "swr";

export function useAuth() {
  const { data, error, isValidating, mutate } = useSWR("/api/auth");

  if (!data || !data.email || error)
    return { auth: null, isLoading: isValidating };
  else {
    let auth = { user: { ...data } };
    auth.user.isSetup = Boolean(data.username && data.terms);
    auth.user.isAdmin = data.role && data.role === "admin";
    return { auth, isLoading: isValidating, updateAuth: mutate };
  }
}

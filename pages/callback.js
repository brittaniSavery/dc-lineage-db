import React from "react";
import { useAuth } from "../lib/hooks";
import { useRouter } from "next/router";
import HeroBanner from "../components/HeroBanner";

export default function Login() {
  const { auth, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      auth && auth.user ? router.push("/") : router.push("/users/setup");
    }
  }, [auth, loading]);

  return (
    <HeroBanner title="Loading" subtitle="Please wait" fullHeight showTitle />
  );
}

import React from "react";
import { useAuth } from "../lib/hooks";
import { useRouter } from "next/router";
import HeroBanner from "../components/layout/HeroBanner";

export default function Login() {
  const { auth, error, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (error) router.push("/index?error=login");
    if (!loading && auth) {
      auth.user.isSetup ? router.push("/") : router.push("/users/setup");
    }
  }, [auth, error, loading]);

  return (
    <HeroBanner title="Loading" subtitle="Please wait" fullHeight showTitle />
  );
}

export async function getStaticProps() {
  return {
    props: {
      fullScreen: true,
    },
  };
}

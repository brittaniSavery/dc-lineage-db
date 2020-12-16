import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useAuth } from "../lib/hooks";
import Notification from "../components/Notification";
import { useRouter } from "next/router";

export default function Home() {
  const { auth } = useAuth();
  const router = useRouter();
  const { error } = router.query;

  return (
    <>
      {error === "login" && (
        <Notification status="error">
          Looks like something went wrong while logging in. Please try again.
        </Notification>
      )}
      <h2 className="is-size-5-desktop is-size-4-widescreen has-text-centered">
        The one-stop shop to host all your dragon cave lineages. No matter
        whether they are checkers or staircases, shinies or holidays, 2nd
        generation or 12th generation, all lineages are welcomed here!
      </h2>
      {!auth && (
        <p className="has-text-centered">
          If you would like to add your lineages to the database and save
          favorite searches, login/sign up <a href="/api/auth/login">here</a>!
        </p>
      )}
      <div className="buttons pt-4" style={{ justifyContent: "center" }}>
        {auth && (
          <Link href="/lineages/add">
            <a className="button is-primary is-uppercase">Add Lineage</a>
          </Link>
        )}
        <Link href="/database">
          <a
            className={classNames(
              "button",
              "is-primary",
              { "is-outlined": auth },
              "is-uppercase"
            )}
          >
            Search Database
          </a>
        </Link>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
      header: {
        title: "Dragon Cave Lineage Database",
        centered: true,
        site: true,
      },
    },
  };
}

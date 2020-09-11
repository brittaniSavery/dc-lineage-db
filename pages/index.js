import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useAuth } from "../lib/hooks";

export default function Home() {
  const { auth } = useAuth();

  return (
    <>
      <h2 className="site-header is-size-5-desktop is-size-4-widescreen has-text-centered">
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
      <div className="level pt-4">
        <div className="level-item has-text-centered">
          <div className="buttons">
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
                Search Lineages
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
      header: { title: "Dragon Cave Lineage Database", centered: true },
    },
  };
}

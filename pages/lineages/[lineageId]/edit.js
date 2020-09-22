import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { useAuth } from "../../../lib/hooks";
import Header from "../../../components/layout/Header";
import Notification from "../../../components/Notification";
/* import {
  databaseSetup,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../../../middleware/database"; */

export default function EditLineage({ maleBreeds, femaleBreeds }) {
  const router = useRouter();
  const { auth, isLoading: isAuthLoading } = useAuth();

  const { lineageId } = router.query;
  const { data: lineage, error } = useSWR(
    lineageId && `/api/lineages/${lineageId}`
  );

  const loading = isAuthLoading || (!lineage && !error);

  if (loading) {
    return <Header>Loading...</Header>;
  } else {
    if (!auth)
      return (
        <p>
          In order to view and edit your lineages, please login/sign up{" "}
          <a href="/api/auth/login">here</a>.
        </p>
      );
    else if (!lineage)
      return (
        <Notification status="error" title="Lineage Not Found">
          Sorry, there is no lineage with this id in the database.
        </Notification>
      );
    else if (auth.user.username !== lineage.owner)
      return (
        <Notification status="warning" title="Oops!">
          Sorry, you can only edit your own lineages. If you want to view this
          lineage, please{" "}
          <Link href="/lineages/[lineageId]" as={`/lineages/${lineage._id}`}>
            click here.
          </Link>
        </Notification>
      );
  }

  return <div>Yay, editing!</div>;
}

EditLineage.propTypes = {
  maleBreeds: PropTypes.arrayOf(PropTypes.string) /* .isRequired */,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string) /* .isRequired */,
};

/* export async function getStaticProps() {
  const db = (await databaseSetup()).db;
  return {
    props: {
      title: "Edit Lineage",
      maleBreeds: await getMaleBreedNames(db),
      femaleBreeds: await getFemaleBreedNames(db),
    },
    unstable_revalidate: 86400, //attempts to pull new breeds every 24 hours
  };
} */

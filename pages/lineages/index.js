import React from "react";
import PropTypes from "prop-types";
import {
  databaseSetup,
  getAllBreedNames,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../../middleware/database";
import useSWR from "swr";
import LineagesTable from "../../components/lineages/LineagesTable";
import { useAuth } from "../../lib/hooks";
import PageLoader from "../../components/PageLoader";

export default function Lineages() {
  const { auth, isLoading } = useAuth();
  const { data } = useSWR(() => "/api/lineages?owner=" + auth.user.username);

  //tell user that they need to log in/sign up to view lineages
  if (!isLoading && !auth) {
    return (
      <p>
        In order to view and edit your lineages, please login/sign up{" "}
        <a href="/api/auth/login">here</a>.
      </p>
    );
  }

  return (
    <PageLoader loading={!data}>
      <LineagesTable lineages={data} />
    </PageLoader>
  );
}

Lineages.propTypes = {
  allBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  maleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export async function getStaticProps() {
  const db = (await databaseSetup()).db;
  const allBreeds = await getAllBreedNames(db);
  const maleBreeds = await getMaleBreedNames(db);
  const femaleBreeds = await getFemaleBreedNames(db);
  return {
    props: {
      title: "My Lineages",
      allBreeds,
      maleBreeds,
      femaleBreeds,
    },
    revalidate: 60,
  };
}

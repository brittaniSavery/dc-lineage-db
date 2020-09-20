import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import SearchForm from "../components/SearchForm";
import {
  databaseSetup,
  getAllBreedNames,
  getAllUsers,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../middleware/database";
import LineagesTable from "../components/LineagesTable";
import { searchLineages } from "../lib/helpers";
import { FORM_ERROR } from "final-form";
import PageLoader from "../components/PageLoader";

export default function SearchDatabase({
  allUsers,
  allBreeds,
  maleBreeds,
  femaleBreeds,
}) {
  const [results, setResults] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const getQuerySearch = async (queryString) => {
      const search = await fetch(`/api/lineages?${queryString}`);
      const result = await search.json();
      setResults(result);
      setLoading(false);
    };

    const queryString = router.asPath.split("?")[1];
    if (!queryString) {
      setLoading(false);
      return null;
    }

    getQuerySearch(queryString);
  }, []);

  const onSubmit = async (values) => {
    const result = await searchLineages(values, true);
    if (result.error) return { [FORM_ERROR]: result.error };

    setResults(result);
  };

  const validate = (values) => {
    const errors = {};
    if (values.holiday && values.holiday.length > 2)
      errors.holiday = "No more than two holidays can be selected.";
    return errors;
  };

  if (isLoading) return <PageLoader loading={true} />;

  return (
    <>
      {results ? (
        <>
          <a className="mb-2" onClick={() => setResults(null)}>
            &lt; Back to Search
          </a>
          <LineagesTable lineages={results} />
        </>
      ) : (
        <>
          <p className="pb-5">
            Use the form below to search the database for lineages.
          </p>
          <SearchForm
            onSubmit={onSubmit}
            validate={validate}
            allUsers={allUsers}
            allBreeds={allBreeds}
            maleBreeds={maleBreeds}
            femaleBreeds={femaleBreeds}
          />
        </>
      )}
    </>
  );
}

SearchDatabase.propTypes = {
  allUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  allBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  maleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export async function getStaticProps() {
  const db = (await databaseSetup()).db;
  const allUsers = await getAllUsers(db);
  const allBreeds = await getAllBreedNames(db);
  const maleBreeds = await getMaleBreedNames(db);
  const femaleBreeds = await getFemaleBreedNames(db);
  return {
    props: {
      title: "Database Search",
      allUsers,
      allBreeds,
      maleBreeds,
      femaleBreeds,
    },
    unstable_revalidate: 86400, //attempts to pull data every 24 hours
  };
}

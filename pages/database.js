import React from "react";
import PropTypes from "prop-types";
import SearchForm from "../components/SearchForm";
import {
  databaseSetup,
  getAllBreedNames,
  getAllUsers,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../middleware/database";

export default function SearchDatabase({
  allUsers,
  allBreeds,
  maleBreeds,
  femaleBreeds,
}) {
  const [results, setResults] = React.useState();

  const onSubmit = async (values) => {
    values.public = 1; //only allow certain searches
    const params = new URLSearchParams(values);
    console.log(params.toString());

    const search = await fetch(`/api/lineages?${params.toString()}`);

    if (search.ok) {
      console.log(await search.json());
    } else {
      console.log(await search.text());
    }
  };

  const validate = (values) => {
    const errors = {};
    if (values.holiday && values.holiday.length > 2)
      errors.holiday = "No more than two holidays can be selected.";
    return errors;
  };

  return (
    <>
      <p className="pb-5">
        Use the form below to search the database for lineages.
      </p>
      {results ? (
        <div>Stuff goes here</div>
      ) : (
        <SearchForm
          onSubmit={onSubmit}
          validate={validate}
          allUsers={allUsers}
          allBreeds={allBreeds}
          maleBreeds={maleBreeds}
          femaleBreeds={femaleBreeds}
        />
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

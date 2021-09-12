import { FORM_ERROR } from "final-form";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import LineagesTable from "../components/lineages/LineagesTable";
import SearchForm from "../components/lineages/SearchForm";
import PageLoader from "../components/PageLoader";
import { getSearchParamsForLineages } from "../lib/helpers";
import { useLineageSearch } from "../lib/hooks";
import {
  databaseSetup,
  getAllBreedNames,
  getAllUsers,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../middleware/database";

export default function SearchDatabase({
  allBreeds,
  allUsers,
  maleBreeds,
  femaleBreeds,
}) {
  const router = useRouter();
  const [search, setSearch] = React.useState(null);
  const { lineages, searchError, isSearchLoading } = useLineageSearch(search);

  React.useEffect(() => {
    const queryString = router.asPath.split("?")[1];
    if (queryString) {
      setSearch(queryString);
    } else {
      setSearch(null);
    }
  });

  const onSubmit = async (values) => {
    const params = getSearchParamsForLineages(values, true);
    setSearch(params);

    if (!isSearchLoading && searchError) return { [FORM_ERROR]: searchError };

    //shows search in URL (for history purposes)
    const publicQuery = new URLSearchParams(params);
    publicQuery.delete("public");
    router.push(`/database?${publicQuery}`, undefined, { shallow: true });
  };

  const validate = (values) => {
    const errors = {};
    if (values.holiday && values.holiday.length > 2)
      errors.holiday = "No more than two holidays can be selected.";
    if (values.generation < 1)
      errors.generation = "Generation must be 2 or greater.";
    return errors;
  };

  if (isSearchLoading) return <PageLoader loading={true} />;

  return (
    <>
      {lineages ? (
        <>
          <a
            className="mb-2"
            onClick={() =>
              router.push("/database", undefined, { shallow: true })
            }
          >
            &lt; Back to Search
          </a>
          <LineagesTable lineages={lineages} isPublic />
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
    revalidate: 60,
  };
}

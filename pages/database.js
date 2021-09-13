import { FORM_ERROR } from "final-form";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import Button from "../components/Button";
import Pagination from "../components/layout/Pagination";
import LineagesTable from "../components/lineages/LineagesTable";
import SearchForm from "../components/lineages/SearchForm";
import PageLoader from "../components/PageLoader";
import { PAGE_SIZE } from "../lib/constants";
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const { total, lineages, searchError, isSearchLoading } = useLineageSearch(
    search,
    currentPage,
    PAGE_SIZE
  );

  React.useEffect(() => {
    const query = router.query;

    if (Object.keys(query).length) {
      // setting the current page from the url
      if ("page" in query) {
        setCurrentPage(+query.page);
        delete query.page;
      }

      // getting the search criteria
      const newSearch = new URLSearchParams(query);
      setSearch(newSearch.toString());
    } else {
      // resetting the search
      setSearch(null);
      setCurrentPage(1);
    }
  });

  const onSubmit = async (values) => {
    const params = getSearchParamsForLineages(values, true);
    setSearch(params);

    if (!isSearchLoading && searchError) return { [FORM_ERROR]: searchError };

    //shows search in URL (for history purposes)
    const publicQuery = new URLSearchParams(params);
    publicQuery.delete("public");
    router.push(`/database?${publicQuery}&page=${currentPage}`, undefined, {
      shallow: true,
    });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);

    const query = router.query;
    query.page = page;
    const newQuery = new URLSearchParams(query);
    router.push(`/database?${newQuery.toString()}`, undefined, {
      shallow: true,
    });
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
          <Button
            onClick={() => {
              router.push("/database", undefined, { shallow: true });
            }}
            color="primary"
            className="mb-3"
          >
            Return to Search
          </Button>
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            handlePageChange={(p) => onPageChange(p)}
          />
          <LineagesTable lineages={lineages} isPublic />
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            handlePageChange={(p) => onPageChange(p)}
          />
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

import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import Button from "../components/Button";
import InputField from "../components/fields/InputField";
import SearchableSelectField from "../components/fields/SearchableSelectField";
import SelectField from "../components/fields/SelectField";
import { HOLIDAYS, LINEAGE_TYPES } from "../lib/constants";
import {
  databaseSetup,
  getAllUsers,
  getAllBreedNames,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../middleware/database";
import ButtonContainer from "../components/ButtonContainer";
import CheckboxGroup from "../components/fields/CheckboxGroup";
import useSWR from "swr";

export default function SearchDatabase({
  allUsers,
  allBreeds,
  maleBreeds,
  femaleBreeds,
}) {
  const { data: users } = useSWR("/api/users", { initialData: allUsers });

  const onSubmit = (values) => {
    console.log(values);
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
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="columns is-multiline">
              <div className="column is-12 pb-0">
                <CheckboxGroup
                  name="couple"
                  options={[
                    "Check this to search for a specific breed combination",
                  ]}
                />
              </div>
              {!values.couple && (
                <div className="column is-12">
                  <SearchableSelectField
                    name="allBreed"
                    label="Breed"
                    options={allBreeds}
                    matchFromStart
                    autoFocus
                  />
                </div>
              )}
              {values.couple && (
                <div className="column is-12">
                  <div className="columns">
                    <div className="column">
                      <SearchableSelectField
                        name="maleBreed"
                        label="Male Breed"
                        options={maleBreeds}
                        matchFromStart
                      />
                    </div>
                    <div className="column">
                      <SearchableSelectField
                        name="femaleBreed"
                        label="Female Breed"
                        options={femaleBreeds}
                        matchFromStart
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="column is-12">
                <div className="columns">
                  <div className="column is-narrow" style={{ width: "8em" }}>
                    <InputField
                      name="generation"
                      label="Generation"
                      type="number"
                      style={{ width: "5em" }}
                    />
                  </div>
                  <div className="column">
                    <SelectField
                      name="type"
                      label="Type"
                      options={LINEAGE_TYPES}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <div className="columns">
                  <div className="column is-narrow" style={{ width: "8em" }}>
                    <CheckboxGroup
                      name="holiday"
                      label="Holiday"
                      options={HOLIDAYS}
                    />
                  </div>
                  <div className="column">
                    <SearchableSelectField
                      name="owner"
                      label="Owner"
                      options={users}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <ButtonContainer alignment="center">
                  <Button
                    type="submit"
                    color="primary"
                    loading={submitting}
                    disabled={submitting || pristine}
                  >
                    Search
                  </Button>
                </ButtonContainer>
              </div>
            </div>
          </form>
        )}
      />
    </>
  );
}

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

SearchDatabase.propTypes = {
  allUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  allBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  maleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

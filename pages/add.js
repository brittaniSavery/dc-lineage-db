import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import Button from "../components/fields/Button";
import ButtonGroup from "../components/fields/ButtonGroup";
import InputField from "../components/fields/InputField";
import SearchableSelectField from "../components/fields/SearchableSelectField";
import SelectField from "../components/fields/SelectField";
import TextareaField from "../components/fields/TextareaField";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { LINEAGE_SITES_STATUS, LINEAGE_TYPES } from "../lib/constants";
import {
  databaseSetup,
  getMaleBreedNames,
  getFemaleBreedNames,
} from "../middleware/database";
import { useRouter } from "next/router";

export default function Add({ maleBreeds, femaleBreeds }) {
  const router = useRouter();

  const onSubmit = async (values) => {
    const result = await fetch("/api/lineages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (result.ok) {
      const data = await result.json();
      router.push(`/lineages/${data.lineageId}`);
    } else {
      console.log(result);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.maleBreed) errors.maleBreed = "Required";
    if (!values.femaleBreed) errors.femaleBreed = "Required";
    if (!values.maleCode && !values.femaleCode) {
      errors.maleCode = "A male code or female code is required.";
      errors.femaleCode = "A male code or female code is required.";
    }
    if (!values.generation) errors.generation = "Required";
    if (!values.type) errors.type = "Required";

    return errors;
  };

  return (
    <Layout title="Add">
      <Header>Add Lineage</Header>
      <p className="pb-5">
        All fields marked with an asterik (*) are{" "}
        <span className="has-text-info">required</span>. A male code or female
        code is also required.
      </p>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit}>
            <div className="columns is-multiline">
              <div className="column is-12">
                <h2 className="is-uppercase has-text-weight-light has-text-info">
                  Male Information
                </h2>
              </div>
              <div className="column is-12-tablet is-6-desktop">
                <SearchableSelectField
                  name="maleBreed"
                  label="Male Breed"
                  options={maleBreeds}
                  matchFromStart
                  required
                />
              </div>
              <div className="column is-narrow" style={{ width: "7em" }}>
                <InputField
                  name="maleCode"
                  label="Male Code"
                  maxLength="5"
                  style={{ width: "5em" }} //Bulma Hack: doesn't recognize size attribute
                />
              </div>
              <div className="column">
                <InputField name="maleName" label="Male Name" />
              </div>
              <div className="column is-12">
                <h2 className="is-uppercase has-text-weight-light has-text-info">
                  Female Information
                </h2>
              </div>
              <div className="column is-12-tablet is-6-desktop">
                <SearchableSelectField
                  name="femaleBreed"
                  label="Female Breed"
                  options={femaleBreeds}
                  matchFromStart
                  required
                />
              </div>
              <div className="column is-narrow">
                <InputField
                  name="femaleCode"
                  label="Female Code"
                  maxLength="5"
                  style={{ width: "5em" }} //Bulma Hack: doesn't recognize size attribute
                />
              </div>
              <div className="column">
                <InputField name="femaleName" label="Female Name" />
              </div>
              <div className="column is-12">
                <h2 className="is-uppercase has-text-weight-light has-text-info">
                  Lineage Information
                </h2>
              </div>
              <div className="column is-12">
                <div className="columns">
                  <div className="column is-narrow">
                    <InputField
                      name="generation"
                      label="Generation"
                      type="number"
                      style={{ width: "5em" }}
                      required
                    />
                  </div>
                  <div className="column">
                    <SelectField
                      name="type"
                      label="Type"
                      options={LINEAGE_TYPES}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="column is-12-tablet is-6-desktop">
                <SelectField
                  name="cdc"
                  label="CDC Entry"
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column is-12-tablet is-6-desktop">
                <SelectField
                  name="srogg"
                  label="SROGG Entry"
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column is-12">
                <TextareaField name="notes" label="Notes" />
              </div>
              <div className="column is-12">
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" />
                      Create another lineage?
                    </label>
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <ButtonGroup alignment="center">
                  <Button
                    type="submit"
                    color="primary"
                    disabled={submitting || pristine}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </form>
        )}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const db = (await databaseSetup()).db;
  return {
    props: {
      maleBreeds: await getMaleBreedNames(db),
      femaleBreeds: await getFemaleBreedNames(db),
    },
    unstable_revalidate: 86400, //attempts to pull new breeds every 24 hours
  };
}

Add.propTypes = {
  maleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

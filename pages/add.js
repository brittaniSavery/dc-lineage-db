import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import Button from "../components/Button";
import ButtonContainer from "../components/ButtonContainer";
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
import RadioGroup from "../components/fields/RadioGroup";
import Subheader from "../components/Subheader";
import CheckboxGroup from "../components/fields/CheckboxGroup";
import Notification from "../components/Notification";
import Link from "next/link";

export default function Add({ maleBreeds, femaleBreeds }) {
  const router = useRouter();
  const [lastInserted, setLastInserted] = React.useState();

  const onSubmit = async (values, form) => {
    const another = values.another;
    delete values.another;
    const result = await fetch("/api/lineages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (result.ok) {
      const lineageId = (await result.json()).lineageId;

      //Restart form to add another or goto last inserted lineage
      if (another) {
        setLastInserted(lineageId);
        setTimeout(form.restart);
        document.getElementById("top").scrollIntoView();
      } else {
        router.push(`/lineages/${lineageId}`);
      }
    } else {
      //show error back to user
      const error = await result.text();
      return { [FORM_ERROR]: error };
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.maleBreed) errors.maleBreed = "Required";
    if (!values.femaleBreed) errors.femaleBreed = "Required";
    if (!(values.maleCode || values.femaleCode)) {
      errors.maleCode = "One code is required.";
      errors.femaleCode = "One code is required.";
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
        render={({ handleSubmit, submitting, pristine, submitError }) => (
          <form onSubmit={handleSubmit}>
            <div id="top" className="columns is-multiline">
              {submitError && (
                <Notification status="error" title="Oops!">
                  {submitError}
                </Notification>
              )}
              {lastInserted && (
                <Notification status="success" title="Lineage Created!">
                  Your lineage was created successfully.{" "}
                  <Link href={`/lineages/${lastInserted}`}>
                    <a>Click here</a>
                  </Link>{" "}
                  to view it.
                </Notification>
              )}
              <div className="column is-12">
                <Subheader>Male Information</Subheader>
              </div>
              <div className="column is-12">
                <SearchableSelectField
                  name="maleBreed"
                  label="Male Breed"
                  options={maleBreeds}
                  matchFromStart
                  autoFocus
                  required
                />
              </div>
              <div className="column is-12">
                <div className="columns">
                  <div className="column is-narrow" style={{ width: "8em" }}>
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
                </div>
              </div>
              <div className="column is-12">
                <Subheader>Female Information</Subheader>
              </div>
              <div className="column is-12">
                <SearchableSelectField
                  name="femaleBreed"
                  label="Female Breed"
                  options={femaleBreeds}
                  matchFromStart
                  required
                />
              </div>
              <div className="column is-12">
                <div className="columns">
                  <div className="column is-narrow" style={{ width: "8em" }}>
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
                </div>
              </div>
              <div className="column is-12">
                <Subheader>Lineage Information</Subheader>
              </div>
              <div className="column is-12">
                <div className="columns">
                  <div className="column is-narrow" style={{ width: "8em" }}>
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
              <div className="column is-12">
                <RadioGroup
                  name="cdc"
                  label="CDC Entry"
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column is-12">
                <RadioGroup
                  name="srogg"
                  label="SROGG Entry"
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column">
                <InputField
                  name="offspringCode"
                  label="Sample Offspring Code"
                  maxLength="5"
                  style={{ width: "5em" }} //Bulma Hack: doesn't recognize size attribute
                />
              </div>
              <div className="column is-12">
                <TextareaField name="notes" label="Notes" />
              </div>
              <div className="column is-12">
                <CheckboxGroup
                  name="another"
                  options={["Create another lineage?"]}
                />
              </div>
              <div className="column is-12">
                <ButtonContainer alignment="center">
                  <Button
                    type="submit"
                    color="primary"
                    loading={submitting}
                    disabled={submitting || pristine}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </ButtonContainer>
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

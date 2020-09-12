import { FORM_ERROR } from "final-form";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Form } from "react-final-form";
import Button from "../../components/Button";
import ButtonContainer from "../../components/ButtonContainer";
import CheckboxGroup from "../../components/fields/CheckboxGroup";
import InputField from "../../components/fields/InputField";
import RadioGroup from "../../components/fields/RadioGroup";
import SearchableSelectField from "../../components/fields/SearchableSelectField";
import SelectField from "../../components/fields/SelectField";
import TextareaField from "../../components/fields/TextareaField";
import Notification from "../../components/Notification";
import Subheader from "../../components/Subheader";
import { LINEAGE_SITES_STATUS, LINEAGE_TYPES } from "../../lib/constants";
import { useAuth } from "../../lib/hooks";
import {
  databaseSetup,
  getFemaleBreedNames,
  getMaleBreedNames,
} from "../../middleware/database";

export default function AddLineage({ maleBreeds, femaleBreeds }) {
  const router = useRouter();
  const { auth } = useAuth();
  const [lastInserted, setLastInserted] = React.useState();

  const onSubmit = async (values, form) => {
    const another = values.another;
    delete values.another;
    values.owner = auth.user.username;

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
    const errors = { male: {}, female: {} };
    if (values.male && values.female) {
      if (!values.male.breed) errors.male.breed = "Required";
      if (!values.female.breed) errors.female.breed = "Required";
      if (!(values.male.code || values.female.code)) {
        errors.male.code = "One code is required.";
        errors.female.code = "One code is required.";
      }
    }
    if (!values.generation) errors.generation = "Required";
    if (!values.type) errors.type = "Required";

    return errors;
  };

  //tell user that they need to log in or sign up in order to add lineages
  if (!auth) {
    return (
      <p>
        Before you can add your lineages to the database, please login/sign up{" "}
        <a href="/api/auth/login">here</a>.
      </p>
    );
  }

  return (
    <>
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
                  name="male.breed"
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
                      name="male.code"
                      label="Male Code"
                      maxLength="5"
                      style={{ width: "5em" }} //Bulma Hack: doesn't recognize size attribute
                    />
                  </div>
                  <div className="column">
                    <InputField name="male.name" label="Male Name" />
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <Subheader>Female Information</Subheader>
              </div>
              <div className="column is-12">
                <SearchableSelectField
                  name="female.breed"
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
                      name="female.code"
                      label="Female Code"
                      maxLength="5"
                      style={{ width: "5em" }} //Bulma Hack: doesn't recognize size attribute
                    />
                  </div>
                  <div className="column">
                    <InputField name="female.name" label="Female Name" />
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
                  name="sample"
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
    </>
  );
}

export async function getStaticProps() {
  const db = (await databaseSetup()).db;
  return {
    props: {
      title: "Add Lineage",
      maleBreeds: await getMaleBreedNames(db),
      femaleBreeds: await getFemaleBreedNames(db),
    },
    unstable_revalidate: 86400, //attempts to pull new breeds every 24 hours
  };
}

AddLineage.propTypes = {
  maleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

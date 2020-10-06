import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import Subheader from "../layout/Subheader";
import SearchableSelectField from "../fields/SearchableSelectField";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";
import { LINEAGE_SITES_STATUS, LINEAGE_TYPES } from "../../lib/constants";
import RadioGroup from "../fields/RadioGroup";
import TextareaField from "../fields/TextareaField";
import ButtonContainer from "../ButtonContainer";
import Button from "../Button";
import { titleCase } from "title-case";
import Notification from "../Notification";
import Link from "next/link";
import CheckboxGroup from "../fields/CheckboxGroup";
import { useRouter } from "next/router";

export default function LineageForm({
  type,
  lineage = {},
  maleBreeds,
  femaleBreeds,
  onSubmit = (f) => f,
  lastInserted,
}) {
  const router = useRouter();

  const validate = (values) => {
    const errors = { male: {}, female: {} };
    if (values.male || values.female) {
      const male = values.male || {};
      const female = values.female || {};

      if (!male.breed) errors.male.breed = "Required";
      if (!female.breed) errors.female.breed = "Required";
      if (!(male.code || female.code)) {
        errors.male.code = "One code is required.";
        errors.female.code = "One code is required.";
      }
      if (male.name && !male.code)
        errors.male.code =
          "If a name is added, a corresponding code is required.";
      if (female.name && !female.code)
        errors.female.code =
          "If a name is added, a corresponding code is required.";
    }
    if (!values.generation) errors.generation = "Required";
    if (!values.type) errors.type = "Required";

    return errors;
  };

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
        initialValues={lineage}
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
                  <Link
                    href="/lineages/[lineageId]"
                    as={`/lineages/${lastInserted}`}
                  >
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
                  label={
                    <span>
                      <abbr title="Checker Database Center">CDC</abbr> Entry
                    </span>
                  }
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column is-12">
                <RadioGroup
                  name="srogg"
                  label={
                    <span>
                      <abbr title="Special Release Offspring Gifiting Group">
                        SROGG
                      </abbr>{" "}
                      Entry
                    </span>
                  }
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
              {type === "add" && (
                <div className="column is-12">
                  <CheckboxGroup
                    name="another"
                    options={["Create another lineage?"]}
                  />
                </div>
              )}
              <div className="column is-12">
                <ButtonContainer alignment="center">
                  <Button
                    type="submit"
                    color="primary"
                    loading={submitting}
                    disabled={submitting || pristine}
                  >
                    {titleCase(type)}
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

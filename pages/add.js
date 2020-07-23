import React from "react";
import { Form } from "react-final-form";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SearchableSelectField from "../components/fields/SearchableSelectField";
import InputField from "../components/fields/InputField";
import SelectField from "../components/fields/SelectField";
import TextareaField from "../components/fields/TextareaField";
import RadioGroup from "../components/fields/RadioGroup";
import { LINEAGE_TYPES, LINEAGE_SITES_STATUS } from "../lib/constants";
import ButtonGroup from "../components/fields/ButtonGroup";
import Button from "../components/fields/Button";

export default function Add() {
  const onSubmit = (values) => {
    console.log(values);
  };

  const validate = (values) => {
    const errors = {};
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
              <div className="column is-3">
                <InputField
                  name="generation"
                  label="Generation"
                  type="number"
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
              <div className="column">
                <SelectField
                  name="cdc"
                  label="CDC Entry"
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column">
                <SelectField
                  name="srogg"
                  label="SROGG Entry"
                  options={LINEAGE_SITES_STATUS}
                  getOptionLabel={(x) => x.label}
                  getOptionValue={(x) => x.value}
                />
              </div>
              <div className="column is-12">
                <TextareaField name="notes" label="Notes"></TextareaField>
              </div>
              <div className="column is-12">
                <ButtonGroup alignment="center">
                  <Button
                    primary
                    type="submit"
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

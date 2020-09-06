import React from "react";
import PropTypes from "prop-types";
import HeroBanner from "../../components/HeroBanner";
import { Form } from "react-final-form";
import InputField from "../../components/fields/InputField";
import CheckboxGroup from "../../components/fields/CheckboxGroup";
import TextareaField from "../../components/fields/TextareaField";
import Button from "../../components/Button";

export default function SetupUser() {
  const onSubmit = async (values) => {
    console.log(values);
  };

  const SubHeader = ({ children }) => (
    <h2 className="has-text-weight-medium has-text-primary	is-uppercase	pb-3 pt-2">
      {children}
    </h2>
  );

  return (
    <HeroBanner title="User Setup" fullHeight>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <header className="card-header">
              <h1 className="card-header-title has-text-primary is-size-4-desktop is-size-5-touch">
                Complete User Account Setup
              </h1>
            </header>
            <div className="card-content">
              <p className="pb-4">
                Welcome to the Dragon Cave Lineage Database, or DCLDB for short!
                Thanks a bunch for creating an account. Before you can add your
                lineages, we need a bit more information to finish setting up
                your account.
              </p>
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <SubHeader>Contact Information</SubHeader>
                    <InputField
                      name="discord"
                      label="Discord Username"
                      placeholder="e.g Username#1234"
                    />
                    <InputField name="forum" label="DC Forum Name" />
                    <SubHeader>DCLDB Information</SubHeader>
                    <InputField name="username" label="Username" />
                    <CheckboxGroup
                      name="custom"
                      options={["Create custom username for DCLDB?"]}
                    />
                    <TextareaField name="notes" label="Owner Notes" />
                    <Button type="submit" color="primary" fullWidth>
                      Submit
                    </Button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </HeroBanner>
  );
}

SetupUser.propTypes = {
  children: PropTypes.node,
};

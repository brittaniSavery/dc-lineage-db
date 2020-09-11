import React from "react";
import PropTypes from "prop-types";
import { Form, FormSpy, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import Button from "../../components/Button";
import HeroBanner from "../../components/HeroBanner";
import InputField from "../../components/fields/InputField";
import CheckboxGroup from "../../components/fields/CheckboxGroup";
import TextareaField from "../../components/fields/TextareaField";
import Link from "next/link";
import { useAuth } from "../../lib/hooks";
import { useRouter } from "next/router";
import { FORM_ERROR } from "final-form";
import Notification from "../../components/Notification";

export default function SetupUser() {
  const { auth, updateAuth } = useAuth();
  const router = useRouter();

  const onSubmit = async (values) => {
    delete values.custom;
    values.email = auth.user.email;
    console.log(values);

    const response = await fetch(`/api/users/${auth.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const newData = await response.json();
      updateAuth(newData, false);

      await fetch("/api/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      router.push("/lineages/add");
    } else {
      //show error back to user
      const error = await response.text();
      return { [FORM_ERROR]: error };
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.preferences)
      errors.preferences = "Select at least one form of contact.";
    else {
      errors.discord =
        values.preferences.includes("discord") && !values.discord
          ? "Since Discord is selected as a form of contact, your Discord username is required."
          : undefined;
      errors.forum =
        values.preferences.includes("forum") && !values.forum
          ? "Since the DC Forums are selected as a form of contact, your forum username is required."
          : undefined;
    }

    if (!values.username) errors.username = "DCLDB Username is required.";
    else if (values.username.length < 4)
      errors.username = "DCLDB Username must be 4 or more characters.";

    if (!values.terms)
      errors.terms = "Please read and accept the terms and conditions.";

    return errors;
  };

  const WhenConditionMetOnChange = ({ field, condition, set, to }) => (
    <Field name={set} subscription={{}}>
      {({ input: { onChange } }) => (
        <FormSpy subscription={{}}>
          {() => (
            <OnChange name={field}>
              {(value) => {
                if (condition(value)) {
                  onChange(to);
                }
              }}
            </OnChange>
          )}
        </FormSpy>
      )}
    </Field>
  );

  const WhenFieldChanges = ({ field, becomes, set, to }) => (
    <WhenConditionMetOnChange
      field={field}
      condition={(value) => value === becomes}
      set={set}
      to={to}
    />
  );

  const SubHeader = ({ children }) => (
    <h2 className="has-text-weight-medium has-text-primary is-uppercase	pb-3 pt-2">
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
                your account. Required fields are marked with an asterik (*).
              </p>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, values, submitError }) => (
                  <form onSubmit={handleSubmit}>
                    {submitError && (
                      <Notification status="error" title="Oops!">
                        {submitError}
                      </Notification>
                    )}
                    <SubHeader>General Information</SubHeader>
                    <InputField name="scroll" label="DC Scroll Name" />
                    <InputField name="forum" label="DC Forum Name" />
                    <InputField
                      name="discord"
                      label="Discord Username"
                      placeholder="e.g Username#1234"
                    />
                    <CheckboxGroup
                      required
                      name="preferences"
                      label="Contact Preferences"
                      options={[
                        { value: "discord", label: "Discord" },
                        { value: "forum", label: "DC Forums" },
                        {
                          value: "email",
                          label:
                            "Email (will be shown to other users if selected)",
                        },
                      ]}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                    />
                    <SubHeader>DCLDB Information</SubHeader>
                    <WhenConditionMetOnChange
                      field="forum"
                      condition={() => !values.custom}
                      set={"username"}
                      to={values.forum}
                    />
                    <WhenFieldChanges
                      field="custom"
                      becomes={true}
                      set="username"
                      to=""
                    />
                    <WhenFieldChanges
                      field="custom"
                      becomes={false}
                      set="username"
                      to={values.forum}
                    />
                    <InputField
                      required
                      name="username"
                      label="Username"
                      help="DCLDB username will be defaulted to DC Forum name."
                      readOnly={!values.custom}
                    />
                    <CheckboxGroup
                      name="custom"
                      options={["Create custom username for DCLDB?"]}
                    />
                    <TextareaField name="notes" label="Owner Notes" />
                    <CheckboxGroup
                      required
                      name="terms"
                      options={[
                        <>
                          I have carefully read and now accept the{" "}
                          <Link href="/terms">
                            <a target="_blank">terms and conditions</a>
                          </Link>
                          .*
                        </>,
                      ]}
                    />
                    <Button type="submit" color="primary" fullWidth>
                      Set Up
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
  condition: PropTypes.func,
  field: PropTypes.string,
  becomes: PropTypes.node,
  set: PropTypes.string,
  to: PropTypes.node,
};

export async function getStaticProps() {
  return {
    props: {
      fullScreen: true,
    },
  };
}

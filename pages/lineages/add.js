import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import LineageForm from "../../components/lineages/LineageForm";
import { useAuth } from "../../lib/hooks";
import { setFormError } from "../../lib/helpers";
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

    //makes sure breeding pair is valid and returns offspring/holiday values
    const verifiedParams = new URLSearchParams();
    verifiedParams.set("male", values.male.breed);
    verifiedParams.set("female", values.female.breed);
    const verified = await fetch(
      `/api/lineages/verify?${verifiedParams.toString()}`
    );

    if (!verified.ok) {
      setLastInserted(null);
      document.getElementById("top").scrollIntoView();
      return await setFormError(verified);
    }

    const verifiedResults = await verified.json();
    values = { ...values, ...verifiedResults, owner: auth.user.username };

    const inserted = await fetch("/api/lineages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (inserted.ok) {
      const lineageId = (await inserted.json()).lineageId;

      //Restart form to add another or goto last inserted lineage
      if (another) {
        setLastInserted(lineageId);
        setTimeout(form.restart);
        document.getElementById("top").scrollIntoView();
      } else {
        router.push(`/lineages/${lineageId}`);
      }
    } else {
      setLastInserted(null);
      document.getElementById("top").scrollIntoView();
      return await setFormError(inserted);
    }
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
    <LineageForm
      type="add"
      maleBreeds={maleBreeds}
      femaleBreeds={femaleBreeds}
      onSubmit={onSubmit}
      lastInserted={lastInserted}
    />
  );
}

AddLineage.propTypes = {
  maleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export async function getStaticProps() {
  const db = (await databaseSetup()).db;
  return {
    props: {
      title: "Add Lineage",
      maleBreeds: await getMaleBreedNames(db),
      femaleBreeds: await getFemaleBreedNames(db),
    },
  };
}

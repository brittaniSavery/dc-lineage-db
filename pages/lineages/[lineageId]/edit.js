import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { useAuth } from "../../../lib/hooks";
import Notification from "../../../components/Notification";
import {
  databaseSetup,
  getFemaleBreedNames,
  getLineageById,
  getMaleBreedNames,
} from "../../../middleware/database";
import LineageForm from "../../../components/lineages/LineageForm";
import PageLoader from "../../../components/PageLoader";
import { setFormError } from "../../../lib/helpers";

export default function EditLineage(props) {
  const router = useRouter();
  const { auth } = useAuth();

  const { lineageId } = router.query;
  const { data: lineage, error, mutate: updateLineageCache } = useSWR(
    lineageId && `/api/lineages/${lineageId}`,
    {
      initialData: props.lineage,
    }
  );

  const onSubmit = async (values, form) => {
    const state = form.getState();

    //makes sure breeding pair is valid and returns offspring/holiday values
    if (state.dirtyFields?.male?.breed || state.dirtyFields?.male?.breed) {
      const verifiedParams = new URLSearchParams();
      verifiedParams.set("male", values.male.breed);
      verifiedParams.set("female", values.female.breed);
      const verified = await fetch(
        `/api/lineages/verify?${verifiedParams.toString()}`
      );

      if (!verified.ok) {
        document.getElementById("top").scrollIntoView();
        return await setFormError(verified);
      }

      const verifiedResults = await verified.json();
      values = { ...values, ...verifiedResults };
    }

    updateLineageCache(values, false);
    delete values["_id"]; //deleting to avoid mistype on ObjectId
    const updated = await fetch(`/api/lineages/${lineageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (updated.ok) {
      updateLineageCache();
      router.push(`/lineages/${lineageId}`);
    } else {
      document.getElementById("top").scrollIntoView();
      return await setFormError(updated);
    }
  };

  const loading = router.isFallback || (!lineage && !error);

  if (loading) {
    return <PageLoader loading={true} />;
  } else {
    if (!auth)
      return (
        <p>
          In order to view and edit your lineages, please login/sign up{" "}
          <a href="/api/auth/login">here</a>.
        </p>
      );
    else if (!lineage)
      return (
        <Notification status="error" title="Lineage Not Found">
          Sorry, there is no lineage with this id in the database.
        </Notification>
      );
    else if (auth.user.username !== lineage.owner)
      return (
        <Notification status="warning" title="Oops!">
          Sorry, you can only edit your own lineages. If you want to view this
          lineage, please{" "}
          <Link href="/lineages/[lineageId]" as={`/lineages/${lineage._id}`}>
            click here.
          </Link>
        </Notification>
      );
  }

  return (
    <LineageForm
      type="edit"
      maleBreeds={props.maleBreeds}
      femaleBreeds={props.femaleBreeds}
      onSubmit={onSubmit}
      lineage={lineage}
    />
  );
}

EditLineage.propTypes = {
  lineage: PropTypes.object,
  maleBreeds: PropTypes.arrayOf(PropTypes.string) /* .isRequired */,
  femaleBreeds: PropTypes.arrayOf(PropTypes.string) /* .isRequired */,
};

export async function getStaticPaths() {
  const db = (await databaseSetup()).db;
  const ids = await db
    .collection("lineages")
    .distinct("_id", { owner: "Forever_Mone" });
  return {
    paths: ids.map((id) => ({ params: { lineageId: `${id}` } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const db = (await databaseSetup()).db;
  const lineage = await getLineageById(db, params.lineageId);

  return {
    props: {
      title: "Edit Lineage",
      lineage: JSON.parse(JSON.stringify(lineage)), //Next uses strict serializing in SSR
      maleBreeds: await getMaleBreedNames(db),
      femaleBreeds: await getFemaleBreedNames(db),
    },
  };
}

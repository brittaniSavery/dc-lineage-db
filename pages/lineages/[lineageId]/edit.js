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

export default function EditLineage({ lineage, maleBreeds, femaleBreeds }) {
  const router = useRouter();
  const { auth } = useAuth();
  const { data } = useSWR(lineage._id && `/api/lineages/${lineage._id}`, {
    initialData: lineage,
  });

  const loading = router.isFallback;

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
    else if (!data)
      return (
        <Notification status="error" title="Lineage Not Found">
          Sorry, there is no lineage with this id in the database.
        </Notification>
      );
    else if (auth.user.username !== data.owner)
      return (
        <Notification status="warning" title="Oops!">
          Sorry, you can only edit your own lineages. If you want to view this
          lineage, please{" "}
          <Link href="/lineages/[lineageId]" as={`/lineages/${data._id}`}>
            click here.
          </Link>
        </Notification>
      );
  }

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <LineageForm
      type="edit"
      maleBreeds={maleBreeds}
      femaleBreeds={femaleBreeds}
      onSubmit={onSubmit}
      lineage={data}
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

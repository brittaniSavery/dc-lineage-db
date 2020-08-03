import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import useSWR from "swr";

function getDragonDisplay(dragon) {
  return dragon.name || (dragon.code && `(${dragon.code})`) || "[Pending]";
}

export default function Lineages() {
  const router = useRouter();
  const { lineageId } = router.query;
  const { data: lineage } = useSWR(lineageId && `/api/lineages/${lineageId}`);
  const maleDisplay = lineage && getDragonDisplay(lineage.male);
  const femaleDisplay = lineage && getDragonDisplay(lineage.female);

  return (
    <Layout title={`Lineage: ${maleDisplay} & ${femaleDisplay}`}>
      <Header>{`${maleDisplay} & ${femaleDisplay}`}</Header>
    </Layout>
  );
}

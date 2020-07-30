import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

export default function Lineages() {
  const router = useRouter();
  const { lineageId } = router.query;
  return (
    <Layout title="My Lineages">
      <Header>Lineage: {lineageId}</Header>
    </Layout>
  );
}

import React from "react";

export default function SearchDatabase() {
  return (
    <>
      <p>[Insert Terms].</p>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Terms and Conditions",
    },
  };
}

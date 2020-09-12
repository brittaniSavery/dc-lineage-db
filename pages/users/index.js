import React from "react";

export default function SearchUsers() {
  return (
    <>
      <p>Find a specific user in the Lineage Database.</p>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Find a User",
    },
  };
}

import React from "react";

export default function ViewUser() {
  return (
    <>
      <p>[Insert User Info here]</p>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { username: "Forever_Mone" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const user = params.username;
  return {
    props: {
      title: `User: ${user}`,
    },
  };
}

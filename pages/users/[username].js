import React from "react";

export default function ViewUser() {
  return (
    <>
      <p>[Insert User Info here]</p>
    </>
  );
}

export async function getStaticprops() {
  const user = "Testing";
  return {
    props: {
      title: `User: ${user}`,
    },
  };
}

import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

export default function SearchCard({ type }) {
  return (
    <Card>
      <CardHeader title={type}></CardHeader>
      <CardContent>{"Table will go here"}</CardContent>
    </Card>
  );
}

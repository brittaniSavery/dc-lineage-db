import React from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import {
  SITE_NAME,
  SITE_NAME_ABBV,
  SEARCH_LINEAGES,
  ADD_LINEAGE,
} from "../lib/constants";

export default function Index() {
  return (
    <React.Fragment>
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {SITE_NAME_ABBV}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {SITE_NAME}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          The one-stop shop to host all your dragon cave lineages. No matter
          whether they are checkers or staircases, shinies or holidays, 2nd
          generation or 12th generation, all lineages are welcomed here!
        </Typography>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              {ADD_LINEAGE}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              {SEARCH_LINEAGES}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Layout from "../components/Layout";
import SearchCard from "../components/SearchCard";
import { ADD_LINEAGE, SEARCH_LINEAGES, SITE_NAME } from "../lib/constants";
import Link from "next/link";

const useStyles = makeStyles({
  textPadding: {
    padding: 5,
  },
  buttonPadding: {
    paddingBottom: 15,
  },
});

export default function Index() {
  const classes = useStyles();

  return (
    <Layout title="Home">
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
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.buttonPadding}
      >
        <Grid item>
          <Link href="/add" passHref>
            <Button component="a" variant="contained" color="primary">
              {ADD_LINEAGE}
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/search" passHref>
            <Button component="a" variant="outlined" color="primary">
              {SEARCH_LINEAGES}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container justify="center">
        <Typography variant="h5" className={classes.textPadding}>
          Common Searches
        </Typography>
        <Grid item container justify="center" alignItems="center">
          <SearchCard type="Valentine" />
          <SearchCard type="Halloween" />
          <SearchCard type="Christmas" />
        </Grid>
      </Grid>
    </Layout>
  );
}

import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Divider,
} from "@material-ui/core";
import Head from "next/head";
import React from "react";
import SearchCard from "../components/SearchCard";
import {
  ADD_LINEAGE,
  SEARCH_LINEAGES,
  SITE_NAME,
  SITE_NAME_ABBV,
} from "../lib/constants";
import { makeStyles } from "@material-ui/styles";

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
        <Grid
          container
          spacing={2}
          justify="center"
          className={classes.buttonPadding}
        >
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
      </Container>
    </React.Fragment>
  );
}

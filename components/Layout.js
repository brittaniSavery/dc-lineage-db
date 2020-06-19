import React from "react";
import {
  AppBar,
  Toolbar,
  Link as MaterialLink,
  Container,
  IconButton,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import Head from "next/head";
import { SITE_NAME, SITE_NAME_ABBV } from "../lib/constants";
import PropTypes from "prop-types";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  menu: {
    flexGrow: 1,
  },
}));

export default function Layout({ title, children }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.menu}
          >
            <Grid item>
              <Link href="/" passHref>
                <MaterialLink
                  underline="none"
                  variant="h5"
                  color="inherit"
                  noWrap
                >
                  {SITE_NAME_ABBV}
                </MaterialLink>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/add" passHref>
                <MaterialLink
                  underline="none"
                  variant="button"
                  color="inherit"
                  noWrap
                >
                  Add
                </MaterialLink>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/search" passHref>
                <MaterialLink
                  underline="none"
                  variant="button"
                  color="inherit"
                  noWrap
                >
                  Search
                </MaterialLink>
              </Link>
            </Grid>
          </Grid>
          <Link href="/" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Head>
          <title>
            {title === "Home"
              ? `${SITE_NAME}: A Dragon Cave fansite for lineage lovers`
              : `${SITE_NAME}: ${title}`}
          </title>
        </Head>
        {children}
      </Container>
    </React.Fragment>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

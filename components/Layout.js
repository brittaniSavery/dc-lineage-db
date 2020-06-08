import React from "react";
import {
  AppBar,
  Toolbar,
  Link as MaterialLink,
  Container,
} from "@material-ui/core";
import Head from "next/head";
import { SITE_NAME, SITE_NAME_ABBV } from "../lib/constants";
import PropTypes from "prop-types";
import Link from "next/link";

export default function Layout({ title, children }) {
  return (
    <React.Fragment>
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Link href="/" passHref>
            <MaterialLink underline="none" variant="h6" color="inherit" noWrap>
              {SITE_NAME_ABBV}
            </MaterialLink>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Head>
          <title>
            {title === "Home"
              ? `${SITE_NAME}: A Dragon Cave fansite for lineage lovers`
              : `${title}-${SITE_NAME}`}
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

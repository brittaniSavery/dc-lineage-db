import React from "react";
import PropTypes from "prop-types";
//import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

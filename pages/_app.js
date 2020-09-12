import React from "react";
import PropTypes from "prop-types";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import Header from "../components/Header";
import "../styles.scss";

export default function MyApp({ Component, pageProps }) {
  const title = pageProps.title || "";
  let header = title;
  let centered = false;
  let site = false;

  if (pageProps.header) {
    header = pageProps.header.title;
    centered = pageProps.header.centered;
    site = pageProps.header.site;
  }

  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
        onError: (err) => console.error(err),
      }}
    >
      {pageProps.fullScreen && <Component {...pageProps} />}
      {!pageProps.fullScreen && (
        <Layout title={title}>
          {title && (
            <Header site={site} centered={centered}>
              {header}
            </Header>
          )}
          <Component {...pageProps} />
        </Layout>
      )}
    </SWRConfig>
  );
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  pageProps: PropTypes.object,
};

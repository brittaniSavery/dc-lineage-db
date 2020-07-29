import React from "react";
import { SWRConfig } from "swr";
import "../styles.scss";

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

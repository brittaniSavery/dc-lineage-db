import React from "react";

export default function Footer() {
  return (
    <footer className="footer full-viewport-footer mt-4">
      <div className="content has-text-centered">
        DCLDB is an open source project maintained by a single volunteer,{" "}
        <a
          href="https://brittanisavery.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brittani Avery
        </a>
        . You can view the source code on{" "}
        <a
          href="https://github.com/brittaniSavery/dc-lineage-db"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        . Help is always welcome!
      </div>
    </footer>
  );
}

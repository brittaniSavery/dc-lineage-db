import React from "react";
import PropTypes from "prop-types";
import { PAGE_SIZE } from "../../lib/constants";

export default function Pagination({
  totalItems,
  currentPage,
  handlePageChange,
}) {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const pageLinks = [];

  // generating the pages
  for (let page = 1; page <= totalPages; page++) {
    pageLinks.push(
      <li key={`page-${page}`}>
        <a
          className={`pagination-link ${currentPage === page && "is-current"}`}
          onClick={() => handlePageChange(page)}
          aria-label={`${currentPage !== page && "Go to"} Page ${page}"`}
          aria-current={currentPage === page && "page"}
        >
          {page}
        </a>
      </li>
    );
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a
        className="pagination-previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </a>
      <a
        className="pagination-next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </a>

      <ul className="pagination-list">{pageLinks}</ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};

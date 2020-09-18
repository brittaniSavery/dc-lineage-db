import React from "react";
import PropTypes from "prop-types";
import { getDragonDisplay } from "../lib/helpers";

export default function LineagesTable({ lineages }) {
  return (
    <div className="table-container">
      <table className="table is-bordered">
        <thead>
          <tr>
            <th>
              <abbr title="Generation">Gen</abbr>
            </th>
            <th>Type</th>
            <th>Male</th>
            <th>Female</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lineages.map((lineage, index) => (
            <tr key={`lineage-${index}`}>
              <td>{lineage.generation}</td>
              <td>{lineage.type}</td>
              <td>{`${lineage.male.breed} - ${getDragonDisplay(
                lineage.male
              )}`}</td>
              <td>{`${lineage.female.breed} - ${getDragonDisplay(
                lineage.female
              )}`}</td>
              <td>{lineage.owner}</td>
              <td>View/Edit/Delete</td>
            </tr>
          ))}
          {lineages.length === 0 && (
            <tr>
              <td colSpan="6">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

LineagesTable.propTypes = {
  lineages: PropTypes.arrayOf(PropTypes.object),
};

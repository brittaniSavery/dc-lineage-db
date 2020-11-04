import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDragonDisplay, getSampleLink } from "../../lib/helpers";
import { useAuth } from "../../lib/hooks";
import Link from "next/link";
import DeleteLineageConfirm from "./DeleteLineageConfirm";

export default function LineagesTable({ lineages, isPublic }) {
  const { auth } = useAuth();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [deletedLineage, setDeletedLineage] = React.useState();

  return (
    <div className="table-container">
      <DeleteLineageConfirm
        open={deleteConfirmOpen}
        onClose={() => {
          setDeletedLineage();
          setDeleteConfirmOpen(false);
        }}
        lineage={deletedLineage}
      />
      <table className="table is-hoverable is-bordered">
        <thead>
          <tr>
            <th>
              <abbr title="Generation">Gen</abbr>
            </th>
            <th>Type</th>
            <th>Male</th>
            <th>Female</th>
            <th>Offspring</th>
            {isPublic && <th>Owner</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lineages.map((lineage, index) => {
            const isPrivate = auth && auth.user.username === lineage.owner;

            return (
              <tr key={`lineage-${index}`}>
                <td>{lineage.generation}</td>
                <td>{lineage.type}</td>
                <td>{`${lineage.male.breed} - ${getDragonDisplay(
                  lineage.male
                )}`}</td>
                <td>{`${lineage.female.breed} - ${getDragonDisplay(
                  lineage.female
                )}`}</td>
                <td>{getSampleLink(lineage)}</td>
                {isPublic && <td>{lineage.owner}</td>}
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href="/lineages/[lineageId]"
                    as={`/lineages/${lineage._id}`}
                  >
                    <a>
                      <FontAwesomeIcon icon="eye" />
                      <span className="is-sr-only">View Lineage</span>
                    </a>
                  </Link>
                  {isPrivate && (
                    <Link
                      href="/lineages/[lineageId]/edit"
                      as={`/lineages/${lineage._id}/edit`}
                    >
                      <a>
                        <FontAwesomeIcon className="mx-1" icon="edit" />
                        <span className="is-sr-only">Edit Lineage</span>
                      </a>
                    </Link>
                  )}
                  {isPrivate && (
                    <a
                      onClick={() => {
                        setDeletedLineage(lineage);
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <FontAwesomeIcon icon="trash-alt" />
                      <span className="is-sr-only">Delete Lineage</span>
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
          {lineages.length === 0 && (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

LineagesTable.propTypes = {
  lineages: PropTypes.arrayOf(PropTypes.object),
  isPublic: PropTypes.bool,
};

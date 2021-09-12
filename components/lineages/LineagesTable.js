import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDragonDisplay, getSampleLink } from "../../lib/helpers";
import { useAuth } from "../../lib/hooks";
import Link from "next/link";
import DeleteLineageConfirm from "./DeleteLineageConfirm";
import parse from "html-react-parser";

export default function LineagesTable({ lineages, isPublic }) {
  const { auth } = useAuth();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [deletedLineage, setDeletedLineage] = React.useState();

  return (
    <>
      <DeleteLineageConfirm
        open={deleteConfirmOpen}
        onClose={() => {
          setDeletedLineage();
          setDeleteConfirmOpen(false);
        }}
        lineage={deletedLineage}
      />
      <div className="table-container">
        <table className="table is-hoverable is-bordered is-fullwidth">
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
                  <td>
                    {parse(
                      `${lineage.male.breed} - ${getDragonDisplay(
                        lineage.male
                      )}`
                    )}
                  </td>
                  <td>
                    {parse(
                      `${lineage.female.breed} - ${getDragonDisplay(
                        lineage.female
                      )}`
                    )}
                  </td>

                  <td>{getSampleLink(lineage)}</td>
                  {isPublic && <td>{lineage.owner}</td>}
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href="/lineages/[lineageId]"
                      as={`/lineages/${lineage._id}`}
                    >
                      <a aria-label="View Lineage">
                        <FontAwesomeIcon icon="eye" />
                      </a>
                    </Link>
                    {isPrivate && (
                      <Link
                        href="/lineages/[lineageId]/edit"
                        as={`/lineages/${lineage._id}/edit`}
                      >
                        <a aria-label="Edit Lineage">
                          <FontAwesomeIcon className="mx-1" icon="edit" />
                        </a>
                      </Link>
                    )}
                    {isPrivate && (
                      <a
                        onClick={() => {
                          setDeletedLineage(lineage);
                          setDeleteConfirmOpen(true);
                        }}
                        aria-label="Delete Lineage"
                      >
                        <FontAwesomeIcon icon="trash-alt" />
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

LineagesTable.propTypes = {
  lineages: PropTypes.arrayOf(PropTypes.object),
  isPublic: PropTypes.bool,
};

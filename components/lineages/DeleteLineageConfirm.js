import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Notification from "../Notification";
import { getDragonDisplay } from "../../lib/helpers";
import ButtonContainer from "../ButtonContainer";
import Button from "../Button";

export default function DeleteLineageConfirm({
  open = false,
  onClose = () => null,
  lineage,
}) {
  const [successfulDelete, setSuccessfulDelete] = React.useState(false);

  const onConfirm = async () => {
    const result = await fetch(`/api/lineages/${lineage._id}`, {
      method: "DELETE",
    });
    if (result.ok) setSuccessfulDelete(true);
    else console.log(await result.text());
  };

  if (!lineage) return null;

  return (
    <div className={classNames("modal", { "is-active": open })}>
      <div className="modal-background" />
      <div className="modal-content">
        {successfulDelete ? (
          <Notification status="success" title="Deletion Complete!">
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Notification>
        ) : (
          <div className="message is-danger">
            <div className="message-header">
              <p>Delete this lineage?</p>
            </div>
            <div className="message-body">
              <p>
                This action will permanently remove the lineage information for
                the following breeding pair:
              </p>
              <div className="content">
                <ul>
                  <li>
                    <b>Male: </b>
                    {lineage.male.breed} - {getDragonDisplay(lineage.male)}
                  </li>
                  <li>
                    <b>Female: </b>
                    {lineage.female.breed} - {getDragonDisplay(lineage.female)}
                  </li>
                </ul>
              </div>
              <p className="pb-4">
                Please confirm to delete this lineage from the database.
              </p>
              <ButtonContainer>
                <Button color="danger" onClick={onConfirm}>
                  Delete
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </ButtonContainer>
            </div>
          </div>
        )}
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      />
    </div>
  );
}

DeleteLineageConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lineage: PropTypes.object,
};

import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Header from "../../../components/layout/Header";
import { useAuth, useLineage } from "../../../lib/hooks";
import Head from "next/head";
import { LINEAGE_SITES_STATUS, SITE_NAME } from "../../../lib/constants";
import Subheader from "../../../components/layout/Subheader";
import Link from "next/link";
import { getLineageDisplay, getSampleLink } from "../../../lib/helpers";
import Notification from "../../../components/Notification";
import { titleCase } from "title-case";
import ButtonContainer from "../../../components/ButtonContainer";
import Button from "../../../components/Button";
import DeleteLineageConfirm from "../../../components/lineages/DeleteLineageConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ParentColumn = ({ name, code, gender, breed }) => (
  <div className="column">
    <Subheader>{gender || "male"}</Subheader>
    {/* <img src="/images/Aeon_Wyvern_male.png" alt="" className="py-2" /> */}
    <p>
      <b>Breed:</b> {breed}
    </p>
    <p>
      <b>Name:</b> {name}
    </p>
    {code && (
      <p>
        <a
          href={`https://dragcave.net/lineage/${code}`}
          target="_blank"
          rel="noreferrer"
        >
          View Lineage of {name}
        </a>
      </p>
    )}
  </div>
);

ParentColumn.propTypes = {
  name: PropTypes.node,
  code: PropTypes.string,
  gender: PropTypes.string,
  breed: PropTypes.string,
};

const Attributes = ({ lineage }) => {
  if (lineage.shiny || (lineage.holiday && lineage.holiday.length > 0))
    return (
      <div className="tags my-1">
        {lineage.shiny && <span className="tag">Shiny</span>}
        {lineage.holiday &&
          lineage.holiday.map((h) => (
            <span key={h} className="tag">
              {titleCase(h)}
            </span>
          ))}
      </div>
    );
  else return null;
};

Attributes.propTypes = {
  lineage: PropTypes.object,
};

const EditButton = React.forwardRef(({ href }, ref) => {
  return (
    <a className="button is-primary" href={href} ref={ref}>
      Edit
      <FontAwesomeIcon className="ml-2" icon="edit" />
    </a>
  );
});

EditButton.propTypes = {
  href: PropTypes.string,
};
EditButton.displayName = "EditButton";

export default function ViewLineage() {
  const { auth } = useAuth();
  const router = useRouter();

  const { lineageId } = router.query;
  const { lineage, isLineageLoading } = useLineage(lineageId);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [deletedLineage, setDeletedLineage] = React.useState();

  //Tell user that things are still loading
  if (isLineageLoading) {
    return <Header>Loading...</Header>;
  }
  //Or the lineage is not found
  else if (!(isLineageLoading || lineage))
    return (
      <>
        <Notification status="error" title="Lineage Not Found">
          Sorry, there is no lineage with this id in the database.
        </Notification>
      </>
    );

  const lineageDisplay = getLineageDisplay(lineage);
  const lineageSample = getSampleLink(lineage, true);

  return (
    <>
      <Head>
        <title>{`${SITE_NAME}: ${lineageDisplay.male.title} & ${lineageDisplay.female.title}`}</title>
      </Head>
      <Header>
        {lineageDisplay.male.view} {"&"} {lineageDisplay.female.view}
      </Header>
      <DeleteLineageConfirm
        open={deleteConfirmOpen}
        onClose={() => {
          setDeletedLineage();
          setDeleteConfirmOpen(false);
        }}
        onSuccessClose={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/database");
          }
        }}
        lineage={deletedLineage}
      />

      <div className="columns pt-3">
        <ParentColumn
          name={lineageDisplay.male.view}
          code={lineage.male.code}
          breed={lineage.male.breed}
          gender="male"
        />
        <ParentColumn
          name={lineageDisplay.female.view}
          code={lineage.female.code}
          breed={lineage.female.breed}
          gender="female"
        />
      </div>
      <div className="columns">
        <div className="column">
          <Subheader>Lineage</Subheader>
          <Attributes lineage={lineage} />
          <p>
            <b>Type:</b> {lineage.type}
          </p>
          <p>
            <b>Current Generation:</b> {lineage.generation}
          </p>
          <p>
            <b>Owner:</b>{" "}
            <Link href="/users/[username]" as={`/users/${lineage.owner}`}>
              <a>{lineage.owner}</a>
            </Link>
          </p>
          {lineageSample && (
            <p>
              <b>Sample:</b> {lineageSample}
            </p>
          )}
          {lineage.cdc && (
            <p>
              <b>
                <abbr title="Checker Database Center">CDC</abbr> Entry:
              </b>{" "}
              {LINEAGE_SITES_STATUS.find((s) => s.value === lineage.cdc).label}
            </p>
          )}
          {lineage.srogg && (
            <p>
              <b>
                <abbr title="Special Release Offspring Gifiting Group">
                  SROGG
                </abbr>{" "}
                Entry:
              </b>{" "}
              {
                LINEAGE_SITES_STATUS.find((s) => s.value === lineage.srogg)
                  .label
              }
            </p>
          )}
          {lineage.notes && (
            <p>
              <b>Notes:</b> {lineage.notes}
            </p>
          )}
          {auth && (
            <ButtonContainer className="pt-3">
              <Link
                href="/lineages/[lineageId]/edit"
                as={`/lineages/${lineage._id}/edit`}
                passHref
              >
                <EditButton />
              </Link>
              <Button
                color="danger"
                onClick={() => {
                  setDeletedLineage(lineage);
                  setDeleteConfirmOpen(true);
                }}
              >
                Delete <FontAwesomeIcon className="ml-2" icon="trash-alt" />
              </Button>
            </ButtonContainer>
          )}
        </div>
      </div>
    </>
  );
}

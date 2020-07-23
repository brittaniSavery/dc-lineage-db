import Layout from "../components/Layout";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <Layout title="Home">
      <Header centered>Dragon Cave Lineage Database</Header>
      <h2 className="site-header is-size-5-desktop is-size-4-widescreen has-text-grey-light has-text-centered">
        The one-stop shop to host all your dragon cave lineages. No matter
        whether they are checkers or staircases, shinies or holidays, 2nd
        generation or 12th generation, all lineages are welcomed here!
      </h2>
      <p className="has-text-centered">
        If you would like to add your lineages to the database and save favorite
        searches, login/sign up{" "}
        <Link href="/api/login">
          <a>here</a>
        </Link>
        !
      </p>
      <div className="level pt-4">
        <div className="level-item has-text-centered">
          <div className="buttons">
            <Link href="/add">
              <a className="button is-primary is-uppercase">Add Lineage</a>
            </Link>
            <Link href="/search">
              <a className="button is-primary is-outlined is-uppercase">
                Search Lineages
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

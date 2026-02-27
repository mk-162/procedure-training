import Link from "next/link";

export const metadata = {
  title: "Privacy notice — Erskine May procedural training",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="parliament-banner">
        <div className="container">
          <h1>Privacy notice</h1>
        </div>
      </div>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Privacy notice</li>
          </ol>
        </nav>
      </div>
      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          <div className="block block--accent">
            <h2>Your privacy</h2>
            <p>
              This training application does not collect, store or process
              personal data. No user accounts are required and no tracking is
              used.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

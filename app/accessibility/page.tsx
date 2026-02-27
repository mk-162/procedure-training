import Link from "next/link";

export const metadata = {
  title: "Accessibility statement — Erskine May procedural training",
};

export default function AccessibilityPage() {
  return (
    <>
      <div className="parliament-banner">
        <div className="container">
          <h1>Accessibility statement</h1>
        </div>
      </div>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Accessibility statement</li>
          </ol>
        </nav>
      </div>
      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          <div className="block block--accent">
            <h2>Accessibility</h2>
            <p>
              This training application aims to be accessible to all users. It
              follows the{" "}
              <a href="https://www.w3.org/TR/WCAG22/" rel="noreferrer noopener">
                Web Content Accessibility Guidelines (WCAG) 2.2
              </a>{" "}
              at level AA.
            </p>
            <h3>What we have done</h3>
            <ul>
              <li>All pages use semantic HTML elements</li>
              <li>All interactive elements are keyboard accessible</li>
              <li>Focus states are visible and meet contrast requirements</li>
              <li>A skip link is provided on every page</li>
              <li>Colour contrast meets WCAG 2.2 level AA</li>
              <li>The service works at up to 400% zoom</li>
            </ul>
            <h3>Reporting accessibility problems</h3>
            <p>
              If you find any accessibility problems not listed on this page, or
              think we are not meeting accessibility requirements, please contact
              us.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

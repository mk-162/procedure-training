import Link from "next/link";

export const metadata = {
  title: "Accessibility statement — Erskine May procedural training",
};

export default function AccessibilityPage() {
  return (
    <div className="govuk-width-container">
      <Link href="/" className="govuk-back-link">Back to home</Link>
      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Accessibility statement</h1>
            <p className="govuk-body">
              This training application aims to be accessible to all users. It follows the{" "}
              <a href="https://www.w3.org/TR/WCAG22/" className="govuk-link" rel="noreferrer noopener">
                Web Content Accessibility Guidelines (WCAG) 2.2
              </a>{" "}
              at level AA.
            </p>
            <h2 className="govuk-heading-m">What we have done</h2>
            <ul className="govuk-list govuk-list--bullet">
              <li>All pages use semantic HTML elements</li>
              <li>All interactive elements are keyboard accessible</li>
              <li>Focus states are visible and meet contrast requirements</li>
              <li>A skip link is provided on every page</li>
              <li>Colour contrast meets WCAG 2.2 level AA</li>
              <li>The service works at up to 400% zoom</li>
            </ul>
            <h2 className="govuk-heading-m">Reporting accessibility problems</h2>
            <p className="govuk-body">
              If you find any accessibility problems not listed on this page, or
              think we are not meeting accessibility requirements, please contact us.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

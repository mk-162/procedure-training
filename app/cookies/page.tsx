import Link from "next/link";

export const metadata = {
  title: "Cookies — Erskine May procedural training",
};

export default function CookiesPage() {
  return (
    <div className="govuk-width-container">
      <Link href="/" className="govuk-back-link">Back to home</Link>
      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Cookies</h1>
            <p className="govuk-body">
              This service uses only essential cookies required for the application to function. We do not use analytics or tracking cookies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

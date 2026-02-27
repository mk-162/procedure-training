import Link from "next/link";

export const metadata = {
  title: "Privacy — Erskine May procedural training",
};

export default function PrivacyPage() {
  return (
    <div className="govuk-width-container">
      <Link href="/" className="govuk-back-link">Back to home</Link>
      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Privacy</h1>
            <p className="govuk-body">
              This training application does not collect personal data. Your progress is stored locally in your browser using localStorage and is not transmitted to any server.
            </p>
            <h2 className="govuk-heading-m">Cookies</h2>
            <p className="govuk-body">
              This service uses only essential cookies required for the application to function.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

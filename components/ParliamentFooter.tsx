import Link from "next/link";

export function ParliamentFooter() {
  return (
    <footer className="govuk-footer" role="contentinfo" data-module="govuk-footer">
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-footer__heading govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__list govuk-footer__list--columns-3">
              <li className="govuk-footer__list-item">
                <Link href="/accessibility" className="govuk-footer__link">
                  Accessibility statement
                </Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link href="/cookies" className="govuk-footer__link">
                  Cookie policy
                </Link>
              </li>
              <li className="govuk-footer__list-item">
                <Link href="/privacy" className="govuk-footer__link">
                  Privacy notice
                </Link>
              </li>
            </ul>
            <div className="govuk-footer__meta-custom">
              <p className="govuk-body-s">
                Content from{" "}
                <a
                  href="https://erskinemay.parliament.uk/"
                  className="govuk-footer__link"
                  rel="noreferrer noopener"
                >
                  Erskine May (25th edition)
                </a>
                . Reproduced under the{" "}
                <a
                  href="https://www.parliament.uk/site-information/copyright-parliament/"
                  className="govuk-footer__link"
                  rel="noreferrer noopener"
                >
                  Open Parliament Licence
                </a>
                .
              </p>
              <p className="govuk-body-s">
                This training resource is not an official publication of the House of
                Commons. For authoritative guidance, consult the Table Office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
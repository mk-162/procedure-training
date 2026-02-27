import Link from "next/link";

export function ParliamentFooter() {
  return (
    <footer className="parliament-footer" role="contentinfo">
      <div className="container">
        <nav className="parliament-footer__nav" aria-label="Footer">
          <ul className="parliament-footer__list">
            <li>
              <Link href="/accessibility" className="parliament-footer__link">
                Accessibility statement
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="parliament-footer__link">
                Cookie policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="parliament-footer__link">
                Privacy notice
              </Link>
            </li>
          </ul>
        </nav>
        <div className="parliament-footer__meta">
          <p>
            Content from{" "}
            <a
              href="https://erskinemay.parliament.uk/"
              className="parliament-footer__link"
              rel="noreferrer noopener"
            >
              Erskine May (25th edition)
            </a>
            . Reproduced under the{" "}
            <a
              href="https://www.parliament.uk/site-information/copyright-parliament/"
              className="parliament-footer__link"
              rel="noreferrer noopener"
            >
              Open Parliament Licence
            </a>
            .
          </p>
          <p>
            This training resource is not an official publication of the House of
            Commons. For authoritative guidance, consult the Table Office.
          </p>
        </div>
      </div>
    </footer>
  );
}

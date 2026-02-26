import Link from "next/link";

export function ParliamentHeader() {
  return (
    <header className="parliament-header" role="banner">
      <div className="parliament-header__inner">
        <Link href="/" className="parliament-header__logo" aria-label="Erskine May Training — Home">
          <svg viewBox="0 0 32 36" fill="currentColor" aria-hidden="true">
            {/* Simplified Portcullis */}
            <rect x="2" y="0" width="4" height="28" rx="1" />
            <rect x="14" y="0" width="4" height="28" rx="1" />
            <rect x="26" y="0" width="4" height="28" rx="1" />
            <rect x="0" y="4" width="32" height="3" rx="1" />
            <rect x="0" y="14" width="32" height="3" rx="1" />
            <rect x="0" y="24" width="32" height="3" rx="1" />
            <circle cx="16" cy="32" r="3" />
          </svg>
          <span className="parliament-header__title">Erskine May — Procedural Training</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="parliament-header__nav">
            <li><Link href="/">Chapter Index</Link></li>
            <li><Link href="/chapter/21">Current Programme</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

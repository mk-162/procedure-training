import Link from "next/link";

export const metadata = {
  title: "Cookie policy — Erskine May procedural training",
};

export default function CookiesPage() {
  return (
    <>
      <div className="parliament-banner">
        <div className="container">
          <h1>Cookie policy</h1>
        </div>
      </div>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Cookie policy</li>
          </ol>
        </nav>
      </div>
      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          <div className="block block--accent">
            <h2>How we use cookies</h2>
            <p>
              This service does not use cookies to track you or collect personal
              data. It uses essential cookies only to make the service work.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

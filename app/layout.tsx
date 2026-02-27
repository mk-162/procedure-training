import type { Metadata } from "next";
import { ParliamentHeader } from "@/components/ParliamentHeader";

/* Parliamentary Design System (includes GOV.UK Frontend tokens) */
import "@/styles/parliament.css";

export const metadata: Metadata = {
  title: "Erskine May — Procedural Training",
  description:
    "An authorised training resource for the practice and procedure of the House of Commons, drawing on the 25th edition of Erskine May.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="govuk-template">
      <body className="govuk-template__body">
        <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
          Skip to main content
        </a>
        <ParliamentHeader />
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}

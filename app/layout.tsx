import type { Metadata, Viewport } from "next";
import { ParliamentHeader } from "@/components/ParliamentHeader";
import { ParliamentFooter } from "@/components/ParliamentFooter";
import { GovukInit } from "@/components/GovukInit";

/* GOV.UK Frontend (compiled via Sass) + Parliamentary overrides */
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "Erskine May — Procedural training",
  description:
    "An authorised training resource for the practice and procedure of the House of Commons, drawing on the 25th edition of Erskine May.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#373151",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="govuk-template">
      <body className="govuk-template__body js-enabled" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.className += ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');`,
          }}
        />
        <a
          href="#main-content"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
          suppressHydrationWarning
        >
          Skip to main content
        </a>
        <ParliamentHeader />
        <div className="parliament-accent-bar" aria-hidden="true" />
        {children}
        <ParliamentFooter />
        <GovukInit />
      </body>
    </html>
  );
}
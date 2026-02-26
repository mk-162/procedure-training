import type { Metadata } from "next";
import { ParliamentHeader } from "@/components/ParliamentHeader";
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
    <html lang="en">
      <body>
        <ParliamentHeader />
        {children}
      </body>
    </html>
  );
}

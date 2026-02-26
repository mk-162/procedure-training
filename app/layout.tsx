import type { Metadata } from "next";
import { ParliamentHeader } from "@/components/ParliamentHeader";
import "@/styles/parliament.css";

export const metadata: Metadata = {
  title: "Erskine May Training",
  description:
    "Interactive parliamentary procedure training for House of Commons staff, powered by the official Erskine May API.",
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

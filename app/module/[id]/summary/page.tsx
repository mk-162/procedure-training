import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getModuleById } from "@/lib/modules";
import { ModuleSummaryClient } from "./ModuleSummaryClient";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModuleSummaryPage({ params }: ModulePageProps) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          <p className="govuk-body">Loading results...</p>
        </main>
      </div>
    }>
      <ModuleSummaryClient module={module} />
    </Suspense>
  );
}

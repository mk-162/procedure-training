import { notFound } from "next/navigation";
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

  return <ModuleSummaryClient module={module} />;
}

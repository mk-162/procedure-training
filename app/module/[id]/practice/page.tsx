import { notFound } from "next/navigation";
import { getModuleById } from "@/lib/modules";
import { ModulePracticeClient } from "./ModulePracticeClient";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModulePracticePage({ params }: ModulePageProps) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  return <ModulePracticeClient module={module} />;
}

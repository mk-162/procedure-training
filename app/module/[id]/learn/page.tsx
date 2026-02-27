import { notFound } from "next/navigation";
import { getModuleById } from "@/lib/modules";
import { ModuleLearnClient } from "./ModuleLearnClient";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModuleLearnPage({ params }: ModulePageProps) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  return <ModuleLearnClient module={module} />;
}

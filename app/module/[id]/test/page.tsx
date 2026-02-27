import { notFound } from "next/navigation";
import { getModuleById } from "@/lib/modules";
import { ModuleTestClient } from "./ModuleTestClient";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModuleTestPage({ params }: ModulePageProps) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  return <ModuleTestClient module={module} />;
}

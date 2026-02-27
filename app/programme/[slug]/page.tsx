import { notFound } from "next/navigation";
import { getProgrammeBySlug } from "@/lib/programmes";
import { getModulesForProgramme } from "@/lib/modules";
import { ProgrammeClient } from "./ProgrammeClient";

interface ProgrammePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgrammePage({ params }: ProgrammePageProps) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);

  if (!programme) {
    notFound();
  }

  const modules = getModulesForProgramme(slug);

  return <ProgrammeClient programme={programme} moduleList={modules} />;
}

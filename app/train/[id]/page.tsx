import { notFound } from "next/navigation";
import { ScenarioCard } from "@/components/ScenarioCard";
import { AuthorityPanel } from "@/components/AuthorityPanel";
import { getScenarioById, DEMO_SCENARIOS } from "@/lib/scenarios";
import { fetchSection } from "@/lib/erskine-api";
import Link from "next/link";

export async function generateStaticParams() {
  return DEMO_SCENARIOS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scenario = getScenarioById(id);
  if (!scenario) return { title: "Not Found" };
  return {
    title: `${scenario.title} — Erskine May training`,
    description: scenario.context.slice(0, 160),
  };
}

export default async function TrainPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scenario = getScenarioById(id);
  if (!scenario) return notFound();

  let sectionData;
  try {
    sectionData = await fetchSection(scenario.sectionId);
  } catch {
    sectionData = null;
  }

  return (
    <div className="govuk-width-container">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href="/">Home</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href="/library">Chapter index</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href={`/chapter/${sectionData?.chapterNumber || 21}`}>
              Chapter {sectionData?.chapterNumber || 21}
            </Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">{scenario.title}</li>
        </ol>
      </div>

      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">Procedural exercise</span>
            <ScenarioCard scenario={scenario} />
          </div>
          <div className="govuk-grid-column-one-third">
            <h3 className="govuk-heading-s">Source authority</h3>

            {sectionData ? (
              <>
                <AuthorityPanel
                  title={sectionData.title}
                  contentHtml={sectionData.contentHtml}
                  sectionId={sectionData.id}
                  paragraphRef={scenario.paragraphRef}
                />
                <p className="govuk-body-s govuk-!-margin-top-4">
                  Chapter {sectionData.chapterNumber}: {sectionData.chapterTitle}
                </p>
              </>
            ) : (
              <div className="govuk-inset-text">
                We cannot reach the Erskine May API at the moment. Consult the Table Office for authoritative guidance.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

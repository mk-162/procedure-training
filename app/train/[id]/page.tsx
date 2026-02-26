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
    title: `${scenario.title} — Erskine May Training`,
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

  // Fetch the live Erskine May source text
  let sectionData;
  try {
    sectionData = await fetchSection(scenario.sectionId);
  } catch {
    // API unavailable — show scenario without source
    sectionData = null;
  }

  return (
    <main className="page-content">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Modules</Link></li>
            <li>Chapter 21</li>
            <li aria-current="page">{scenario.title}</li>
          </ol>
        </nav>

        <div className="split-layout">
          {/* Left: Interactive Scenario */}
          <div className="split-layout__primary">
            <ScenarioCard scenario={scenario} />
          </div>

          {/* Right: Erskine May Source Text */}
          <div className="split-layout__secondary">
            <h3 style={{ marginBottom: "var(--space-4)" }}>Authority</h3>

            {sectionData ? (
              <>
                {sectionData.isUpdated && (
                  <div className="update-alert">
                    <strong>⚠ Updated</strong> — This section has been modified
                    since the 2019 print edition.
                    {sectionData.updatedDate && (
                      <>
                        {" "}Last updated:{" "}
                        {new Date(sectionData.updatedDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </>
                    )}
                  </div>
                )}

                <AuthorityPanel
                  title={sectionData.title}
                  contentHtml={sectionData.contentHtml}
                  sectionId={sectionData.id}
                  paragraphRef={scenario.paragraphRef}
                />

                <div style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                  <p>
                    Chapter {sectionData.chapterNumber}: {sectionData.chapterTitle}
                  </p>
                  {sectionData.titleChain && (
                    <p>Section: {sectionData.titleChain}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="update-alert">
                <strong>Source unavailable</strong> — Unable to reach the Erskine
                May API. Consult the Table Office for authoritative guidance.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

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

  // Fetch the live Erskine May source text
  let sectionData;
  try {
    sectionData = await fetchSection(scenario.sectionId);
  } catch {
    // API unavailable — show scenario without source
    sectionData = null;
  }

  return (
    <>
    {/* Page title banner */}
    <div className="parliament-banner">
      <div className="container">
        <h1>{scenario.title}</h1>
      </div>
    </div>

    {/* Breadcrumbs */}
    <div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs__list">
          <li><Link href="/">Chapter index</Link></li>
          <li><Link href="/chapter/21">Chapter 21</Link></li>
          <li aria-current="page">{scenario.title}</li>
        </ol>
      </nav>
    </div>

    <main id="main-content" className="page-content page-content--grey">
      <div className="container">
        <div className="split-layout">
          {/* Left: interactive scenario */}
          <div className="split-layout__primary block">
            <ScenarioCard scenario={scenario} />
          </div>

          {/* Right: Erskine May source text */}
          <div className="split-layout__secondary block">
            <h3 className="source-authority__heading">Source authority</h3>

            {sectionData ? (
              <>
                {sectionData.isUpdated && (
                  <div className="update-alert">
                    <strong>Updated</strong> — This section has changed since
                    the 2019 print edition.
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

                <div className="source-authority__meta">
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
                <strong>Source unavailable</strong> — We cannot reach the Erskine
                May API at the moment. Consult the Table Office for authoritative
                guidance.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

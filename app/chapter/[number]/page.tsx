import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchChapter, type ChapterSection } from "@/lib/erskine-api";
import { getChapter, getPartForChapter, PARTS } from "@/lib/chapter-data";
import { DEMO_SCENARIOS } from "@/lib/scenarios";

export async function generateStaticParams() {
  return PARTS.flatMap((p) => p.chapters).map((c) => ({
    number: String(c.number),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const meta = getChapter(Number(number));
  if (!meta) return { title: "Not Found" };
  return {
    title: `Chapter ${meta.number}: ${meta.title} — Erskine May Training`,
    description: `Interactive training for ${meta.title}. ${meta.sectionCount} sections, ${meta.sprintCount} sprints.`,
  };
}

function SectionTree({
  sections,
  depth = 0,
  chapterNumber,
}: {
  sections: ChapterSection[];
  depth?: number;
  chapterNumber: number;
}) {
  return (
    <ul className={`section-tree ${depth === 0 ? "section-tree--root" : ""}`}>
      {sections.map((section) => {
        const scenarios = DEMO_SCENARIOS.filter(
          (s) => s.sectionId === section.id
        );
        return (
          <li key={section.id} className="section-tree__item">
            <div className="section-tree__row">
              <span className="section-tree__id">{section.id}</span>
              <span className="section-tree__title">{section.title}</span>
              {scenarios.length > 0 && (
                <Link
                  href={`/train/${scenarios[0].id}`}
                  className="tag tag--green"
                >
                  {scenarios.length} scenario{scenarios.length > 1 ? "s" : ""}
                </Link>
              )}
            </div>
            {section.subSections.length > 0 && (
              <SectionTree
                sections={section.subSections}
                depth={depth + 1}
                chapterNumber={chapterNumber}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const chapterNumber = Number(number);
  const meta = getChapter(chapterNumber);
  if (!meta) return notFound();

  const part = getPartForChapter(chapterNumber);

  let apiData;
  try {
    apiData = await fetchChapter(chapterNumber);
  } catch {
    apiData = null;
  }

  // Count total sections recursively
  function countSections(sections: ChapterSection[]): number {
    let count = sections.length;
    for (const s of sections) {
      count += countSections(s.subSections);
    }
    return count;
  }

  const totalSections = apiData ? countSections(apiData.sections) : meta.sectionCount;
  const scenariosAvailable = DEMO_SCENARIOS.filter((s) => {
    if (!apiData) return false;
    const allIds = getAllSectionIds(apiData.sections);
    return allIds.includes(s.sectionId);
  });

  return (
    <main className="page-content">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">All Chapters</Link></li>
            {part && <li>Part {part.number}: {part.title}</li>}
            <li aria-current="page">Chapter {chapterNumber}</li>
          </ol>
        </nav>

        {/* Chapter header */}
        <div className="chapter-header">
          <div className="chapter-header__number">Chapter {chapterNumber}</div>
          <h1 className="chapter-header__title">{apiData?.title || meta.title}</h1>

          {meta.moduleTitle && (
            <div className="chapter-header__module">
              <span className="tag tag--blue">{meta.moduleTitle}</span>
              {meta.moduleDescription && (
                <span className="chapter-header__module-desc">{meta.moduleDescription}</span>
              )}
            </div>
          )}

          <div className="chapter-header__stats">
            <div className="stat">
              <div className="stat__value">{totalSections}</div>
              <div className="stat__label">Sections</div>
            </div>
            <div className="stat">
              <div className="stat__value">{meta.sprintCount}</div>
              <div className="stat__label">Sprints</div>
            </div>
            <div className="stat">
              <div className="stat__value">~{meta.sprintCount * 3}</div>
              <div className="stat__label">Minutes</div>
            </div>
            <div className="stat">
              <div className="stat__value">{scenariosAvailable.length}</div>
              <div className="stat__label">Scenarios</div>
            </div>
          </div>
        </div>

        {/* Start training CTA */}
        {meta.status === "available" && scenariosAvailable.length > 0 ? (
          <div className="chapter-cta">
            <Link href={`/train/${scenariosAvailable[0].id}`} className="btn btn--primary btn--lg">
              Start Training →
            </Link>
            <span className="chapter-cta__hint">
              Begin with Sprint 1: {scenariosAvailable[0].title}
            </span>
          </div>
        ) : (
          <div className="chapter-cta">
            <div className="update-alert">
              <strong>Coming soon</strong> — Scenarios for this chapter are being developed.
              The section index below shows the live Erskine May content.
            </div>
          </div>
        )}

        {/* Section tree */}
        <div className="chapter-sections">
          <h2>Sections</h2>
          <p>Live from the Erskine May API. Sections with available training scenarios are highlighted.</p>
          {apiData ? (
            <SectionTree sections={apiData.sections} chapterNumber={chapterNumber} />
          ) : (
            <div className="update-alert">
              <strong>Unable to load sections</strong> — The Erskine May API is currently unavailable. Consult the Table Office.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function getAllSectionIds(sections: ChapterSection[]): number[] {
  const ids: number[] = [];
  for (const s of sections) {
    ids.push(s.id);
    ids.push(...getAllSectionIds(s.subSections));
  }
  return ids;
}

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
    title: `Chapter ${meta.number}: ${meta.title} — Erskine May procedural training`,
    description: `Training exercises for chapter ${meta.number}: ${meta.title}. Scenario-based learning for House of Commons procedure.`,
  };
}

function SectionTree({
  sections,
  chapterNumber,
}: {
  sections: ChapterSection[];
  depth?: number;
  chapterNumber: number;
}) {
  return (
    <ul className="section-tree section-tree--root">
      {sections.map((section) => (
        <SectionNode
          key={section.id}
          section={section}
          chapterNumber={chapterNumber}
        />
      ))}
    </ul>
  );
}

function SectionNode({
  section,
  chapterNumber,
}: {
  section: ChapterSection;
  chapterNumber: number;
}) {
  const scenarios = DEMO_SCENARIOS.filter((s) => s.sectionId === section.id);
  return (
    <li className="section-tree__item">
      <div className="section-tree__row">
        <span className="section-tree__id">{section.id}</span>
        <Link href={`/section/${section.id}`} className="section-tree__title-link">
          {section.title}
        </Link>
        {scenarios.length > 0 && (
          <Link href={`/train/${scenarios[0].id}`} className="tag tag--green">
            {scenarios.length} exercise{scenarios.length > 1 ? "s" : ""}
          </Link>
        )}
      </div>
      {section.subSections.length > 0 && (
        <ul className="section-tree">
          {section.subSections.map((sub) => (
            <SectionNode
              key={sub.id}
              section={sub}
              chapterNumber={chapterNumber}
            />
          ))}
        </ul>
      )}
    </li>
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

  function countSections(sections: ChapterSection[]): number {
    let count = sections.length;
    for (const s of sections) {
      count += countSections(s.subSections);
    }
    return count;
  }

  const totalSections = apiData
    ? countSections(apiData.sections)
    : meta.sectionCount;

  const scenariosAvailable = DEMO_SCENARIOS.filter((s) => {
    if (!apiData) return false;
    const allIds = getAllSectionIds(apiData.sections);
    return allIds.includes(s.sectionId);
  });

  return (
    <>
    {/* Page title banner */}
    <div className="parliament-banner">
      <div className="container">
        <h1>{apiData?.title || meta.title}</h1>
      </div>
    </div>

    {/* Breadcrumbs */}
    <div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs__list">
          <li>
            <Link href="/">Chapter index</Link>
          </li>
          {part && (
            <li>
              Part {part.number}: {part.title}
            </li>
          )}
          <li aria-current="page">Chapter {chapterNumber}</li>
        </ol>
      </nav>
    </div>

    <main className="page-content page-content--grey">
      <div className="container">
        {/* Chapter header */}
        <div className="block block--accent">
        <div className="chapter-header">
          <div className="chapter-header__number">
            Chapter {chapterNumber}
          </div>
          <h2 className="chapter-header__title">
            {apiData?.title || meta.title}
          </h2>

          {meta.moduleTitle && (
            <div className="chapter-header__module">
              <span className="tag tag--blue">{meta.moduleTitle}</span>
              {meta.moduleDescription && (
                <span className="chapter-header__module-desc">
                  {meta.moduleDescription}
                </span>
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
              <div className="stat__label">Exercises</div>
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

        {/* Training call to action */}
        {meta.status === "available" && scenariosAvailable.length > 0 ? (
          <div className="chapter-cta">
            <Link
              href={`/train/${scenariosAvailable[0].id}`}
              className="btn btn--primary btn--lg"
            >
              Start exercises
            </Link>
            <span className="chapter-cta__hint">
              Exercise 1: {scenariosAvailable[0].title}
            </span>
          </div>
        ) : (
          <div className="chapter-cta">
            <div className="update-alert">
              <strong>In preparation</strong> — We are developing training
              exercises for this chapter. The section index below shows the
              current live text of Erskine May.
            </div>
          </div>
        )}

        </div>{/* end block--accent */}

        {/* Section tree */}
        <div className="block block--spaced">
          <div className="chapter-sections">
            <h2>Section index</h2>
            <p>
              From the current digital edition of Erskine May. Sections with
              training exercises are marked.
            </p>
            {apiData ? (
              <SectionTree
                sections={apiData.sections}
                chapterNumber={chapterNumber}
              />
            ) : (
              <div className="update-alert">
                <strong>Source unavailable</strong> — We cannot reach the Erskine
                May API at the moment. Consult the Table Office for the
                authoritative text.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
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

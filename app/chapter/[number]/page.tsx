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
    description: `Training exercises for chapter ${meta.number}: ${meta.title}.`,
  };
}

function SectionList({
  sections,
  chapterNumber,
  depth = 0,
}: {
  sections: ChapterSection[];
  chapterNumber: number;
  depth?: number;
}) {
  return (
    <ul className={`govuk-list ${depth === 0 ? "govuk-!-margin-top-4" : "govuk-!-margin-left-4"}`}>
      {sections.map((section) => {
        const scenarios = DEMO_SCENARIOS.filter((s) => s.sectionId === section.id);
        return (
          <li key={section.id} className="govuk-!-margin-bottom-2">
            <Link href={`/section/${section.id}`} className="govuk-link">
              {section.title}
            </Link>
            {scenarios.length > 0 && (
              <>
                {" "}
                <strong className="govuk-tag govuk-tag--green">{scenarios.length} exercise{scenarios.length > 1 ? "s" : ""}</strong>
              </>
            )}
            {section.subSections.length > 0 && (
              <SectionList sections={section.subSections} chapterNumber={chapterNumber} depth={depth + 1} />
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
    <div className="govuk-width-container">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href="/">Home</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href="/library">Chapter index</Link>
          </li>
          {part && (
            <li className="govuk-breadcrumbs__list-item">Part {part.number}</li>
          )}
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Chapter {chapterNumber}</li>
        </ol>
      </div>

      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">Chapter {chapterNumber}</span>
            <h1 className="govuk-heading-xl">{apiData?.title || meta.title}</h1>

            <dl className="govuk-summary-list govuk-summary-list--no-border">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Sections</dt>
                <dd className="govuk-summary-list__value">{totalSections}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Exercises</dt>
                <dd className="govuk-summary-list__value">{meta.sprintCount}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Estimated time</dt>
                <dd className="govuk-summary-list__value">About {meta.sprintCount * 3} minutes</dd>
              </div>
            </dl>

            {meta.status === "available" && scenariosAvailable.length > 0 ? (
              <Link href={`/train/${scenariosAvailable[0].id}`} role="button" draggable="false" className="govuk-button govuk-button--start" data-module="govuk-button">
                Start exercises
                <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                </svg>
              </Link>
            ) : (
              <div className="govuk-warning-text">
                <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                <strong className="govuk-warning-text__text">
                  <span className="govuk-visually-hidden">Warning</span>
                  We are developing training exercises for this chapter. The section index below shows the current text of Erskine May.
                </strong>
              </div>
            )}

            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

            <h2 className="govuk-heading-l">Section index</h2>
            <p className="govuk-body">
              From the current digital edition of Erskine May. Sections with training exercises are marked.
            </p>

            {apiData ? (
              <SectionList sections={apiData.sections} chapterNumber={chapterNumber} />
            ) : (
              <div className="govuk-inset-text">
                We cannot reach the Erskine May API at the moment. Consult the Table Office for the authoritative text.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
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

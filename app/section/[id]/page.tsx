import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchSection, fetchChapter } from "@/lib/erskine-api";
import { DEMO_SCENARIOS } from "@/lib/scenarios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let section;
  try {
    section = await fetchSection(Number(id));
  } catch {
    return { title: "Not found" };
  }
  if (!section) return { title: "Not found" };
  return {
    title: `${section.title} — Chapter ${section.chapterNumber} — Erskine May`,
    description: `${section.title}. From the 25th edition of Erskine May.`,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sectionId = Number(id);

  let section;
  try {
    section = await fetchSection(sectionId);
  } catch {
    return notFound();
  }
  if (!section) return notFound();

  const exercises = DEMO_SCENARIOS.filter((s) => s.sectionId === sectionId);

  let prevSection: { id: number; title: string } | null = null;
  let nextSection: { id: number; title: string } | null = null;
  try {
    const chapter = await fetchChapter(section.chapterNumber);
    const allSections = flattenSections(chapter.sections);
    const currentIndex = allSections.findIndex((s) => s.id === sectionId);
    if (currentIndex > 0) prevSection = allSections[currentIndex - 1];
    if (currentIndex < allSections.length - 1) nextSection = allSections[currentIndex + 1];
  } catch {}

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
            <Link className="govuk-breadcrumbs__link" href={`/chapter/${section.chapterNumber}`}>
              Chapter {section.chapterNumber}
            </Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">{section.title}</li>
        </ol>
      </div>

      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">Chapter {section.chapterNumber} · Section {section.id}</span>
            <h1 className="govuk-heading-xl">{section.title}</h1>

            {section.isUpdated && (
              <div className="govuk-notification-banner" role="region" aria-labelledby="updated-title" data-module="govuk-notification-banner">
                <div className="govuk-notification-banner__header">
                  <h2 className="govuk-notification-banner__title" id="updated-title">Updated</h2>
                </div>
                <div className="govuk-notification-banner__content">
                  <p className="govuk-body">
                    This section has changed since the 2019 print edition.
                    {section.updatedDate && (
                      <> Last updated: {new Date(section.updatedDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="govuk-body" dangerouslySetInnerHTML={{ __html: section.contentHtml }} />

            {section.footnotes && section.footnotes.length > 0 && (
              <>
                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
                <h2 className="govuk-heading-m">Footnotes</h2>
                <ol className="govuk-list govuk-body-s">
                  {section.footnotes.map((fn: { id: number; content: string }) => (
                    <li key={fn.id} id={`footnote-${fn.id}`} dangerouslySetInnerHTML={{ __html: fn.content }} />
                  ))}
                </ol>
              </>
            )}

            {section.subSections && section.subSections.length > 0 && (
              <>
                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
                <h2 className="govuk-heading-m">In this section</h2>
                <ul className="govuk-list">
                  {section.subSections.map((sub: { id: number; title: string }) => (
                    <li key={sub.id}>
                      <Link href={`/section/${sub.id}`} className="govuk-link">{sub.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {exercises.length > 0 && (
              <>
                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
                <h2 className="govuk-heading-m">Practise what you have learned</h2>
                <p className="govuk-body">
                  Test your understanding with {exercises.length === 1 ? "a scenario-based exercise" : `${exercises.length} exercises`}.
                </p>
                <ul className="govuk-task-list">
                  {exercises.map((ex) => (
                    <li key={ex.id} className="govuk-task-list__item govuk-task-list__item--with-link">
                      <div className="govuk-task-list__name-and-hint">
                        <Link className="govuk-link govuk-task-list__link" href={`/train/${ex.id}`}>
                          {ex.title}
                        </Link>
                        <div className="govuk-task-list__hint">{ex.context.slice(0, 120)}…</div>
                      </div>
                      <div className="govuk-task-list__status">
                        <strong className="govuk-tag govuk-tag--green">Start</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <nav className="govuk-pagination govuk-!-margin-top-8" aria-label="Pagination">
              {prevSection && (
                <div className="govuk-pagination__prev">
                  <Link href={`/section/${prevSection.id}`} className="govuk-pagination__link" rel="prev">
                    <svg className="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                      <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
                    </svg>
                    <span className="govuk-pagination__link-title">Previous<span className="govuk-visually-hidden"> section</span></span>
                    <span className="govuk-pagination__link-label">{prevSection.title}</span>
                  </Link>
                </div>
              )}
              {nextSection && (
                <div className="govuk-pagination__next">
                  <Link href={`/section/${nextSection.id}`} className="govuk-pagination__link" rel="next">
                    <svg className="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                      <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
                    </svg>
                    <span className="govuk-pagination__link-title">Next<span className="govuk-visually-hidden"> section</span></span>
                    <span className="govuk-pagination__link-label">{nextSection.title}</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}

function flattenSections(
  sections: { id: number; title: string; subSections: any[] }[]
): { id: number; title: string }[] {
  const result: { id: number; title: string }[] = [];
  for (const s of sections) {
    result.push({ id: s.id, title: s.title });
    if (s.subSections?.length) result.push(...flattenSections(s.subSections));
  }
  return result;
}

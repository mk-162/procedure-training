import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchSection, fetchChapter } from "@/lib/erskine-api";
import { getChapter } from "@/lib/chapter-data";
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
    description: `${section.title}. ${section.chapterTitle}. From the 25th edition of Erskine May.`,
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
    if (currentIndex > 0) {
      prevSection = allSections[currentIndex - 1];
    }
    if (currentIndex < allSections.length - 1) {
      nextSection = allSections[currentIndex + 1];
    }
  } catch {
    // Navigation unavailable — not critical
  }

  return (
    <>
      {/* Page title banner */}
      <div className="parliament-banner">
        <div className="container">
          <h1>{section.title}</h1>
        </div>
      </div>

      {/* Breadcrumbs — before main (GDS pattern) */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li>
              <Link href="/">Chapter index</Link>
            </li>
            <li>
              <Link href={`/chapter/${section.chapterNumber}`}>
                Chapter {section.chapterNumber}
              </Link>
            </li>
            <li aria-current="page">{section.title}</li>
          </ol>
        </nav>
      </div>

      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          {/* Section content */}
          <div className="block block--accent">
            <div className="section-page__meta">
              <span className="section-page__ref">
                Chapter {section.chapterNumber} · Section {section.id}
              </span>
              {section.isUpdated && (
                <strong className="govuk-tag govuk-tag--yellow">Updated</strong>
              )}
            </div>

            {section.isUpdated && (
              <div className="update-alert">
                <strong>Updated</strong> — This section has changed since the
                2019 print edition.
                {section.updatedDate && (
                  <>
                    {" "}Last updated:{" "}
                    {new Date(section.updatedDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </>
                )}
              </div>
            )}

            <div
              className="section-page__content"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />

            {section.footnotes && section.footnotes.length > 0 && (
              <div className="section-page__footnotes">
                <h3>Footnotes</h3>
                <ol>
                  {section.footnotes.map(
                    (fn: { id: number; content: string }) => (
                      <li
                        key={fn.id}
                        id={`footnote-item-${fn.id}`}
                        dangerouslySetInnerHTML={{ __html: fn.content }}
                      />
                    )
                  )}
                </ol>
              </div>
            )}
          </div>

          {/* Subsections */}
          {section.subSections && section.subSections.length > 0 && (
            <div className="block block--spaced">
              <h2>In this section</h2>
              <ul className="section-page__subsections">
                {section.subSections.map(
                  (sub: { id: number; title: string }) => (
                    <li key={sub.id}>
                      <Link href={`/section/${sub.id}`}>
                        <strong>{sub.title}</strong>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Exercises */}
          {exercises.length > 0 && (
            <div className="block block--spaced">
              <h2>Practise what you have learned</h2>
              <p>
                Test your understanding of this section with{" "}
                {exercises.length === 1
                  ? "a scenario-based exercise"
                  : `${exercises.length} scenario-based exercises`}
                .
              </p>
              <div className="section-page__exercises">
                {exercises.map((ex) => (
                  <Link
                    key={ex.id}
                    href={`/train/${ex.id}`}
                    className="section-page__exercise-link"
                  >
                    <strong>{ex.title}</strong>
                    <span>{ex.context.slice(0, 120)}…</span>
                    <span className="tag tag--green">Start exercise</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pagination — GDS block style */}
          <nav
            className="govuk-pagination block block--spaced"
            aria-label="Pagination"
            role="navigation"
          >
            {prevSection && (
              <div className="govuk-pagination__prev">
                <Link
                  href={`/section/${prevSection.id}`}
                  className="govuk-pagination__link"
                  rel="prev"
                >
                  <span
                    className="govuk-pagination__link-icon"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                  <span className="govuk-pagination__link-label">
                    Previous
                    <span className="govuk-visually-hidden"> section</span>
                  </span>
                  <span className="govuk-pagination__link-title">
                    {prevSection.title}
                  </span>
                </Link>
              </div>
            )}
            {nextSection && (
              <div className="govuk-pagination__next">
                <Link
                  href={`/section/${nextSection.id}`}
                  className="govuk-pagination__link"
                  rel="next"
                >
                  <span
                    className="govuk-pagination__link-icon"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <span className="govuk-pagination__link-label">
                    Next
                    <span className="govuk-visually-hidden"> section</span>
                  </span>
                  <span className="govuk-pagination__link-title">
                    {nextSection.title}
                  </span>
                </Link>
              </div>
            )}
            <div className="govuk-pagination__back">
              <Link href={`/chapter/${section.chapterNumber}`}>
                Back to chapter {section.chapterNumber}
              </Link>
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}

function flattenSections(
  sections: { id: number; title: string; subSections: any[] }[]
): { id: number; title: string }[] {
  const result: { id: number; title: string }[] = [];
  for (const s of sections) {
    result.push({ id: s.id, title: s.title });
    if (s.subSections?.length) {
      result.push(...flattenSections(s.subSections));
    }
  }
  return result;
}

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
    return { title: "Not Found" };
  }
  if (!section) return { title: "Not Found" };
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

  // Find exercises linked to this section
  const exercises = DEMO_SCENARIOS.filter((s) => s.sectionId === sectionId);

  // Get sibling sections for navigation
  let siblings: { id: number; title: string }[] = [];
  try {
    const chapter = await fetchChapter(section.chapterNumber);
    // Flatten all sections to find prev/next
    const allSections = flattenSections(chapter.sections);
    const currentIndex = allSections.findIndex((s) => s.id === sectionId);
    if (currentIndex > 0) {
      siblings.push(allSections[currentIndex - 1]);
    }
    if (currentIndex < allSections.length - 1) {
      siblings.push(allSections[currentIndex + 1]);
    }
  } catch {
    // Navigation unavailable — not critical
  }

  const prevSection = siblings.length > 0 && siblings[0].id !== sectionId ? siblings[0] : null;
  const nextSection = siblings.length > 1 ? siblings[1] : siblings.length === 1 && siblings[0].id !== sectionId ? null : siblings[0] || null;

  return (
    <>
      {/* Page title banner */}
      <div className="parliament-banner">
        <div className="container">
          <h1>{section.title}</h1>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Chapter index</Link></li>
            <li>
              <Link href={`/chapter/${section.chapterNumber}`}>
                Chapter {section.chapterNumber}
              </Link>
            </li>
            {section.titleChain && section.titleChain !== section.title && (
              <li>{section.titleChain}</li>
            )}
            <li aria-current="page">{section.title}</li>
          </ol>
        </nav>
      </div>

      <main className="page-content page-content--grey">
        <div className="container">
          {/* Section content */}
          <div className="block block--accent">
            {/* Section metadata */}
            <div className="section-page__meta">
              <span className="section-page__ref">
                Chapter {section.chapterNumber} · Section {section.id}
              </span>
              {section.isUpdated && (
                <span className="tag tag--yellow">Updated</span>
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

            {/* The actual Erskine May text */}
            <div
              className="section-page__content"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />

            {/* Footnotes */}
            {section.footnotes && section.footnotes.length > 0 && (
              <div className="section-page__footnotes">
                <h3>Footnotes</h3>
                <ol>
                  {section.footnotes.map((fn: { id: number; content: string }) => (
                    <li
                      key={fn.id}
                      id={`footnote-item-${fn.id}`}
                      dangerouslySetInnerHTML={{ __html: fn.content }}
                    />
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Subsections */}
          {section.subSections && section.subSections.length > 0 && (
            <div className="block block--spaced">
              <h2>In this section</h2>
              <ul className="section-page__subsections">
                {section.subSections.map((sub: { id: number; title: string }) => (
                  <li key={sub.id}>
                    <Link href={`/section/${sub.id}`}>
                      <strong>{sub.title}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exercises linked to this section */}
          {exercises.length > 0 && (
            <div className="block block--spaced">
              <h2>Practise what you have learned</h2>
              <p>
                Test your understanding of this section with{" "}
                {exercises.length === 1
                  ? "a scenario-based exercise"
                  : `${exercises.length} scenario-based exercises`}.
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

          {/* Section navigation */}
          <nav className="section-page__nav block block--spaced" aria-label="Section navigation">
            <div className="section-page__nav-links">
              {prevSection && (
                <Link href={`/section/${prevSection.id}`} className="section-page__nav-prev">
                  ← {prevSection.title}
                </Link>
              )}
              {nextSection && (
                <Link href={`/section/${nextSection.id}`} className="section-page__nav-next">
                  {nextSection.title} →
                </Link>
              )}
            </div>
            <div className="section-page__nav-up">
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

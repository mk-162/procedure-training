import Link from "next/link";
import { PARTS, TOTAL_CHAPTERS, TOTAL_SECTIONS } from "@/lib/chapter-data";

export default function LibraryPage() {
  const availableCount = PARTS.flatMap((p) => p.chapters).filter(
    (c) => c.status === "available"
  ).length;

  return (
    <>
      {/* Page title banner */}
      <div className="parliament-banner">
        <div className="container">
          <h1>Library</h1>
          <p className="lead">
            Chapter index · {TOTAL_CHAPTERS} chapters · {TOTAL_SECTIONS} sections
          </p>
        </div>
      </div>

      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          <section className="block">
            <p className="lead">
              Erskine May is organised into {PARTS.length} parts. Select a
              chapter to view its sections and start training exercises where
              they are available.
            </p>

            {PARTS.map((part) => (
              <div key={part.number} className="part-group">
                <h3 className="part-group__title">
                  <span className="part-group__number">Part {part.number}</span>
                  {part.title}
                </h3>
                <div className="chapter-list">
                  {part.chapters.map((ch) => (
                    <Link
                      key={ch.number}
                      href={`/chapter/${ch.number}`}
                      className={`chapter-list__item ${ch.status === "coming-soon" ? "chapter-list__item--locked" : ""}`}
                    >
                      <div className="chapter-list__number">{ch.number}</div>
                      <div className="chapter-list__body">
                        <div className="chapter-list__title">{ch.title}</div>
                        <div className="chapter-list__meta">
                          {ch.sectionCount} sections ·{" "}
                          {ch.sprintCount} exercises ·{" "}
                          about {ch.sprintCount * 3} minutes
                          {ch.status === "available" && (
                            <span className="tag tag--green chapter-list__tag">
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="chapter-list__arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

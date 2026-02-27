import Link from "next/link";
import { PARTS, TOTAL_CHAPTERS, TOTAL_SECTIONS } from "@/lib/chapter-data";

export default function HomePage() {
  const availableCount = PARTS.flatMap((p) => p.chapters).filter(
    (c) => c.status === "available"
  ).length;

  return (
    <>
      {/* Page title banner (white, like parliament.uk) */}
      <div className="parliament-banner">
        <div className="container">
          <h1>Erskine May</h1>
          <p className="lead">
            Procedural training · {TOTAL_CHAPTERS} chapters ·{" "}
            {TOTAL_SECTIONS} sections · synchronised with the live digital
            edition
          </p>
        </div>
      </div>

      <main className="page-content page-content--grey">
        <div className="container">

          {/* Recommended programme */}
          <section className="block block--accent">
            <div className="featured-module__eyebrow">Recommended programme</div>
            <h2 className="featured-module__title">
              Procedure in the House of Commons
            </h2>
            <p className="featured-module__body">
              This programme covers the core procedural knowledge you need to
              support Members in the Chamber. It takes you from the ordering of
              business through to the maintenance of order and the tabling of
              Questions. Based on chapters 17 to 22 of Erskine May.
            </p>
            <div className="featured-module__chapters">
              {PARTS[2].chapters
                .filter((c) => c.moduleTitle)
                .map((ch) => (
                  <Link
                    key={ch.number}
                    href={`/chapter/${ch.number}`}
                    className={`featured-module__card ${ch.status === "coming-soon" ? "featured-module__card--locked" : ""}`}
                  >
                    <span className="featured-module__card-number">
                      Chapter {ch.number}
                    </span>
                    <span className="featured-module__card-title">
                      {ch.moduleTitle}
                    </span>
                    <span className="featured-module__card-desc">
                      {ch.moduleDescription}
                    </span>
                    {ch.status === "available" ? (
                      <span className="tag tag--green">Available</span>
                    ) : (
                      <span className="tag tag--grey">In preparation</span>
                    )}
                  </Link>
                ))}
            </div>
          </section>

          {/* Full chapter index by part */}
          <section className="block block--spaced">
            <h2>Complete chapter index</h2>
            <p>
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

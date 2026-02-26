import Link from "next/link";
import { PARTS, TOTAL_CHAPTERS, TOTAL_SECTIONS } from "@/lib/chapter-data";

export default function HomePage() {
  const availableCount = PARTS.flatMap((p) => p.chapters).filter(
    (c) => c.status === "available"
  ).length;

  return (
    <>
      {/* GDS Start Page — The Hook */}
      <div className="parliament-banner">
        <div className="container">
          <span className="tag tag--green" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
            Beta
          </span>
          <h1>Erskine May Training</h1>
          <p className="lead">
            Learn parliamentary procedure through scenario-based training.
            Synchronised with the live digital edition of Erskine May.
          </p>
          <p className="lead">
            <strong>{TOTAL_CHAPTERS} chapters</strong> · <strong>{TOTAL_SECTIONS} sections</strong> · <strong>{availableCount} module{availableCount !== 1 ? "s" : ""} available</strong>
          </p>
        </div>
      </div>

      <main className="page-content">
        <div className="container">

          {/* "A Day in the Chamber" featured module */}
          <section className="featured-module">
            <div className="featured-module__eyebrow">Start Here</div>
            <h2 className="featured-module__title">A Day in the Chamber</h2>
            <p className="featured-module__body">
              It&apos;s your first week as a Parliamentary Assistant. PMQs has just
              finished and the House is moving to an Opposition Day debate. Tempers
              are high. Your Dispatch Box is full.
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
                    <span className="featured-module__card-number">Ch {ch.number}</span>
                    <span className="featured-module__card-title">{ch.moduleTitle}</span>
                    <span className="featured-module__card-desc">{ch.moduleDescription}</span>
                    {ch.status === "available" ? (
                      <span className="tag tag--green">Available</span>
                    ) : (
                      <span className="tag tag--grey">Coming soon</span>
                    )}
                  </Link>
                ))}
            </div>
          </section>

          {/* Full chapter index by Part */}
          <section className="chapter-index">
            <h2>All Chapters</h2>
            <p>Erskine May is organised into {PARTS.length} parts covering the full scope of parliamentary procedure.</p>

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
                      <div className="chapter-list__number">
                        {ch.number}
                      </div>
                      <div className="chapter-list__body">
                        <div className="chapter-list__title">{ch.title}</div>
                        <div className="chapter-list__meta">
                          {ch.sectionCount} sections · {ch.sprintCount} sprints · ~{ch.sprintCount * 3} min
                          {ch.status === "available" && (
                            <span className="tag tag--green" style={{ marginLeft: "var(--space-2)" }}>Available</span>
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

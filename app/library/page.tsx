import Link from "next/link";
import { PARTS, TOTAL_CHAPTERS, TOTAL_SECTIONS } from "@/lib/chapter-data";

export default function LibraryPage() {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Chapter index</h1>
            <p className="govuk-body-l">
              {TOTAL_CHAPTERS} chapters · {TOTAL_SECTIONS} sections
            </p>
            <p className="govuk-body">
              Erskine May is organised into {PARTS.length} parts. Select a
              chapter to view its sections and start training exercises where
              they are available.
            </p>

            {PARTS.map((part) => (
              <div key={part.number} className="govuk-!-margin-bottom-8">
                <h2 className="govuk-heading-l">
                  <span className="govuk-caption-l">Part {part.number}</span>
                  {part.title}
                </h2>
                <ul className="govuk-task-list">
                  {part.chapters.map((ch) => (
                    <li key={ch.number} className={`govuk-task-list__item ${ch.status === "available" ? "govuk-task-list__item--with-link" : ""}`}>
                      <div className="govuk-task-list__name-and-hint">
                        {ch.status === "available" ? (
                          <Link className="govuk-link govuk-task-list__link" href={`/chapter/${ch.number}`} aria-describedby={`ch-${ch.number}-status`}>
                            Chapter {ch.number}: {ch.title}
                          </Link>
                        ) : (
                          <span>Chapter {ch.number}: {ch.title}</span>
                        )}
                        <div className="govuk-task-list__hint">
                          {ch.sectionCount} sections · {ch.sprintCount} exercises
                        </div>
                      </div>
                      <div className="govuk-task-list__status" id={`ch-${ch.number}-status`}>
                        {ch.status === "available" ? (
                          <strong className="govuk-tag govuk-tag--green">Available</strong>
                        ) : (
                          <strong className="govuk-tag govuk-tag--grey">Coming soon</strong>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

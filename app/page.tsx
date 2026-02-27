"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { PROGRAMMES } from "@/lib/programmes";

export default function DashboardPage() {
  const { isLoaded, getProgrammeProgress, getNextModule, isFirstVisit } = useProgress();

  if (!isLoaded) {
    return (
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Erskine May</h1>
              <p className="govuk-body-l">Loading your training...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const firstVisit = isFirstVisit();

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-!-padding-top-6" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {firstVisit ? (
              /* Welcome state for first-time users */
              <section className="govuk-!-margin-bottom-6">
                <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">Erskine May</h1>
                <p className="govuk-body-l">
                  Procedural training for Parliament
                </p>
                <div className="govuk-inset-text govuk-!-margin-top-6">
                  <p className="govuk-body govuk-!-margin-bottom-4">
                    This training platform helps you learn parliamentary procedure
                    through interactive exercises based on Erskine May, the
                    authoritative guide to parliamentary law and practice.
                  </p>
                  <p className="govuk-body govuk-!-margin-bottom-4">
                    Work through structured programmes covering key areas of
                    parliamentary procedure. Each programme guides you through
                    learn, practice, and exercise stages to build your knowledge.
                  </p>
                  <Link href="/library" className="govuk-button govuk-button--start" data-module="govuk-button">
                    Choose a programme
                    <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                    </svg>
                  </Link>
                </div>
              </section>
            ) : (
              /* Returning user state */
              <section className="govuk-!-margin-bottom-6">
                <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">Continue where you left off</h1>
                {PROGRAMMES.map((programme) => {
                  const progProgress = getProgrammeProgress(programme.moduleIds);
                  const nextModule = getNextModule(programme.moduleIds);
                  const isComplete = progProgress.completed === progProgress.total && progProgress.total > 0;

                  return (
                    <div key={programme.slug} className="govuk-!-margin-bottom-6">
                      <div className="govuk-form-group">
                        <h2 className="govuk-heading-m">{programme.title}</h2>
                        <p className="govuk-body">
                          {progProgress.completed} of {progProgress.total} modules completed
                          {progProgress.averageScore > 0 && ` · Average score: ${progProgress.averageScore}%`}
                        </p>
                      </div>
                      {!isComplete && nextModule && (
                        <Link
                          href={`/module/${nextModule}/learn`}
                          className="govuk-button"
                          data-module="govuk-button"
                        >
                          {progProgress.completed === 0 ? "Start programme" : "Continue next module"}
                        </Link>
                      )}
                      {isComplete && (
                        <Link
                          href={`/programme/${programme.slug}`}
                          className="govuk-button govuk-button--secondary"
                          data-module="govuk-button"
                        >
                          Review programme
                        </Link>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

            {/* Programme cards - using task list pattern */}
            <section>
              <h2 className="govuk-heading-l govuk-!-margin-bottom-4">Available programmes</h2>
              <ul className="govuk-task-list">
                {PROGRAMMES.map((programme) => {
                  const progProgress = getProgrammeProgress(programme.moduleIds);
                  const progressPercent = progProgress.total > 0
                    ? Math.round((progProgress.completed / progProgress.total) * 100)
                    : 0;

                  return (
                    <li key={programme.slug} className="govuk-task-list__item govuk-task-list__item--with-link">
                      <div className="govuk-task-list__name-and-hint">
                        <Link className="govuk-link govuk-task-list__link" href={`/programme/${programme.slug}`}>
                          {programme.title}
                        </Link>
                        <div className="govuk-task-list__hint">
                          {programme.moduleIds.length} modules · about {programme.estimatedMinutes} minutes
                        </div>
                        <div className="govuk-body-s govuk-!-margin-top-2">
                          {programme.description}
                        </div>
                      </div>
                      <div className="govuk-task-list__status">
                        {progProgress.total > 0 ? (
                          <>
                            <strong className="govuk-tag govuk-tag--blue">{progressPercent}%</strong>
                            <span className="govuk-body-s govuk-!-display-block govuk-!-margin-top-1">
                              {progProgress.completed}/{progProgress.total}
                            </span>
                          </>
                        ) : (
                          <strong className="govuk-tag govuk-tag--grey">Not started</strong>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import type { getProgrammeBySlug } from "@/lib/programmes";
import type { getModulesForProgramme } from "@/lib/modules";

export function ProgrammeClient({
  programme,
  moduleList,
}: {
  programme: NonNullable<ReturnType<typeof getProgrammeBySlug>>;
  moduleList: ReturnType<typeof getModulesForProgramme>;
}) {
  const { isLoaded, getModuleProgress, getProgrammeProgress, getNextModule } = useProgress();

  if (!isLoaded) {
    return (
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">{programme.title}</h1>
              <p className="govuk-body-l">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const progProgress = getProgrammeProgress(programme.moduleIds);
  const nextModule = getNextModule(programme.moduleIds);
  const isComplete = progProgress.completed === progProgress.total && progProgress.total > 0;

  return (
    <div className="govuk-width-container">
      <Link href="/" className="govuk-back-link">
        Back to dashboard
      </Link>
      
      <main className="govuk-main-wrapper govuk-!-padding-top-6" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {/* Header */}
            <h1 className="govuk-heading-xl govuk-!-margin-bottom-2">{programme.title}</h1>
            <p className="govuk-body-l govuk-!-margin-bottom-6">
              {programme.moduleIds.length} modules · about {programme.estimatedMinutes} minutes
            </p>

            {/* Progress overview */}
            <section className="govuk-!-margin-bottom-6">
              <h2 className="govuk-heading-m">Your progress</h2>
              <p className="govuk-body">
                {progProgress.completed} of {progProgress.total} modules completed
                {progProgress.averageScore > 0 && ` · Average score: ${progProgress.averageScore}%`}
              </p>

              {!isComplete && nextModule && (
                <Link href={`/module/${nextModule}/learn`} className="govuk-button govuk-button--start" data-module="govuk-button">
                  {progProgress.completed === 0 ? "Start programme" : "Start next module"}
                  <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                  </svg>
                </Link>
              )}

              {isComplete && (
                <strong className="govuk-tag govuk-tag--green govuk-!-margin-top-4 govuk-!-display-inline-block">
                  Programme completed
                </strong>
              )}
            </section>

            {/* Module list using task list pattern */}
            <section>
              <h2 className="govuk-heading-m govuk-!-margin-bottom-4">Modules</h2>
              <ul className="govuk-task-list">
                {moduleList.map((module, index) => {
                  const progress = getModuleProgress(module.id);
                  const statusId = `module-${module.id}-status`;
                  
                  return (
                    <li key={module.id} className="govuk-task-list__item govuk-task-list__item--with-link">
                      <div className="govuk-task-list__name-and-hint">
                        <Link className="govuk-link govuk-task-list__link" href={`/module/${module.id}/learn`} aria-describedby={statusId}>
                          <span className="govuk-visually-hidden">Module {index + 1}: </span>{module.title}
                        </Link>
                        <div className="govuk-task-list__hint">
                          Chapter {module.chapterNumber} · {module.timeEstimate} minutes
                        </div>
                      </div>
                      <div className="govuk-task-list__status" id={statusId}>
                        {progress.status === "completed" && progress.score !== undefined && (
                          <strong className="govuk-tag govuk-tag--green">Score: {progress.score}%</strong>
                        )}
                        {progress.status === "in-progress" && (
                          <strong className="govuk-tag govuk-tag--blue">In progress</strong>
                        )}
                        {progress.status === "not-started" && (
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
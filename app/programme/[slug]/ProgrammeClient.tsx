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
      <div className="parliament-banner">
        <div className="govuk-width-container">
          <h1 className="govuk-heading-xl">{programme.title}</h1>
          <p className="govuk-body-l">Loading...</p>
        </div>
      </div>
    );
  }

  const progProgress = getProgrammeProgress(programme.moduleIds);
  const nextModule = getNextModule(programme.moduleIds);
  const isComplete = progProgress.completed === progProgress.total && progProgress.total > 0;

  function getStatusIcon(status: string) {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "○";
      default:
        return "○";
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "completed":
        return "module-card--completed";
      case "in-progress":
        return "module-card--in-progress";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="parliament-banner">
        <div className="govuk-width-container">
          <Link href="/" className="govuk-back-link">
            Back to dashboard
          </Link>
          <h1 className="govuk-heading-xl">{programme.title}</h1>
          <p className="govuk-body-l">
            {programme.moduleIds.length} modules · about {programme.estimatedMinutes} minutes
          </p>
        </div>
      </div>

      <main id="main-content" className="govuk-main-wrapper">
        <div className="govuk-width-container">
          {/* Progress overview */}
          <section className="block">
            <div className="progress-overview">
              <div className="progress-overview__info">
                <h2 className="govuk-heading-m">Your progress</h2>
                <p className="govuk-body">
                  {progProgress.completed} of {progProgress.total} modules completed
                  {progProgress.averageScore > 0 && ` · Average score: ${progProgress.averageScore}%`}
                </p>
              </div>
              <div className="progress-overview__bar">
                <div
                  className="progress-bar"
                  style={{
                    "--progress": `${(progProgress.completed / progProgress.total) * 100}%`,
                  } as React.CSSProperties}
                >
                  <div className="progress-bar__fill" />
                </div>
              </div>
            </div>

            {!isComplete && nextModule && (
              <div className="govuk-!-margin-top-4">
                <Link href={`/module/${nextModule}/learn`} className="govuk-button govuk-button--start">
                  {progProgress.completed === 0 ? "Start programme" : "Start next module"}
                </Link>
              </div>
            )}

            {isComplete && (
              <div className="govuk-!-margin-top-4">
                <strong className="govuk-tag govuk-tag--green">Programme completed</strong>
              </div>
            )}
          </section>

          {/* Module list */}
          <section className="block block--spaced">
            <h2 className="govuk-heading-m">Modules</h2>
            <div className="module-list">
              {moduleList.map((module, index) => {
                const progress = getModuleProgress(module.id);
                return (
                  <Link
                    key={module.id}
                    href={`/module/${module.id}/learn`}
                    className={`module-card ${getStatusClass(progress.status)}`}
                  >
                    <div className="module-card__number">{index + 1}</div>
                    <div className="module-card__status">
                      <span
                        className={`module-card__icon ${progress.status === "completed" ? "module-card__icon--completed" : ""}`}
                      >
                        {getStatusIcon(progress.status)}
                      </span>
                    </div>
                    <div className="module-card__body">
                      <h3 className="module-card__title">{module.title}</h3>
                      <div className="module-card__meta">
                        Chapter {module.chapterNumber} · {module.timeEstimate} minutes
                        {progress.status === "completed" && progress.score !== undefined && (
                          <strong className="govuk-tag govuk-tag--green">Score: {progress.score}%</strong>
                        )}
                        {progress.status === "in-progress" && (
                          <strong className="govuk-tag govuk-tag--blue">In progress</strong>
                        )}
                      </div>
                    </div>
                    <div className="module-card__arrow">→</div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

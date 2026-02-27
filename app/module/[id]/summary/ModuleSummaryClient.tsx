"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PROGRAMMES } from "@/lib/programmes";
import { useProgress } from "@/lib/progress";
import type { getModuleById } from "@/lib/modules";

export function ModuleSummaryClient({ module }: { module: NonNullable<ReturnType<typeof getModuleById>> }) {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score");
  const score = scoreParam ? parseInt(scoreParam, 10) : null;
  const { getModuleProgress, isLoaded } = useProgress();

  if (!isLoaded) {
    return null;
  }

  const moduleProgress = getModuleProgress(module.id);
  const finalScore = score ?? moduleProgress.score ?? 0;
  const passed = finalScore >= 67; // Pass threshold: 2 out of 3 correct

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));
  const moduleIndex = programme?.moduleIds.indexOf(module.id) ?? 0;
  const nextModuleId = programme?.moduleIds[moduleIndex + 1];

  return (
    <div className="govuk-width-container">
      <Link href={programme ? `/programme/${programme.slug}` : "/"} className="govuk-back-link">
        Back to {programme?.title || "programme"}
      </Link>

      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {passed ? (
              <div className="govuk-panel govuk-panel--confirmation">
                <h1 className="govuk-panel__title">Module completed</h1>
                <div className="govuk-panel__body">
                  Your score: {finalScore}%
                </div>
              </div>
            ) : (
              <>
                <h1 className="govuk-heading-xl">Not quite there</h1>
                <p className="govuk-body-l">
                  You scored {finalScore}%. You need at least 67% to pass. Review the material and try again.
                </p>
              </>
            )}

            {module.keyTakeaways && (
              <div className="govuk-!-margin-top-6">
                <h2 className="govuk-heading-m">Key takeaways</h2>
                <ul className="govuk-list govuk-list--bullet">
                  {module.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="govuk-button-group govuk-!-margin-top-6">
              {passed && nextModuleId && (
                <Link href={`/module/${nextModuleId}/learn`} role="button" draggable="false" className="govuk-button" data-module="govuk-button">
                  Next module
                </Link>
              )}
              {!passed && (
                <Link href={`/module/${module.id}/practice`} role="button" draggable="false" className="govuk-button" data-module="govuk-button">
                  Repeat the exercises
                </Link>
              )}
              <Link href={programme ? `/programme/${programme.slug}` : "/"} className="govuk-link">
                Back to programme
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

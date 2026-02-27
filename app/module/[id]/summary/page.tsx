"use client";

import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { getModuleById } from "@/lib/modules";
import { PROGRAMMES } from "@/lib/programmes";
import { useProgress } from "@/lib/progress";
import { StepIndicator } from "@/components/StepIndicator";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModuleSummaryPage({ params }: ModulePageProps) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  return <ModuleSummaryClient module={module} />;
}

function ModuleSummaryClient({ module }: { module: ReturnType<typeof getModuleById> }) {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score");
  const score = scoreParam ? parseInt(scoreParam, 10) : null;
  const { getModuleProgress, isLoaded } = useProgress();

  if (!isLoaded || !module) {
    return null;
  }

  const moduleProgress = getModuleProgress(module.id);
  const finalScore = score ?? moduleProgress.score ?? 0;
  const passed = finalScore >= 100;

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));
  const moduleIndex = programme?.moduleIds.indexOf(module.id) ?? 0;
  const nextModuleId = programme?.moduleIds[moduleIndex + 1];

  const steps = [
    { id: "learn", label: "Learn", href: `/module/${module.id}/learn` },
    { id: "practice", label: "Practice", href: `/module/${module.id}/practice` },
    { id: "test", label: "Test", href: `/module/${module.id}/test` },
    { id: "summary", label: "Summary", href: `/module/${module.id}/summary` },
  ];

  return (
    <>
      <div className="parliament-banner">
        <div className="container">
          <Link
            href={programme ? `/programme/${programme.slug}` : "/"}
            className="back-link"
          >
            ← Back to {programme?.title || "programme"}
          </Link>
          <h1>{module.title}</h1>
          <p className="lead">
            Chapter {module.chapterNumber} · {module.timeEstimate} minutes
          </p>
        </div>
      </div>

      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          <StepIndicator steps={steps} currentStep="summary" />

          <section className="block block--spaced">
            <div className={`score-display ${passed ? "score-display--passed" : "score-display--failed"}`}>
              <div className="score-display__label">
                {passed ? "Module completed" : "Not quite there"}
              </div>
              <div className="score-display__score">{finalScore}%</div>
              <div className="score-display__message">
                {passed
                  ? "Well done! You have passed this module."
                  : "You need 100% to pass. Try the practice exercise again."}
              </div>
            </div>
          </section>

          {module.keyTakeaways && (
            <section className="block block--spaced">
              <h2>Key takeaways</h2>
              <ul className="takeaway-list">
                {module.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx}>{takeaway}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="block">
            <div className="action-bar action-bar--stacked">
              {passed && nextModuleId && (
                <Link
                  href={`/module/${nextModuleId}/learn`}
                  className="btn btn--primary btn--large"
                >
                  Next module
                </Link>
              )}
              {!passed && (
                <Link
                  href={`/module/${module.id}/practice`}
                  className="btn btn--primary btn--large"
                >
                  Practice again
                </Link>
              )}
              <Link
                href={programme ? `/programme/${programme.slug}` : "/"}
                className="btn btn--secondary"
              >
                Back to programme
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

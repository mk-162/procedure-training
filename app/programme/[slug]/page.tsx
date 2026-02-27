"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgrammeBySlug } from "@/lib/programmes";
import { getModulesForProgramme } from "@/lib/modules";
import { useProgress } from "@/lib/progress";

interface ProgrammePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgrammePage({ params }: ProgrammePageProps) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);

  if (!programme) {
    notFound();
  }

  const modules = getModulesForProgramme(slug);

  return (
    <ProgrammeClient programme={programme} moduleList={modules} />
  );
}

function ProgrammeClient({
  programme,
  moduleList,
}: {
  programme: ReturnType<typeof getProgrammeBySlug>;
  moduleList: ReturnType<typeof getModulesForProgramme>;
}) {
  const { isLoaded, getModuleProgress, getProgrammeProgress, getNextModule } = useProgress();

  if (!isLoaded) {
    return (
      <div className="parliament-banner">
        <div className="container">
          <h1>{programme?.title}</h1>
          <p className="lead">Loading...</p>
        </div>
      </div>
    );
  }

  if (!programme) {
    return null;
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
        <div className="container">
          <Link href="/" className="back-link">
            ← Back to dashboard
          </Link>
          <h1>{programme.title}</h1>
          <p className="lead">
            {programme.moduleIds.length} modules · about {programme.estimatedMinutes} minutes
          </p>
        </div>
      </div>

      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          {/* Progress overview */}
          <section className="block">
            <div className="progress-overview">
              <div className="progress-overview__info">
                <h2>Your progress</h2>
                <p>
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
              <div style={{ marginTop: "var(--space-4)" }}>
                <Link href={`/module/${nextModule}/learn`} className="btn btn--primary btn--large">
                  {progProgress.completed === 0 ? "Start programme" : "Start next module"}
                </Link>
              </div>
            )}

            {isComplete && (
              <div style={{ marginTop: "var(--space-4)" }}>
                <span className="tag tag--green">Programme completed</span>
              </div>
            )}
          </section>

          {/* Module list */}
          <section className="block block--spaced">
            <h2>Modules</h2>
            <div className="module-list">
              {moduleList.map((module, index) => {
                const progress = getModuleProgress(module.id);
                return (
                  <Link
                    key={module.id}
                    href={
                      progress.status === "not-started"
                        ? `/module/${module.id}/learn`
                        : `/module/${module.id}/learn`
                    }
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
                          <span className="tag tag--green">Score: {progress.score}%</span>
                        )}
                        {progress.status === "in-progress" && (
                          <span className="tag tag--blue">In progress</span>
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

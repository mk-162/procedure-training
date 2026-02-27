"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { PROGRAMMES } from "@/lib/programmes";

export default function DashboardPage() {
  const { isLoaded, getProgrammeProgress, getNextModule, isFirstVisit } = useProgress();

  if (!isLoaded) {
    return (
      <div className="parliament-banner">
        <div className="container">
          <h1>Erskine May</h1>
          <p className="lead">Loading your training...</p>
        </div>
      </div>
    );
  }

  const firstVisit = isFirstVisit();

  return (
    <>
      {/* Page title banner */}
      <div className="parliament-banner">
        <div className="container">
          <h1>Erskine May</h1>
          <p className="lead">Procedural training for Parliament</p>
        </div>
      </div>

      <main id="main-content" className="page-content page-content--grey">
        <div className="container">
          {firstVisit ? (
            /* Welcome state for first-time users */
            <section className="block block--accent">
              <h2>Welcome to Erskine May training</h2>
              <p className="lead">
                This training platform helps you learn parliamentary procedure
                through interactive exercises based on Erskine May, the
                authoritative guide to parliamentary law and practice.
              </p>
              <p>
                Work through structured programmes covering key areas of
                parliamentary procedure. Each programme guides you through
                learn, practice, and test stages to build your knowledge.
              </p>
              <div style={{ marginTop: "var(--space-6)" }}>
                <Link href="/library" className="btn btn--primary btn--large">
                  Choose a programme
                </Link>
              </div>
            </section>
          ) : (
            /* Returning user state */
            <section className="block block--accent">
              <h2>Continue where you left off</h2>
              {PROGRAMMES.map((programme) => {
                const progProgress = getProgrammeProgress(programme.moduleIds);
                const nextModule = getNextModule(programme.moduleIds);
                const isComplete = progProgress.completed === progProgress.total && progProgress.total > 0;

                return (
                  <div key={programme.slug}>
                    <div className="progress-overview">
                      <div className="progress-overview__info">
                        <h3>{programme.title}</h3>
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
                        <Link
                          href={`/module/${nextModule}/learn`}
                          className="btn btn--primary"
                        >
                          {progProgress.completed === 0 ? "Start programme" : "Continue next module"}
                        </Link>
                      </div>
                    )}
                    {isComplete && (
                      <div style={{ marginTop: "var(--space-4)" }}>
                        <Link
                          href={`/programme/${programme.slug}`}
                          className="btn btn--secondary"
                        >
                          Review programme
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          {/* Programme cards */}
          <section className="block block--spaced">
            <h2>Available programmes</h2>
            <div className="programme-grid">
              {PROGRAMMES.map((programme) => {
                const progProgress = getProgrammeProgress(programme.moduleIds);
                const progressPercent = progProgress.total > 0
                  ? Math.round((progProgress.completed / progProgress.total) * 100)
                  : 0;

                return (
                  <Link
                    key={programme.slug}
                    href={`/programme/${programme.slug}`}
                    className="programme-card"
                  >
                    <div className="programme-card__header">
                      <h3 className="programme-card__title">{programme.title}</h3>
                      <span className="programme-card__modules">
                        {programme.moduleIds.length} modules · about {programme.estimatedMinutes} minutes
                      </span>
                    </div>
                    <p className="programme-card__description">
                      {programme.description}
                    </p>
                    {progProgress.total > 0 && (
                      <div className="programme-card__progress">
                        <div
                          className="progress-bar"
                          style={{ "--progress": `${progressPercent}%` } as React.CSSProperties}
                        >
                          <div className="progress-bar__fill" />
                        </div>
                        <span className="programme-card__progress-text">
                          {progProgress.completed}/{progProgress.total} completed
                        </span>
                      </div>
                    )}
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

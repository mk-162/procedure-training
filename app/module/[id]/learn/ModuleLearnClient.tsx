"use client";

import Link from "next/link";
import { PROGRAMMES } from "@/lib/programmes";
import { useProgress } from "@/lib/progress";
import { StepIndicator } from "@/components/StepIndicator";
import { AuthorityPanel } from "@/components/AuthorityPanel";
import type { getModuleById } from "@/lib/modules";

export function ModuleLearnClient({ module }: { module: NonNullable<ReturnType<typeof getModuleById>> }) {
  const { startModule, isLoaded } = useProgress();

  if (!isLoaded) {
    return null;
  }

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));
  const steps = [
    { id: "learn", label: "Learn", href: `/module/${module.id}/learn` },
    { id: "practice", label: "Practice", href: `/module/${module.id}/practice` },
    { id: "test", label: "Test", href: `/module/${module.id}/test` },
    { id: "summary", label: "Summary", href: `/module/${module.id}/summary` },
  ];

  const handleReady = () => {
    startModule(module.id);
  };

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
          <StepIndicator steps={steps} currentStep="learn" />

          <section className="block block--spaced">
            <h2>Learn about this topic</h2>
            <div className="briefing-content">
              {module.briefing.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {module.authorityContent && (
              <AuthorityPanel
                title={module.title}
                contentHtml={module.authorityContent}
                sectionId={module.sectionId || 0}
                paragraphRef={module.paragraphRef}
              />
            )}
          </section>

          <section className="block">
            <div className="action-bar">
              <Link
                href={`/module/${module.id}/practice`}
                className="btn btn--primary btn--large"
                onClick={handleReady}
              >
                I am ready to practice
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

"use client";

import Link from "next/link";
import { PROGRAMMES } from "@/lib/programmes";
import { useProgress } from "@/lib/progress";
import { AuthorityPanel } from "@/components/AuthorityPanel";
import type { getModuleById } from "@/lib/modules";

export function ModuleLearnClient({ module }: { module: NonNullable<ReturnType<typeof getModuleById>> }) {
  const { startModule, isLoaded } = useProgress();

  if (!isLoaded) {
    return null;
  }

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));

  const handleReady = () => {
    startModule(module.id);
  };

  return (
    <div className="govuk-width-container">
      <Link
        href={programme ? `/programme/${programme.slug}` : "/"}
        className="govuk-back-link"
      >
        Back to {programme?.title || "programme"}
      </Link>

      <main className="govuk-main-wrapper govuk-!-padding-top-6" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">Module</span>
            <h1 className="govuk-heading-xl govuk-!-margin-bottom-2">{module.title}</h1>
            <p className="govuk-body-l">
              Chapter {module.chapterNumber} · {module.timeEstimate} minutes
            </p>

            <section className="govuk-!-margin-top-6">
              <h2 className="govuk-heading-m">Learn about this topic</h2>
              <div className="govuk-body">
                {module.briefing.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="govuk-!-margin-bottom-4">{paragraph}</p>
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

            <section className="govuk-!-margin-top-6">
              <Link
                href={`/module/${module.id}/practice`}
                className="govuk-button govuk-button--start"
                data-module="govuk-button"
                onClick={handleReady}
              >
                I am ready to practice
                <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                </svg>
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
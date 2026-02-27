"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getModuleById } from "@/lib/modules";
import { PROGRAMMES } from "@/lib/programmes";
import { getScenarioById } from "@/lib/scenarios";
import { useProgress } from "@/lib/progress";
import { StepIndicator } from "@/components/StepIndicator";
import { useState, useEffect } from "react";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModuleTestPage({ params }: ModulePageProps) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  return <ModuleTestClient module={module} />;
}

function ModuleTestClient({ module }: { module: ReturnType<typeof getModuleById> }) {
  const { startModule, isLoaded } = useProgress();
  const router = useRouter();

  if (!isLoaded || !module) {
    return null;
  }

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));
  const steps = [
    { id: "learn", label: "Learn", href: `/module/${module.id}/learn` },
    { id: "practice", label: "Practice", href: `/module/${module.id}/practice` },
    { id: "test", label: "Test", href: `/module/${module.id}/test` },
    { id: "summary", label: "Summary", href: `/module/${module.id}/summary` },
  ];

  // Get first scenario for this module
  const scenarioId = module.scenarioIds[0];
  const scenario = scenarioId ? getScenarioById(scenarioId) : null;

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
          <StepIndicator steps={steps} currentStep="test" />

          {scenario ? (
            <TestCard
              moduleId={module.id}
              scenario={scenario}
              moduleTitle={module.title}
            />
          ) : (
            <section className="block block--spaced">
              <p>No test scenarios available for this module yet.</p>
              <div className="action-bar">
                <Link
                  href={`/module/${module.id}/summary`}
                  className="btn btn--primary"
                >
                  Continue without test
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function TestCard({
  moduleId,
  scenario,
  moduleTitle,
}: {
  moduleId: string;
  scenario: NonNullable<ReturnType<typeof getScenarioById>>;
  moduleTitle: string;
}) {
  const router = useRouter();
  const { completeModule, startModule } = useProgress();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const selectedChoice = scenario.choices.find((c) => c.id === selectedId);

  const handleSelect = (choiceId: string) => {
    if (revealed) return;
    setSelectedId(choiceId);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    setRevealed(true);

    // Calculate score
    const isCorrect = selectedChoice?.isCorrect ?? false;
    const scoreValue = isCorrect ? 100 : 0;
    setScore(scoreValue);

    // Complete module with score
    if (isCorrect) {
      startModule(moduleId);
      completeModule(moduleId, scoreValue);
    }
  };

  const handleViewSummary = () => {
    router.push(`/module/${moduleId}/summary?score=${score}`);
  };

  return (
    <>
      <section className="block block--spaced">
        <h2>Test</h2>
        <p>
          Answer this question to complete the module. You will receive a score
          and cannot retry once submitted.
        </p>
      </section>

      <div className="scenario-card">
        <div className="scenario-card__eyebrow">Test</div>
        <h2 className="scenario-card__title">{scenario.title}</h2>
        <p className="scenario-card__context">{scenario.context}</p>
        <p className="scenario-card__question">{scenario.question}</p>

        <div className="choices" role="radiogroup" aria-label="Answer choices">
          {scenario.choices.map((choice) => {
            let stateClass = "";
            if (revealed && choice.id === selectedId) {
              stateClass = choice.isCorrect
                ? "choice-btn--correct"
                : "choice-btn--incorrect";
            } else if (revealed && choice.isCorrect) {
              stateClass = "choice-btn--correct";
            } else if (choice.id === selectedId) {
              stateClass = "choice-btn--selected";
            }

            return (
              <button
                key={choice.id}
                className={`choice-btn ${stateClass}`}
                onClick={() => handleSelect(choice.id)}
                role="radio"
                aria-checked={choice.id === selectedId}
                disabled={revealed}
              >
                <span className="choice-btn__letter">
                  {choice.id.toUpperCase()}
                </span>
                <span>{choice.text}</span>
              </button>
            );
          })}
        </div>

        {!revealed && selectedId && (
          <div style={{ marginTop: "var(--space-6)" }}>
            <button className="btn btn--primary" onClick={handleSubmit}>
              Submit Answer
            </button>
          </div>
        )}

        {revealed && selectedChoice && (
          <>
            <div
              className={`feedback-panel ${
                selectedChoice.isCorrect ? "" : "feedback-panel--incorrect"
              }`}
            >
              <div className="feedback-panel__label">
                {selectedChoice.isCorrect ? "Correct" : "Incorrect"}
              </div>
              <p>{selectedChoice.feedback}</p>
              <p
                style={{
                  marginTop: "var(--space-3)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Source: Erskine May, ¶{scenario.paragraphRef}
              </p>
            </div>

            <div style={{ marginTop: "var(--space-6)" }}>
              <button className="btn btn--primary" onClick={handleViewSummary}>
                View results
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

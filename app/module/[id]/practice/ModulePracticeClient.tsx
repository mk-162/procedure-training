"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PROGRAMMES } from "@/lib/programmes";
import { getScenarioById } from "@/lib/scenarios";
import { useProgress } from "@/lib/progress";
import { StepIndicator } from "@/components/StepIndicator";
import { useState } from "react";
import type { getModuleById } from "@/lib/modules";

export function ModulePracticeClient({ module }: { module: NonNullable<ReturnType<typeof getModuleById>> }) {
  const { startModule, isLoaded } = useProgress();
  const router = useRouter();
  const [practiceComplete, setPracticeComplete] = useState(false);

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

  const scenarioId = module.scenarioIds[0];
  const scenario = scenarioId ? getScenarioById(scenarioId) : null;

  const handleComplete = () => {
    startModule(module.id);
    setPracticeComplete(true);
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
          <StepIndicator steps={steps} currentStep="practice" />

          {practiceComplete ? (
            <section className="block block--spaced">
              <div className="completion-message">
                <h2>Well done</h2>
                <p>
                  You have completed the practice exercise. You can try again or
                  move on to the test.
                </p>
                <div className="action-bar">
                  <button
                    className="btn btn--secondary"
                    onClick={() => setPracticeComplete(false)}
                  >
                    Try again
                  </button>
                  <Link
                    href={`/module/${module.id}/test`}
                    className="btn btn--primary"
                  >
                    Take the test
                  </Link>
                </div>
              </div>
            </section>
          ) : scenario ? (
            <>
              <section className="block block--spaced">
                <h2>Practice</h2>
                <p>
                  Work through this scenario to apply what you have learned.
                  You can try as many times as you like.
                </p>
              </section>

              <ScenarioCardWrapper
                scenario={scenario}
                onComplete={handleComplete}
                allowRetry={true}
              />
            </>
          ) : (
            <section className="block block--spaced">
              <p>No practice scenarios available for this module yet.</p>
              <div className="action-bar">
                <Link
                  href={`/module/${module.id}/test`}
                  className="btn btn--primary"
                >
                  Take the test
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function ScenarioCardWrapper({
  scenario,
  onComplete,
  allowRetry,
}: {
  scenario: NonNullable<ReturnType<typeof getScenarioById>>;
  onComplete: () => void;
  allowRetry: boolean;
}) {
  const [key, setKey] = useState(0);

  return (
    <ScenarioCardInner
      key={key}
      scenario={scenario}
      onComplete={onComplete}
      allowRetry={allowRetry}
      onReset={() => setKey((k) => k + 1)}
    />
  );
}

function ScenarioCardInner({
  scenario,
  onComplete,
  allowRetry,
  onReset,
}: {
  scenario: NonNullable<ReturnType<typeof getScenarioById>>;
  onComplete: () => void;
  allowRetry: boolean;
  onReset: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selectedChoice = scenario.choices.find((c) => c.id === selectedId);

  const handleSelect = (choiceId: string) => {
    if (revealed) return;
    setSelectedId(choiceId);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    setRevealed(true);
    if (selectedChoice?.isCorrect) {
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setRevealed(false);
    onReset();
  };

  return (
    <div className="scenario-card">
      <div className="scenario-card__eyebrow">Practice exercise</div>
      <h2 className="scenario-card__title">{scenario.title}</h2>
      <p className="scenario-card__context">{scenario.context}</p>
      <p className="scenario-card__question">{scenario.question}</p>

      <div className="choices" role="radiogroup" aria-label="Answer choices">
        {scenario.choices.map((choice) => {
          let stateClass = "";
          if (revealed && choice.id === selectedId) {
            stateClass = choice.isCorrect ? "choice-btn--correct" : "choice-btn--incorrect";
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
              <span className="choice-btn__letter">{choice.id.toUpperCase()}</span>
              <span>{choice.text}</span>
            </button>
          );
        })}
      </div>

      {!revealed && selectedId && (
        <div style={{ marginTop: "20px" }}>
          <button className="btn btn--primary" onClick={handleSubmit}>
            Submit answer
          </button>
        </div>
      )}

      {revealed && selectedChoice && (
        <>
          <div className={`feedback-panel ${selectedChoice.isCorrect ? "" : "feedback-panel--incorrect"}`}>
            <div className="feedback-panel__label">
              {selectedChoice.isCorrect ? "Correct" : "Not quite"}
            </div>
            <p>{selectedChoice.feedback}</p>
            <p style={{ marginTop: "15px", fontSize: "14px", color: "#717171" }}>
              Source: Erskine May, ¶{scenario.paragraphRef}
            </p>
          </div>
          {allowRetry && (
            <div style={{ marginTop: "20px" }}>
              <button className="btn btn--secondary" onClick={handleReset}>
                Try again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

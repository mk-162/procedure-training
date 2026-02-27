"use client";

import Link from "next/link";
import { PROGRAMMES } from "@/lib/programmes";
import { getScenarioById } from "@/lib/scenarios";
import { useProgress } from "@/lib/progress";
import { useState } from "react";
import type { getModuleById } from "@/lib/modules";

export function ModulePracticeClient({ module }: { module: NonNullable<ReturnType<typeof getModuleById>> }) {
  const { startModule, isLoaded } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceComplete, setPracticeComplete] = useState(false);

  if (!isLoaded) {
    return null;
  }

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));
  const scenarios = module.scenarioIds
    .map((id) => getScenarioById(id))
    .filter((s): s is NonNullable<ReturnType<typeof getScenarioById>> => s !== undefined);

  const currentScenario = scenarios[currentIndex];

  const handleScenarioComplete = () => {
    if (currentIndex < scenarios.length - 1) {
      // Move to next scenario
      setCurrentIndex(currentIndex + 1);
    } else {
      // All scenarios done
      startModule(module.id);
      setPracticeComplete(true);
    }
  };

  return (
    <div className="govuk-width-container">
      <Link href={programme ? `/programme/${programme.slug}` : "/"} className="govuk-back-link">
        Back to {programme?.title || "programme"}
      </Link>

      <main className="govuk-main-wrapper" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">Chapter {module.chapterNumber} · Practice</span>
            <h1 className="govuk-heading-xl">{module.title}</h1>

            {practiceComplete ? (
              <>
                <div className="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="practice-success-title" data-module="govuk-notification-banner">
                  <div className="govuk-notification-banner__header">
                    <h2 className="govuk-notification-banner__title" id="practice-success-title">Well done</h2>
                  </div>
                  <div className="govuk-notification-banner__content">
                    <p className="govuk-body">
                      You have completed all {scenarios.length} practice {scenarios.length === 1 ? "exercise" : "exercises"}.
                    </p>
                  </div>
                </div>
                <div className="govuk-button-group">
                  <Link href={`/module/${module.id}/test`} role="button" draggable="false" className="govuk-button" data-module="govuk-button">
                    Continue to exercise
                  </Link>
                  <button className="govuk-button govuk-button--secondary" data-module="govuk-button" onClick={() => { setCurrentIndex(0); setPracticeComplete(false); }}>
                    Repeat the practice
                  </button>
                </div>
              </>
            ) : currentScenario ? (
              <>
                {scenarios.length > 1 && (
                  <p className="govuk-body govuk-!-margin-bottom-6">
                    Exercise {currentIndex + 1} of {scenarios.length}
                  </p>
                )}
                <ScenarioExercise
                  key={currentScenario.id}
                  scenario={currentScenario}
                  onComplete={handleScenarioComplete}
                />
              </>
            ) : (
              <>
                <p className="govuk-body">No practice scenarios available for this module yet.</p>
                <Link href={`/module/${module.id}/test`} role="button" draggable="false" className="govuk-button" data-module="govuk-button">
                  Continue to exercise
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ScenarioExercise({
  scenario,
  onComplete,
}: {
  scenario: NonNullable<ReturnType<typeof getScenarioById>>;
  onComplete: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selectedChoice = scenario.choices.find((c) => c.id === selectedId);

  const handleSubmit = () => {
    if (!selectedId) return;
    setRevealed(true);
  };

  return (
    <>
      <h2 className="govuk-heading-l">{scenario.title}</h2>
      <p className="govuk-body-l">{scenario.context}</p>

      <div className="govuk-form-group">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h3 className="govuk-fieldset__heading">{scenario.question}</h3>
          </legend>
          <div className="govuk-radios" data-module="govuk-radios">
            {scenario.choices.map((choice) => (
              <div className="govuk-radios__item" key={choice.id}>
                <input
                  className="govuk-radios__input"
                  id={`choice-${choice.id}`}
                  name="answer"
                  type="radio"
                  value={choice.id}
                  checked={selectedId === choice.id}
                  onChange={() => !revealed && setSelectedId(choice.id)}
                  disabled={revealed}
                />
                <label className="govuk-label govuk-radios__label" htmlFor={`choice-${choice.id}`}>
                  {choice.text}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {!revealed && selectedId && (
        <button className="govuk-button" data-module="govuk-button" onClick={handleSubmit}>
          Submit answer
        </button>
      )}

      {revealed && selectedChoice && (
        <>
          <div className={`govuk-notification-banner ${selectedChoice.isCorrect ? "govuk-notification-banner--success" : ""}`} role="alert" aria-labelledby="feedback-title" data-module="govuk-notification-banner">
            <div className="govuk-notification-banner__header">
              <h2 className="govuk-notification-banner__title" id="feedback-title">
                {selectedChoice.isCorrect ? "Correct" : "Not quite"}
              </h2>
            </div>
            <div className="govuk-notification-banner__content">
              <p className="govuk-body">{selectedChoice.feedback}</p>
            </div>
          </div>
          <div className="govuk-inset-text">
            Source: Erskine May, ¶{scenario.paragraphRef} —{" "}
            <a
              href={scenario.sectionUrl}
              className="govuk-link"
              rel="noreferrer noopener"
              target="_blank"
            >
              Read on erskinemay.parliament.uk
            </a>
          </div>
          {selectedChoice.isCorrect ? (
            <button className="govuk-button" data-module="govuk-button" onClick={onComplete}>
              Continue
            </button>
          ) : (
            <button className="govuk-button govuk-button--secondary" data-module="govuk-button" onClick={() => { setSelectedId(null); setRevealed(false); }}>
              Try again
            </button>
          )}
        </>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PROGRAMMES } from "@/lib/programmes";
import { getScenarioById } from "@/lib/scenarios";
import { useProgress } from "@/lib/progress";
import { useState } from "react";
import type { getModuleById } from "@/lib/modules";

export function ModuleTestClient({ module }: { module: NonNullable<ReturnType<typeof getModuleById>> }) {
  const { isLoaded, startModule, completeModule } = useProgress();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isLoaded) {
    return null;
  }

  const programme = PROGRAMMES.find((p) => p.moduleIds.includes(module.id));
  const scenarios = module.scenarioIds
    .map((id) => getScenarioById(id))
    .filter((s): s is NonNullable<ReturnType<typeof getScenarioById>> => s !== undefined);

  const currentScenario = scenarios[currentIndex];
  const totalQuestions = scenarios.length;

  const handleQuestionComplete = (wasCorrect: boolean) => {
    const newCorrect = wasCorrect ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Test complete — calculate score and navigate to summary
      const score = Math.round((newCorrect / totalQuestions) * 100);
      startModule(module.id);
      completeModule(module.id, score);
      router.push(`/module/${module.id}/summary?score=${score}`);
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
            <span className="govuk-caption-xl">Chapter {module.chapterNumber} · Test</span>
            <h1 className="govuk-heading-xl">{module.title}</h1>

            {currentScenario ? (
              <>
                {totalQuestions > 1 && (
                  <p className="govuk-body govuk-!-margin-bottom-6">
                    Question {currentIndex + 1} of {totalQuestions}
                  </p>
                )}
                <TestQuestion
                  key={currentScenario.id}
                  scenario={currentScenario}
                  onComplete={handleQuestionComplete}
                  isLastQuestion={currentIndex === scenarios.length - 1}
                />
              </>
            ) : (
              <>
                <p className="govuk-body">No test scenarios available for this module yet.</p>
                <Link href={`/module/${module.id}/summary`} role="button" draggable="false" className="govuk-button" data-module="govuk-button">
                  Continue without test
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function TestQuestion({
  scenario,
  onComplete,
  isLastQuestion,
}: {
  scenario: NonNullable<ReturnType<typeof getScenarioById>>;
  onComplete: (wasCorrect: boolean) => void;
  isLastQuestion: boolean;
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
                  id={`test-${choice.id}`}
                  name="test-answer"
                  type="radio"
                  value={choice.id}
                  checked={selectedId === choice.id}
                  onChange={() => !revealed && setSelectedId(choice.id)}
                  disabled={revealed}
                />
                <label className="govuk-label govuk-radios__label" htmlFor={`test-${choice.id}`}>
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
          <div className={`govuk-notification-banner ${selectedChoice.isCorrect ? "govuk-notification-banner--success" : ""}`} role="alert" aria-labelledby="test-feedback-title" data-module="govuk-notification-banner">
            <div className="govuk-notification-banner__header">
              <h2 className="govuk-notification-banner__title" id="test-feedback-title">
                {selectedChoice.isCorrect ? "Correct" : "Incorrect"}
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
          <button className="govuk-button" data-module="govuk-button" onClick={() => onComplete(selectedChoice.isCorrect)}>
            {isLastQuestion ? "View results" : "Next question"}
          </button>
        </>
      )}
    </>
  );
}

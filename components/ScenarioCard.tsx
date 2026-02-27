"use client";

import { useState } from "react";
import type { Scenario } from "@/lib/scenarios";

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selectedChoice = scenario.choices.find((c) => c.id === selectedId);

  const handleSubmit = () => {
    if (!selectedId) return;
    setRevealed(true);
  };

  const handleReset = () => {
    setSelectedId(null);
    setRevealed(false);
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
                  id={`train-${choice.id}`}
                  name="train-answer"
                  type="radio"
                  value={choice.id}
                  checked={selectedId === choice.id}
                  onChange={() => !revealed && setSelectedId(choice.id)}
                  disabled={revealed}
                />
                <label className="govuk-label govuk-radios__label" htmlFor={`train-${choice.id}`}>
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
          <div className={`govuk-notification-banner ${selectedChoice.isCorrect ? "govuk-notification-banner--success" : ""}`} role="alert" aria-labelledby="train-feedback-title" data-module="govuk-notification-banner">
            <div className="govuk-notification-banner__header">
              <h2 className="govuk-notification-banner__title" id="train-feedback-title">
                {selectedChoice.isCorrect ? "Correct" : "Not quite"}
              </h2>
            </div>
            <div className="govuk-notification-banner__content">
              <p className="govuk-body">{selectedChoice.feedback}</p>
            </div>
          </div>
          <div className="govuk-inset-text">
            Source: Erskine May, ¶{scenario.paragraphRef}
          </div>
          <button className="govuk-button govuk-button--secondary" data-module="govuk-button" onClick={handleReset}>
            Try again
          </button>
        </>
      )}
    </>
  );
}

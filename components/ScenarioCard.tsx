"use client";

import { useState } from "react";
import type { Scenario } from "@/lib/scenarios";

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
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
  };

  const handleReset = () => {
    setSelectedId(null);
    setRevealed(false);
  };

  return (
    <div className="scenario-card">
      <div className="scenario-card__eyebrow">Procedural Exercise</div>
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
              {selectedChoice.isCorrect
                ? "Correct"
                : "Not quite"}
            </div>
            <p>{selectedChoice.feedback}</p>
            <p style={{ marginTop: "var(--space-3)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
              Source: Erskine May, ¶{scenario.paragraphRef}
            </p>
          </div>
          <div style={{ marginTop: "var(--space-6)" }}>
            <button className="btn btn--secondary" onClick={handleReset}>
              Attempt Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}

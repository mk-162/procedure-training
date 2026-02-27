"use client";

import Link from "next/link";

interface Step {
  id: string;
  label: string;
  href: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav className="step-indicator" aria-label="Module progress">
      <ol className="step-indicator__list">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;

          return (
            <li
              key={step.id}
              className={`step-indicator__step ${isActive ? "step-indicator__step--active" : ""} ${isCompleted ? "step-indicator__step--completed" : ""}`}
            >
              {isCompleted ? (
                <Link href={step.href} className="step-indicator__link">
                  <span className="step-indicator__marker" aria-hidden="true">✓</span>
                  <span className="step-indicator__label">{step.label}</span>
                </Link>
              ) : isActive ? (
                <span className="step-indicator__current" aria-current="step">
                  <span className="step-indicator__marker" aria-hidden="true">{index + 1}</span>
                  <span className="step-indicator__label">{step.label}</span>
                </span>
              ) : (
                <span className="step-indicator__pending">
                  <span className="step-indicator__marker" aria-hidden="true">{index + 1}</span>
                  <span className="step-indicator__label">{step.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

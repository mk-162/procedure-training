import Link from "next/link";
import { TaskTracker, type Task } from "@/components/TaskTracker";
import { DEMO_SCENARIOS } from "@/lib/scenarios";

// Demo module data — Phase 2 will generate from API
const tasks: Task[] = DEMO_SCENARIOS.map((s) => ({
  id: s.id,
  title: s.title,
  description: `¶${s.paragraphRef} · ${s.difficulty}`,
  status: "not-started" as const,
  href: `/train/${s.id}`,
}));

export default function HomePage() {
  return (
    <>
      <div className="parliament-banner">
        <div className="container">
          <h1>Erskine May Training</h1>
          <p>
            Interactive scenario-based learning for House of Commons procedure.
            Synchronised with the live digital edition.
          </p>
        </div>
      </div>

      <main className="page-content">
        <div className="container">
          <div className="split-layout">
            {/* Left: Module List */}
            <div className="split-layout__primary">
              <h2>Chapter 21: Maintenance of Order</h2>
              <p>
                Learn the rules governing behaviour in the Chamber through
                practical scenarios. Each sprint takes approximately 3 minutes.
              </p>

              <div className="module-grid" style={{ marginTop: "var(--space-8)" }}>
                {DEMO_SCENARIOS.map((scenario) => (
                  <div key={scenario.id} className="module-card">
                    <div className="module-card__chapter">
                      ¶{scenario.paragraphRef}
                    </div>
                    <h3 className="module-card__title">
                      <Link href={`/train/${scenario.id}`}>
                        {scenario.title}
                      </Link>
                    </h3>
                    <div className="module-card__meta">
                      <span className={`tag tag--${scenario.difficulty === "foundation" ? "green" : scenario.difficulty === "intermediate" ? "blue" : "grey"}`}>
                        {scenario.difficulty}
                      </span>
                      <span>~3 min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Progress Tracker */}
            <div className="split-layout__secondary">
              <h3>Your Progress</h3>
              <TaskTracker tasks={tasks} />

              <div className="update-alert" style={{ marginTop: "var(--space-8)" }}>
                <strong>Live Sync Active</strong>
                <br />
                Content is synchronised with the official Erskine May digital
                edition. Last checked: today.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

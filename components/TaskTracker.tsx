import Link from "next/link";

export type TaskStatus = "not-started" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  href: string;
}

const statusLabels: Record<TaskStatus, string> = {
  "not-started": "—",
  "in-progress": "►",
  completed: "✓",
};

export function TaskTracker({ tasks }: { tasks: Task[] }) {
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
        {completed} of {tasks.length} completed
      </p>
      <div className="task-tracker" role="list" aria-label="Training progress">
        {tasks.map((task) => (
          <div key={task.id} className="task-tracker__item" role="listitem">
            <span
              className={`task-tracker__status task-tracker__status--${task.status}`}
              aria-label={task.status.replace("-", " ")}
            >
              {statusLabels[task.status]}
            </span>
            <div>
              <div className="task-tracker__title">
                <Link href={task.href}>{task.title}</Link>
              </div>
              <div className="task-tracker__meta">{task.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

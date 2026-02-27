"use client";

import { useState, useEffect, useCallback } from "react";

export type ModuleStatus = "not-started" | "in-progress" | "completed";

export interface ModuleProgress {
  moduleId: string;
  status: ModuleStatus;
  score?: number;
  completedAt?: number;
  lastAccessedAt?: number;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  lastVisit?: number;
}

const STORAGE_KEY = "erskine-may-progress";

function getInitialProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { modules: {} };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load progress:", e);
  }
  return { modules: {} };
}

function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    progress.lastVisit = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({ modules: {} });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(getInitialProgress());
    setIsLoaded(true);
  }, []);

  const getModuleProgress = useCallback(
    (moduleId: string): ModuleProgress => {
      return (
        progress.modules[moduleId] || {
          moduleId,
          status: "not-started",
        }
      );
    },
    [progress.modules]
  );

  const startModule = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            moduleId,
            status: "in-progress" as ModuleStatus,
            lastAccessedAt: Date.now(),
          },
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const completeModule = useCallback(
    (moduleId: string, score: number) => {
      setProgress((prev) => {
        const updated: UserProgress = {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleId]: {
              moduleId,
              status: "completed" as ModuleStatus,
              score,
              completedAt: Date.now(),
              lastAccessedAt: Date.now(),
            },
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    []
  );

  const getProgrammeProgress = useCallback(
    (moduleIds: string[]): { completed: number; total: number; averageScore: number } => {
      const moduleProgressList = moduleIds.map((id) => getModuleProgress(id));
      const completed = moduleProgressList.filter((p) => p.status === "completed");
      const scores = completed.filter((p) => p.score !== undefined).map((p) => p.score!);
      const averageScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

      return {
        completed: completed.length,
        total: moduleIds.length,
        averageScore,
      };
    },
    [getModuleProgress]
  );

  const getNextModule = useCallback(
    (moduleIds: string[]): string | null => {
      for (const id of moduleIds) {
        const p = getModuleProgress(id);
        if (p.status === "not-started" || p.status === "in-progress") {
          return id;
        }
      }
      return null;
    },
    [getModuleProgress]
  );

  const isFirstVisit = useCallback((): boolean => {
    const moduleValues = Object.values(progress.modules);
    return moduleValues.length === 0;
  }, [progress.modules]);

  return {
    progress,
    isLoaded,
    getModuleProgress,
    startModule,
    completeModule,
    getProgrammeProgress,
    getNextModule,
    isFirstVisit,
  };
}

"use client";

import { useEffect } from "react";

export function GovukInit() {
  useEffect(() => {
    // @ts-ignore — govuk-frontend has no type declarations
    import("govuk-frontend").then((mod) => {
      mod.initAll();
    });
  }, []);

  return null;
}

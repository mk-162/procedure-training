"use client";

import { useState } from "react";

interface AuthorityPanelProps {
  title: string;
  contentHtml: string;
  sectionId: number;
  paragraphRef?: string;
}

export function AuthorityPanel({
  title,
  contentHtml,
  sectionId,
  paragraphRef,
}: AuthorityPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="authority-panel">
      <button
        className="authority-panel__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`authority-content-${sectionId}`}
      >
        <span>
          📜 Source: Erskine May{paragraphRef ? `, ¶${paragraphRef}` : ""} — {title}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 11L3 6h10L8 11z" />
        </svg>
      </button>

      {open && (
        <div
          id={`authority-content-${sectionId}`}
          className="authority-panel__content"
          role="region"
          aria-label={`Erskine May source text: ${title}`}
        >
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <div className="authority-panel__source">
            Erskine May, 25th Edition (Online) — Section {sectionId}
            {" · "}
            <a
              href={`https://erskinemay.parliament.uk/section/${sectionId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Parliament.uk ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

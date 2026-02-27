"use client";

interface AuthorityPanelProps {
  title: string;
  contentHtml: string;
  sectionId: number;
  sectionUrl?: string;
  paragraphRef?: string;
}

export function AuthorityPanel({
  title,
  contentHtml,
  sectionId,
  sectionUrl,
  paragraphRef,
}: AuthorityPanelProps) {
  const summaryText = paragraphRef 
    ? `Source: Erskine May, ¶${paragraphRef} — ${title}`
    : `Source: Erskine May — ${title}`;

  return (
    <details className="govuk-details" data-module="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summaryText}</span>
      </summary>
      <div className="govuk-details__text">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p className="govuk-body-s govuk-!-margin-top-4">
          <a
            href={sectionUrl || `https://erskinemay.parliament.uk/section/${sectionId}`}
            className="govuk-link"
            rel="noreferrer noopener"
            target="_blank"
          >
            Erskine May, 25th Edition (Online) — Section {sectionId}
          </a>
        </p>
      </div>
    </details>
  );
}

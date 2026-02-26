import { fetchSection, flattenSectionIds, fetchChapter } from "./erskine-api";
import type { Section } from "./erskine-api";

// The 2019 print edition is our baseline — anything updated after this is "new"
const BASELINE_DATE = new Date("2019-12-31T00:00:00Z");

export interface UpdatedSection {
  id: number;
  title: string;
  chapterNumber: number;
  updatedDate: string;
  daysSinceUpdate: number;
}

export function isUpdatedSince2019(section: Section): boolean {
  if (!section.isUpdated || !section.updatedDate) return false;
  return new Date(section.updatedDate) > BASELINE_DATE;
}

export async function checkChapterForUpdates(
  chapterNumber: number
): Promise<UpdatedSection[]> {
  const chapter = await fetchChapter(chapterNumber);
  const sectionIds = flattenSectionIds(chapter.sections);
  const updated: UpdatedSection[] = [];
  const now = Date.now();

  // Fetch in batches of 5 to avoid hammering the API
  for (let i = 0; i < sectionIds.length; i += 5) {
    const batch = sectionIds.slice(i, i + 5);
    const sections = await Promise.all(batch.map((id) => fetchSection(id)));

    for (const section of sections) {
      if (isUpdatedSince2019(section) && section.updatedDate) {
        updated.push({
          id: section.id,
          title: section.title,
          chapterNumber: section.chapterNumber,
          updatedDate: section.updatedDate,
          daysSinceUpdate: Math.floor(
            (now - new Date(section.updatedDate).getTime()) / (1000 * 60 * 60 * 24)
          ),
        });
      }
    }
  }

  return updated;
}

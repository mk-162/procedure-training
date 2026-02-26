const BASE_URL = "https://erskinemay-api.parliament.uk";

// In-memory cache with TTL
const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

async function cachedFetch<T>(path: string): Promise<T> {
  const key = path;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expires > now) return cached.data as T;

  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Erskine May API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  cache.set(key, { data, expires: now + CACHE_TTL });
  return data as T;
}

// Types
export interface ChapterSection {
  id: number;
  title: string;
  titleChain: string | null;
  subSections: ChapterSection[];
}

export interface Chapter {
  partNumber: number;
  number: number;
  title: string;
  description: string | null;
  sections: ChapterSection[];
}

export interface Section {
  parentSectionId: number | null;
  parentSectionTitle: string | null;
  chapterNumber: number;
  chapterTitle: string;
  partNumber: number;
  partTitle: string;
  contentHtml: string;
  isUpdated: boolean;
  updatedDate: string | null;
  footnotes: Array<{ id: number; content: string }>;
  id: number;
  title: string;
  titleChain: string | null;
  subSections: ChapterSection[];
}

export interface ParagraphRef {
  ref: string; // e.g. "21.1"
  text: string; // surrounding text
}

// API methods
export async function fetchChapter(number: number): Promise<Chapter> {
  return cachedFetch<Chapter>(`/api/Chapter/${number}`);
}

export async function fetchSection(id: number): Promise<Section> {
  return cachedFetch<Section>(`/api/Section/${id}`);
}

// Extract paragraph references from HTML content
export function extractParagraphRefs(html: string): ParagraphRef[] {
  const refs: ParagraphRef[] = [];
  const regex = /<span class="paragraph-reference">([\d.]+)<\/span>([^<]*)/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    refs.push({ ref: match[1], text: match[2].trim() });
  }
  return refs;
}

// Strip HTML to plain text
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

// Flatten all section IDs from a chapter (recursive)
export function flattenSectionIds(sections: ChapterSection[]): number[] {
  const ids: number[] = [];
  for (const s of sections) {
    ids.push(s.id);
    if (s.subSections.length > 0) {
      ids.push(...flattenSectionIds(s.subSections));
    }
  }
  return ids;
}

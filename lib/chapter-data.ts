// Static metadata for all 40 chapters — avoids fetching everything on homepage load
// Part structure mirrors Erskine May's official organisation

export interface PartData {
  number: number;
  title: string;
  chapters: ChapterMeta[];
}

export interface ChapterMeta {
  number: number;
  title: string;
  sectionCount: number;
  sprintCount: number; // Estimated: ~1 sprint per 3-5 top-level sections
  status: "available" | "coming-soon";
  moduleTitle?: string; // Narrative "Day in the Chamber" title
  moduleDescription?: string;
}

export const PARTS: PartData[] = [
  {
    number: 1,
    title: "Constitution and Membership of Parliament",
    chapters: [
      { number: 1, title: "The constituent parts of Parliament", sectionCount: 4, sprintCount: 2, status: "coming-soon" },
      { number: 2, title: "Elections", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
      { number: 3, title: "Disqualification for membership of either House", sectionCount: 4, sprintCount: 2, status: "coming-soon" },
      { number: 4, title: "Members and Elected Officers of Parliament", sectionCount: 4, sprintCount: 2, status: "coming-soon" },
      { number: 5, title: "Rules governing the conduct of Members of both Houses and the disclosure of financial interests", sectionCount: 3, sprintCount: 2, status: "coming-soon" },
      { number: 6, title: "Administration of Parliament and the Parliamentary Estate", sectionCount: 8, sprintCount: 3, status: "coming-soon" },
      { number: 7, title: "Parliamentary papers, publications and records", sectionCount: 8, sprintCount: 3, status: "coming-soon" },
      { number: 8, title: "A new Parliament and opening and closing of session", sectionCount: 4, sprintCount: 2, status: "coming-soon" },
      { number: 9, title: "Formal communications between Crown and Parliament and between Lords and Commons", sectionCount: 3, sprintCount: 2, status: "coming-soon" },
      { number: 10, title: "Parliament and international assemblies", sectionCount: 8, sprintCount: 3, status: "coming-soon" },
    ],
  },
  {
    number: 2,
    title: "Parliamentary Privilege",
    chapters: [
      { number: 11, title: "Power and jurisdiction of Parliament", sectionCount: 12, sprintCount: 4, status: "coming-soon" },
      { number: 12, title: "The privilege of Parliament", sectionCount: 3, sprintCount: 2, status: "coming-soon" },
      { number: 13, title: "Privilege of freedom of speech", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
      { number: 14, title: "Privilege of freedom from arrest", sectionCount: 8, sprintCount: 3, status: "coming-soon" },
      { number: 15, title: "Contempts, and handling complaints of contempt or breach of privilege", sectionCount: 15, sprintCount: 5, status: "coming-soon" },
      { number: 16, title: "The courts and parliamentary privilege", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
    ],
  },
  {
    number: 3,
    title: "Procedure in the House of Commons",
    chapters: [
      {
        number: 17, title: "Sittings of the House: general arrangements in the House of Commons",
        sectionCount: 7, sprintCount: 3, status: "coming-soon",
        moduleTitle: "Sittings and Business",
        moduleDescription: "The ordering of business and management of the sitting day",
      },
      {
        number: 18, title: "The control and distribution of time for business in the House of Commons",
        sectionCount: 7, sprintCount: 3, status: "coming-soon",
        moduleTitle: "Sittings and Business",
        moduleDescription: "The allocation and control of time for business",
      },
      {
        number: 19, title: "Order and handling of business in the House of Commons",
        sectionCount: 3, sprintCount: 2, status: "coming-soon",
        moduleTitle: "Debate and Decision",
        moduleDescription: "The ordering and handling of business in the House",
      },
      {
        number: 20, title: "The process of debate in the House of Commons by motion, question and decision",
        sectionCount: 10, sprintCount: 4, status: "coming-soon",
        moduleTitle: "Debate and Decision",
        moduleDescription: "The conduct of debate by motion, question and decision",
      },
      {
        number: 21, title: "Maintenance of order during debates in the House of Commons",
        sectionCount: 6, sprintCount: 5, status: "available",
        moduleTitle: "Maintenance of Order",
        moduleDescription: "The rules of order and the powers of the Chair",
      },
      {
        number: 22, title: "Questions to Ministers",
        sectionCount: 6, sprintCount: 3, status: "coming-soon",
        moduleTitle: "Questions to Ministers",
        moduleDescription: "The practice and procedure of parliamentary questions",
      },
      { number: 23, title: "Sittings in Westminster Hall", sectionCount: 5, sprintCount: 2, status: "coming-soon" },
      { number: 24, title: "Petitions", sectionCount: 10, sprintCount: 4, status: "coming-soon" },
      { number: 25, title: "Organisation and conduct of business in the House of Lords", sectionCount: 5, sprintCount: 3, status: "coming-soon" },
    ],
  },
  {
    number: 4,
    title: "Legislation",
    chapters: [
      { number: 26, title: "Preliminary view of public bills", sectionCount: 4, sprintCount: 2, status: "coming-soon" },
      { number: 27, title: "Legislative procedure in the Commons and devolved legislative competence", sectionCount: 5, sprintCount: 3, status: "coming-soon" },
      { number: 28, title: "Proceedings on public bills in the House of Commons", sectionCount: 12, sprintCount: 4, status: "coming-soon" },
      { number: 29, title: "Proceedings on public bills in the House of Lords", sectionCount: 15, sprintCount: 5, status: "coming-soon" },
      { number: 30, title: "Proceedings on public bills: matters affecting both Houses", sectionCount: 9, sprintCount: 4, status: "coming-soon" },
      { number: 31, title: "Delegated legislation", sectionCount: 9, sprintCount: 4, status: "coming-soon" },
      { number: 32, title: "Parliamentary oversight of matters relating to the European Union", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
    ],
  },
  {
    number: 5,
    title: "Financial Procedure",
    chapters: [
      { number: 33, title: "Overview of financial procedure", sectionCount: 7, sprintCount: 3, status: "coming-soon" },
      { number: 34, title: "Public expenditure and Supply", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
      { number: 35, title: "Expenditure: Money resolutions", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
      { number: 36, title: "Ways and Means and Finance Bills", sectionCount: 5, sprintCount: 3, status: "coming-soon" },
      { number: 37, title: "The role of the House of Lords in financial procedure", sectionCount: 6, sprintCount: 3, status: "coming-soon" },
    ],
  },
  {
    number: 6,
    title: "Committees",
    chapters: [
      { number: 38, title: "Select committees in the House of Commons", sectionCount: 14, sprintCount: 5, status: "coming-soon" },
      { number: 39, title: "General Committees in the House of Commons", sectionCount: 5, sprintCount: 3, status: "coming-soon" },
      { number: 40, title: "Select committees in the House of Lords", sectionCount: 3, sprintCount: 2, status: "coming-soon" },
    ],
  },
];

export function getChapter(number: number): ChapterMeta | undefined {
  for (const part of PARTS) {
    const ch = part.chapters.find((c) => c.number === number);
    if (ch) return ch;
  }
  return undefined;
}

export function getPartForChapter(chapterNumber: number): PartData | undefined {
  return PARTS.find((p) => p.chapters.some((c) => c.number === chapterNumber));
}

export const TOTAL_CHAPTERS = 40;
export const TOTAL_SECTIONS = 1884;

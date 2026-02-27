// Module definitions for the training app
// Each module maps to specific chapters and scenarios

import { PROGRAMMES } from "./programmes";

export interface Module {
  id: string;
  title: string;
  chapterNumber: number;
  sectionId?: number;
  sectionUrl?: string;
  paragraphRef?: string;
  scenarioIds: string[];
  timeEstimate: number; // minutes
  briefing: string;
  authorityContent?: string;
  keyTakeaways?: string[];
}

export const MODULES: Module[] = [
  {
    id: "naming-a-member",
    title: "Naming a Member",
    chapterNumber: 21,
    sectionId: 4901,
    sectionUrl: "https://erskinemay.parliament.uk/section/4901/proceedings-on-the-naming-of-a-member",
    paragraphRef: "21.24",
    scenarioIds: ["naming-a-member", "maiden-speech", "unparliamentary-language"],
    timeEstimate: 8,
    briefing:
      "Under Standing Order No. 44, if a Member persists in disregarding the authority of the Chair after being warned, the Speaker has the power to 'name' that Member. This is a grave step in the disciplinary procedures of the House.\n\nWhen a Member is named, the Speaker formally states that the Member is named for disregarding the authority of the Chair. A motion is then immediately put to the House without debate (except for the mover and seconder) for the Member's suspension.\n\nThe suspension typically lasts for the remainder of the sitting day for a first offence, but can extend to longer periods for repeated offences. This procedure is the most serious disciplinary power the Speaker exercises in the Chamber, reflecting the House's commitment to maintaining order and respect for the Chair.",
    authorityContent:
      "<p><strong>Standing Order No. 44</strong></p><p>In case of grave disorder, the Speaker may name a Member for disregarding the authority of the Chair. When a Member has been named by the Speaker, a motion shall be made forthwith by a Minister, or by a Member in opposition, for the suspension of the Member so named.</p>",
    keyTakeaways: [
      "Naming is the most serious disciplinary power the Speaker exercises in the Chamber",
      "The Member must persist in disregarding the Chair after being warned",
      "A motion for suspension is put to the House without debate",
      "First offence typically results in suspension for the remainder of the sitting day",
    ],
  },
  {
    id: "maiden-speech",
    title: "Maiden Speech Conventions",
    chapterNumber: 21,
    sectionId: 4857,
    sectionUrl: "https://erskinemay.parliament.uk/section/4857/new-members-maiden-speeches",
    paragraphRef: "21.7",
    scenarioIds: ["maiden-speech"],
    timeEstimate: 5,
    briefing:
      "A maiden speech is a new Member's first address to the House of Commons. Several well-established conventions govern how these speeches are made and received.\n\nThe speech should be uncontroversial in tone — traditionally, new Members speak about their constituency, its character and concerns, and pay tribute to their predecessor regardless of party. This allows the new Member to introduce themselves to the House without provoking division.\n\nCrucially, other Members are expected NOT to intervene during a maiden speech, and the new Member does not give way. This courtesy allows the new Member to speak without interruption. The convention reflects the House's tradition of welcoming new Members while maintaining its dignified character.",
    authorityContent:
      "<p><strong>Erskine May, ¶21.7</strong></p><p>It is a well-established convention that a Member making their first speech (a 'maiden speech') should be heard in silence and without interruption. The speech is traditionally non-partisan in character.</p>",
    keyTakeaways: [
      "Maiden speeches are traditionally non-partisan",
      "Members should not intervene during a maiden speech",
      "The new Member typically pays tribute to their predecessor",
      "The speech should refer to the Member's constituency",
    ],
  },
  {
    id: "unparliamentary-language",
    title: "Unparliamentary Language",
    chapterNumber: 21,
    sectionId: 4870,
    sectionUrl: "https://erskinemay.parliament.uk/section/4870/requirement-for-respectful-and-parliamentary-language",
    paragraphRef: "21.19",
    scenarioIds: ["unparliamentary-language"],
    timeEstimate: 5,
    briefing:
      "The House of Commons maintains strict standards on language used in debate. Certain words and phrases are considered 'unparliamentary' and the Speaker will intervene if they are used.\n\nKey examples include: accusing another Member of lying or deliberately misleading the House (which imputes dishonourable conduct), using insulting language about the House or its members, and references that could be construed as personal abuse.\n\nWhen unparliamentary language is used, the Speaker should intervene and ask the Member to withdraw the remark. If the Member wishes to make a serious allegation, the proper course is to table a substantive motion — it cannot simply be stated as a debating point. Failure to withdraw can escalate to the Member being named.",
    authorityContent:
      "<p><strong>Erskine May, ¶21.19</strong></p><p>Language which imputes dishonourable conduct to another Member is unparliamentary. The Speaker has intervened when Members have accused others of 'lying' or 'deliberately misleading the House'.</p>",
    keyTakeaways: [
      "Accusing a Member of lying is unparliamentary",
      "The Speaker should intervene and ask for withdrawal",
      "Serious allegations must be made by substantive motion",
      "Failure to withdraw can lead to being named",
    ],
  },
  {
    id: "order-of-business",
    title: "Order of Business",
    chapterNumber: 17,
    sectionId: 4701,
    paragraphRef: "17.1",
    scenarioIds: [],
    timeEstimate: 6,
    briefing:
      "The order of business in the House of Commons is fundamentally controlled by the Government, through the business of the House motion and the weekly business statement. However, the House also provides opportunities for Backbenchers to secure debates.\n\nGovernment business takes precedence on most sitting days. The Leader of the House makes a weekly statement on the forthcoming business, and the Procedure Committee has recommended that this should be made on the earliest possible sitting day each week.\n\nBackbench business days are allocated each Thursday, and a ballot determines which private Members' motions are discussed. The Chairman of Ways and Means also has discretion to grant emergency debates under Standing Order No. 24.",
    keyTakeaways: [
      "Government controls the order of business through the business motion",
      "The weekly business statement is made by the Leader of the House",
      "Backbench business days are allocated on Thursdays",
      "Emergency debates can be granted by the Chairman of Ways and Means",
    ],
  },
  {
    id: "time-allocation",
    title: "Time Allocation",
    chapterNumber: 18,
    sectionId: 4745,
    paragraphRef: "18.1",
    scenarioIds: [],
    timeEstimate: 6,
    briefing:
      "Time allocation (often called 'guillotining') is a procedure used by the Government to limit debate on a bill or other business. It was first introduced in 1882 and remains a contentious but necessary tool for managing the House's heavy legislative programme.\n\nThe main forms are: a resolution specifying the hours at which particular stages must be completed; a 'programme' motion setting out a timetable for a bill's remaining stages; and a 'carry-over' motion allowing unfinished stages to resume in a later session.\n\nTime allocation motions are themselves subject to debate and amendment. The Procedure Committee has repeatedly expressed concern about the use of guillotines, arguing that they should be a last resort rather than a routine management tool.",
    keyTakeaways: [
      "Time allocation limits debate on bills and other business",
      "Three main forms: resolution, programme motion, and carry-over",
      "Time allocation motions are themselves debatable",
      "The Procedure Committee recommends limiting their use",
    ],
  },
  {
    id: "questions-to-ministers",
    title: "Questions to Ministers",
    chapterNumber: 22,
    sectionId: 4901,
    paragraphRef: "22.1",
    scenarioIds: [],
    timeEstimate: 6,
    briefing:
      "Questions to Ministers are a fundamental mechanism for holding the Government to account. They are the most frequently used form of parliamentary business, with thousands tabled each session.\n\nThe main categories are: oral questions (answered orally in the Chamber), private notice questions (urgent matters granted by the Speaker), and written questions (answered in writing for the formal record).\n\nOral questions are taken at the start of each sitting day (except Fridays). The order of questions is determined by a ballot of Members. Members may ask follow-up questions of up to two minutes, and the questioner has priority for the first supplementary.\n\nThe Speaker has general responsibility for the order of questions and may select which questions are answered orally.",
    keyTakeaways: [
      "Questions are the most frequently used form of parliamentary business",
      "Oral questions are taken at the start of each sitting day",
      "A ballot determines the order of oral questions",
      "The Speaker may select which questions are answered orally",
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getModulesForProgramme(programmeSlug: string): Module[] {
  const programme = PROGRAMMES.find((p) => p.slug === programmeSlug);
  if (!programme) return [];
  return programme.moduleIds
    .map((id) => getModuleById(id))
    .filter((m): m is Module => m !== undefined);
}

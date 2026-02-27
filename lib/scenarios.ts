// Phase 1: Hardcoded scenarios for Chapter 21 demo
// Phase 2 will generate these dynamically via AI

export interface ScenarioChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string; // Written in "Clerk" tone
}

export interface Scenario {
  id: string;
  sectionId: number;
  sectionUrl: string; // Full URL on erskinemay.parliament.uk
  paragraphRef: string;
  title: string;
  context: string; // "The Move" — sets the scene
  question: string;
  choices: ScenarioChoice[];
  difficulty: "introductory" | "applied" | "complex";
}

// Demo scenarios for Chapter 21: Maintenance of Order
export const DEMO_SCENARIOS: Scenario[] = [
  {
    id: "naming-a-member",
    sectionId: 4901,
    sectionUrl: "https://erskinemay.parliament.uk/section/4901/proceedings-on-the-naming-of-a-member",
    paragraphRef: "21.24",
    title: "Naming a Member",
    context:
      "During a heated debate on the Finance Bill, a Member of the Opposition repeatedly ignores the Speaker's calls to order, using unparliamentary language directed at a Minister. The Speaker has already warned the Member twice.",
    question:
      "As the Speaker, what is the correct procedural step you should now take?",
    choices: [
      {
        id: "a",
        text: "Ask the Serjeant at Arms to remove the Member immediately",
        isCorrect: false,
        feedback:
          "Not quite. The Serjeant at Arms acts only on the direction of the Speaker, but removal follows a specific procedure. The Member must first be formally named before the House can decide on their suspension.",
      },
      {
        id: "b",
        text: 'Name the Member by saying "I name [Member] for disregarding the authority of the Chair"',
        isCorrect: true,
        feedback:
          "Correct. Under Standing Order No. 44, if a Member persists in disregarding the authority of the Chair after being warned, the Speaker names the Member. A motion is then put to the House for the Member's suspension. This is a grave step — the most serious disciplinary power the Speaker exercises in the Chamber.",
      },
      {
        id: "c",
        text: "Suspend the sitting for thirty minutes to allow tempers to cool",
        isCorrect: false,
        feedback:
          "The Speaker may indeed suspend the sitting under Standing Order No. 46 if there is grave disorder, but this is reserved for situations where the whole House is in disorder. For a single persistent offender, the correct step is to name the Member under Standing Order No. 44.",
      },
      {
        id: "d",
        text: "Issue a formal written warning to the Member after the debate",
        isCorrect: false,
        feedback:
          "The Speaker's authority to maintain order operates in real time during proceedings. There is no procedure for a post-debate written warning. The appropriate response to persistent defiance is to name the Member during the sitting.",
      },
    ],
    difficulty: "applied",
  },
  {
    id: "maiden-speech",
    sectionId: 4857,
    sectionUrl: "https://erskinemay.parliament.uk/section/4857/new-members-maiden-speeches",
    paragraphRef: "21.7",
    title: "Maiden Speech Conventions",
    context:
      "A newly elected Member is about to deliver their maiden speech during a Second Reading debate. The Whips' Office has asked you, as a senior clerk, to brief the new Member on the conventions.",
    question: "Which of the following is NOT a convention for maiden speeches?",
    choices: [
      {
        id: "a",
        text: "The speech should be uncontroversial in tone",
        isCorrect: false,
        feedback:
          "Not quite. An uncontroversial tone is indeed a well-established convention for maiden speeches — so this IS a recognised convention, not the odd one out. Look for the option that reverses an actual convention.",
      },
      {
        id: "b",
        text: "The Member should pay tribute to their predecessor",
        isCorrect: false,
        feedback:
          "Not quite. Paying tribute to one's predecessor is a long-standing convention — new Members customarily speak generously of their predecessor regardless of party. This IS a recognised convention, not the odd one out.",
      },
      {
        id: "c",
        text: "The Member should refer to their constituency",
        isCorrect: false,
        feedback:
          "Not quite. Referring to one's constituency is indeed conventional — new Members typically describe their constituency, its character and concerns. This IS a recognised convention, not the odd one out.",
      },
      {
        id: "d",
        text: "The Member must give way to interventions as a courtesy",
        isCorrect: true,
        feedback:
          "Well spotted. The convention is precisely the opposite — it is customary for other Members NOT to intervene during a maiden speech, and for the new Member not to give way. This courtesy allows the new Member to speak without interruption.",
      },
    ],
    difficulty: "introductory",
  },
  {
    id: "unparliamentary-language",
    sectionId: 4870,
    sectionUrl: "https://erskinemay.parliament.uk/section/4870/requirement-for-respectful-and-parliamentary-language",
    paragraphRef: "21.19",
    title: "Unparliamentary Language",
    context:
      'During Questions to the Prime Minister, a backbencher shouts across the Chamber: "The Minister is deliberately misleading the House!"',
    question:
      "As the Speaker, how should you respond to this remark?",
    choices: [
      {
        id: "a",
        text: "Ignore it — robust language is expected during PMQs",
        isCorrect: false,
        feedback:
          "While the Speaker exercises discretion and the atmosphere during PMQs can be lively, an accusation of deliberately misleading the House is a serious matter. This language imputes dishonourable conduct and cannot be overlooked.",
      },
      {
        id: "b",
        text: "Ask the Member to withdraw the remark",
        isCorrect: true,
        feedback:
          'Correct. Accusing another Member of deliberately misleading the House is unparliamentary, as it imputes dishonourable conduct. The Speaker should intervene and ask the Member to withdraw the remark. If the Member wishes to allege that the House has been misled, the proper course is to table a substantive motion — it cannot simply be stated as a debating point.',
      },
      {
        id: "c",
        text: "Name the Member immediately",
        isCorrect: false,
        feedback:
          "Naming is a serious step reserved for persistent defiance of the Chair. The first response to unparliamentary language is to ask the Member to withdraw. Only if they refuse would the Speaker escalate.",
      },
      {
        id: "d",
        text: "Refer the matter to the Committee of Privileges",
        isCorrect: false,
        feedback:
          "The Committee of Privileges deals with matters of privilege, not routine breaches of order in debate. The Speaker's authority to maintain order in the Chamber is the appropriate mechanism here.",
      },
    ],
    difficulty: "applied",
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return DEMO_SCENARIOS.find((s) => s.id === id);
}

export function getScenariosForSection(sectionId: number): Scenario[] {
  return DEMO_SCENARIOS.filter((s) => s.sectionId === sectionId);
}

# Tone and style guide

This document captures the writing and tone rules for the Erskine May training application. All user-facing text must follow these standards.

Sources:
- [GOV.UK Style Guide A to Z](https://www.gov.uk/guidance/style-guide/a-to-z)
- [Writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [The Guardian Style Guide](https://www.theguardian.com/guardian-observer-style-guide-a) (fallback for points not covered above)

---

## Core principles

### Plain English is mandatory

Do not use formal or long words when easy or short ones will do.

| Instead of | Use |
|---|---|
| purchase | buy |
| assist | help |
| approximately | about |
| commence | start |
| implement | do, carry out |
| facilitate | help |
| utilise | use |
| in order to | to |
| prior to | before |

Higher literacy people prefer plain English because it lets them understand information quickly. This applies to parliamentary professionals too.

### Write conversationally

Write as if you're talking to the user one-to-one, with the authority of someone who can actively help. Be:

- specific
- informative
- clear and concise
- brisk but not terse
- incisive — friendliness can lead to unnecessary words, but remain human
- serious but not pompous
- emotionless — avoid subjective adjectives that sound like spin

### Active voice

Use the active rather than passive voice.

- Yes: "The Speaker names the Member"
- No: "The Member is named by the Speaker"

### Address the user as "you"

- Yes: "You can start the exercise"
- No: "Users may commence the training module"

---

## Capitalisation

### Sentence case for everything

Use sentence case for all headings, labels, navigation and button text. Only capitalise proper nouns.

- Yes: "Complete chapter index"
- Yes: "Section index"
- Yes: "Source authority"
- No: "Complete Chapter Index"
- No: "Section Index"

### Proper nouns that keep capitalisation

- Erskine May
- House of Commons, House of Lords
- Parliament, the House
- Speaker, Deputy Speaker (when referring to the office)
- Standing Order No. 44 (specific orders)
- Table Office
- Serjeant at Arms
- Chapter 21 (specific chapters)
- Member (when referring to a Member of Parliament)

### Lower case

- government (unless full title)
- minister (unless specific title like Minister for the Cabinet Office)
- committee (unless specific: Public Administration Select Committee)
- white paper, green paper, command paper
- act, bill (unless full title: Housing Reform Bill)

### Do not use block capitals

Block capitals are harder to read (13 to 18% slower) and indicate shouting online.

---

## Numbers

- Spell out "one" unless in a step or list
- Use numerals for 2 to 9 and above: "3 exercises", "48 sections"
- For numerals over 999, use a comma: 9,000
- Spell out common fractions: one-half, two-thirds
- Use a % sign: 50%
- Use "to" in ranges, not hyphens: "500 to 900", "chapters 17 to 22"

### Ordinal numbers

Spell out first to ninth. After that use 10th, 11th and so on.

---

## Dates and times

- Use upper case for months: January, February
- No comma between month and year: 4 June 2017
- Use "to" in date ranges: "tax year 2011 to 2012"
- No ordinal suffixes: "25 February 2026", not "25th February 2026"
- Time format: "9am to 5pm" (no full stops in am/pm)

---

## Sentences and paragraphs

- Short sentences. Check any sentence with more than 25 words.
- Paragraphs should have no more than 5 sentences each.
- Front-load the most important information (inverted pyramid).
- Words ending in "-ion" and "-ment" tend to make sentences longer than they need to be.

---

## Headings

- Use sentence case
- Front-load with search terms
- Make them active
- Do not use questions — they're hard to front-load and users want answers
- Do not use "introduction" as a first section
- Do not use technical terms in headings unless already explained
- Do not skip heading levels (H2 to H4)
- Do not use bold text instead of headings

---

## Bullet points

- Always use a lead-in line
- Use more than one bullet
- Bullets must make sense running on from the lead-in line
- Lower case at the start of each bullet
- No more than one sentence per bullet
- Do not put "or" or "and" after bullets
- No semicolons at end of bullets
- No full stop after the last bullet

### Steps

Use numbered steps for processes. Steps end in a full stop because each should be a complete sentence.

---

## Links

- Front-load link text with relevant terms
- Make links active and specific
- Link text must make sense out of context (for screen readers)
- Do not use "click here" — not all users click. Use "select"

---

## Contractions

- Use positive contractions: "you'll", "we're", "it's"
- Avoid negative contractions: use "cannot" not "can't", "do not" not "don't"
- Avoid complex contractions: "should've", "could've", "would've"

---

## Abbreviations

- Explain at first use on a page: "Personal Independence Payment (PIP)"
- No full stops in abbreviations: BBC not B.B.C.
- Well-known abbreviations that need no explanation: MP, UK, NHS, EU

### In this application

- Standing Order (SO) — explain at first use
- Parliamentary terms are not jargon — they are the precise vocabulary of the domain

---

## Words to avoid

Do not use formal or "government buzzword" language:

| Avoid | Use instead |
|---|---|
| deliver (as in deliver a service) | provide, run |
| deploy | use |
| dialogue | discussion, talk |
| disincentivise | discourage |
| empower | allow, let |
| facilitate | help |
| foster (unless about fostering children) | encourage |
| impact (as a verb) | affect |
| incentivise | encourage |
| key (as an adjective) | important, main |
| leverage | use, take advantage of |
| overarching | overall |
| progress (as a verb) | take forward, move on |
| robust | strong |
| streamline | simplify |
| tackle | deal with, reduce |
| transforming | changing, improving |
| utilise | use |

---

## Specific to this application

### The Clerk-at-your-Shoulder tone

Feedback text in training scenarios uses a specific tone: a supportive Senior Clerk whispering advice. It is:

- Authoritative but never condescending
- Precise — cites exact paragraph references
- Supportive — "Not quite" rather than "Wrong"
- Explanatory — tells the user why, not just what

Example:
> "Not quite. The Serjeant at Arms acts only on the direction of the Speaker, but removal follows a specific procedure. The Member must first be formally named before the House can decide on their suspension."

### Unavailable states

When content cannot be loaded or a feature is not ready, be direct:

- "We cannot reach the Erskine May API at the moment. Consult the Table Office for the authoritative text."
- "In preparation — we are developing training exercises for this chapter."

### The fallback

If the system encounters a procedural question it cannot confidently answer: **"Consult the Table Office."**

Never guess parliamentary procedure.

---

## Accessibility

- Use semantic HTML with appropriate aria labels
- Full keyboard navigation
- Focus ring: 3px solid #FBCF20
- Skip link on every page
- Do not use italics
- Do not use FAQs
- Do not use footnotes — include important information in body text

---

## Gender and inclusive language

- Use gender-neutral text: "them", "their", "they"
- Use "women" and "men" not "males" and "females"
- Use "disabled people" not "people with disabilities"
- Do not use BAME or BME

---

## References

- [GOV.UK Style Guide A to Z](https://www.gov.uk/guidance/style-guide/a-to-z) — spelling, capitalisation, specific word usage
- [Writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) — tone of voice, reading level, plain English
- [GOV.UK Design System](https://design-system.service.gov.uk/) — component patterns, content patterns
- [The GDS Way](https://gds-way.digital.cabinet-office.gov.uk/) — coding standards
- [The Guardian Style Guide](https://www.theguardian.com/guardian-observer-style-guide-a) — fallback for points not covered by GDS

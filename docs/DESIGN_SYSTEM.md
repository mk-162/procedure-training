# Design system reference

This document describes how the Erskine May training application implements the
GOV.UK Design System with UK Parliament brand overrides.

## Sources of truth

| Concern | Source | URL |
|---|---|---|
| Visual styles | GOV.UK Frontend v6 | https://github.com/alphagov/govuk-frontend |
| Parliament brand | UK Parliament Pugin | https://github.com/ukparliament/parliament.uk-pugin |
| Component patterns | GOV.UK Design System | https://design-system.service.gov.uk |
| Content writing | GOV.UK Content Style Guide | https://www.gov.uk/guidance/style-guide/a-to-z |
| Writing guidance | Writing for GOV.UK | https://www.gov.uk/guidance/content-design/writing-for-gov-uk |
| Code standards | The GDS Way | https://gds-way.digital.cabinet-office.gov.uk |
| Accessibility | WCAG 2.2 level AA | https://www.w3.org/TR/WCAG22 |

## Architecture

All styles live in `styles/parliament.css`. This single file contains:

1. **CSS custom properties** — GOV.UK tokens overridden with Pugin values
2. **GOV.UK base styles** — typography, links, focus states, skip link
3. **Parliament brand overrides** — header, footer, accent bar, buttons
4. **Component styles** — blocks, breadcrumbs, tags, pagination, cards
5. **Training-specific styles** — scenario cards, choice buttons, feedback panels

The `govuk-frontend` npm package is installed for its font and image assets
(copied to `/public/assets/`). The compiled CSS is not imported directly because
Next.js cannot parse the minified output.

## Typography

### Type scale (GDS v6)

| Name | Mobile | Desktop (≥640px) |
|---|---|---|
| `h1` / `govuk-heading-xl` | 32px / 35px | 48px / 50px |
| `h2` / `govuk-heading-l` | 27px / 30px | 36px / 40px |
| `h3` / `govuk-heading-m` | 21px / 25px | 24px / 30px |
| `h4` / `govuk-heading-s` | 19px / 25px | 19px / 25px |
| `p` / `govuk-body` | 19px / 25px | 19px / 25px |
| `govuk-body-s` | 16px / 20px | 16px / 20px |
| `govuk-body-l` | 21px / 25px | 24px / 30px |

### Font stack

```
'National', 'GDS Transport', arial, sans-serif
```

National is the UK Parliament typeface, loaded from `static.parliament.uk`.
GDS Transport is provided by govuk-frontend as a fallback.

**Important:** GDS Transport is only licensed for `service.gov.uk` subdomains.
This application uses National as the primary face.

## Colours

### Brand tokens (from Pugin)

| Token | Hex | Usage |
|---|---|---|
| `--parliament-purple` | `#373151` | Header, footer |
| `--parliament-green` | `#006E46` | Primary actions, Commons Green |
| `--parliament-green-dark` | `#004229` | Button hover, shadows |
| `--parliament-blue` | `#2B57AB` | Links |
| `--parliament-yellow` | `#FBCF20` | Focus states |
| `--parliament-red` | `#DE2E32` | Errors, incorrect answers |
| `--parliament-white` | `#FFFFFF` | Text on dark backgrounds |
| `--parliament-black` | `#0b0c0c` | Body text |
| `--parliament-grey-1` | `#F8F7F7` | Page background |
| `--parliament-grey-3` | `#CBC9CD` | Borders |
| `--parliament-grey-4` | `#717171` | Secondary text |

### GOV.UK overrides

The GOV.UK CSS custom properties are overridden to use Pugin colours:

- `--govuk-brand-colour` → Parliament purple
- `--govuk-link-colour` → Pugin link blue
- `--govuk-focus-colour` → Parliament yellow
- `--govuk-success-colour` → Commons Green
- `--govuk-error-colour` → Parliament red

## Focus states

Focus states follow the GDS pattern exactly:

### Links
- Yellow background (`#FBCF20`)
- Black 4px bottom border via box-shadow
- Black text
- No underline
- Meets WCAG 2.2 SC 1.4.11 Non-text contrast (AA) on any background

### Form inputs
- 3px yellow outline
- 2px inset black border

### Buttons
- Yellow background
- Black text
- 2px black bottom border

## Links

### Default links
- Blue (`#2B57AB`), underlined
- Hover: lighter blue (`#7592C8`), thicker underline
- Visited: purple (`#7C1389`)

### Links on dark backgrounds
Use `govuk-link--inverse` class:
- White text, white underline
- Hover: slightly transparent white

### Navigation links
Use `govuk-link--no-visited-state` to prevent visited purple showing on
navigation elements like breadcrumbs and header links.

## Page template

Every page follows this structure:

```html
<html lang="en" class="govuk-template">
<body class="govuk-template__body">
  <!-- Skip link -->
  <a href="#main-content" class="govuk-skip-link">Skip to main content</a>

  <!-- Parliament header (purple) -->
  <header class="parliament-header">...</header>

  <!-- Green accent bar -->
  <div class="parliament-accent-bar" aria-hidden="true"></div>

  <!-- Page title banner (white) -->
  <div class="parliament-banner">
    <div class="container">
      <h1>Page title</h1>
    </div>
  </div>

  <!-- Breadcrumbs (BEFORE main, on grey background) -->
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol class="breadcrumbs__list">...</ol>
    </nav>
  </div>

  <!-- Main content (grey background, white blocks) -->
  <main id="main-content" class="page-content page-content--grey">
    <div class="container">
      <div class="block block--accent">
        <!-- Content -->
      </div>
    </div>
  </main>

  <!-- Parliament footer (purple) -->
  <footer class="parliament-footer">...</footer>
</body>
</html>
```

### Key layout patterns

- **Container:** max-width 960px, 15px margins (30px on desktop)
- **Block:** white card on grey background, 18px padding (30px on desktop)
- **Block accent:** green 4px top border on primary content block
- **Breadcrumbs:** always before `<main>`, use `>` as separator

## Components

### Tags
- Use `<strong class="govuk-tag">` (not `<span>`)
- Tags are status indicators, never interactive
- Do not make tags into links or buttons
- Use adjectives (descriptive words) not verbs

### Buttons
- Primary: Commons Green with dark green shadow
- Text: sentence case, describe the action ("Start exercises")
- Use "Start" for primary entry points (matches GDS `govuk-button--start`)
- One primary button per page

### Pagination (section pages)
- GDS block style for content pages
- Stacked vertically: Previous/Next with section title
- "Back to chapter" link at bottom
- `rel="prev"` and `rel="next"` attributes

### Breadcrumbs
- Use `>` as separator (matching parliament.uk)
- Final item: `aria-current="page"`, not a link
- Always placed before `<main>`

## Content style

All user-facing text follows the GOV.UK Content Style Guide:

- **Sentence case** for headings (only capitalise first word + proper nouns)
- **Plain English** — short sentences, common words
- **Active voice** — address the user as "you"
- **"Start"** for primary actions (not "Begin" or "Commence")
- **"about"** for approximate figures (not "approximately")
- **No footnotes** on web pages (GDS: "designed for print, not web")
- **Explain abbreviations** on first use (except MP, UK)
- **Numbers:** spell out one to nine, numerals for 10+

## Accessibility checklist

- [x] Skip link on every page
- [x] Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`)
- [x] ARIA landmarks and labels
- [x] Focus states meet WCAG 2.2 SC 1.4.11 (non-text contrast)
- [x] Colour contrast meets WCAG 2.2 SC 1.4.3 (minimum, AA)
- [x] Keyboard navigable throughout
- [x] `lang="en"` on `<html>`
- [x] Breadcrumb `aria-current="page"` on active item
- [x] Pagination `rel="prev"` / `rel="next"`
- [x] `govuk-visually-hidden` for screen reader text
- [x] No information conveyed by colour alone

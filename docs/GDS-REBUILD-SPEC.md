# GDS Rebuild Specification

## Objective
Rebuild ALL pages using ONLY govuk-frontend component classes. No custom CSS for anything that govuk-frontend already provides. The app must look identical to any GOV.UK service.

## Rules
1. **ONLY use `govuk-*` classes** for layout, typography, buttons, forms, tags, lists, panels, etc.
2. **No custom `.btn`, `.container`, `.lead`, `.block`, `.tag` classes** — replace with govuk equivalents
3. **No custom padding/margin** — use `govuk-!-margin-*` and `govuk-!-padding-*` utility classes
4. **No custom typography** — use `govuk-heading-xl`, `govuk-heading-l`, `govuk-body`, `govuk-body-l`, etc.
5. Parliament overrides ONLY for: header colour (#373151), footer colour, accent bar, National font

## Component Mapping

### Layout (every page must use this)
```html
<div class="govuk-width-container">
  <a href="..." class="govuk-back-link">Back</a>
  <main class="govuk-main-wrapper" id="main-content">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <!-- content -->
      </div>
    </div>
  </main>
</div>
```

### Buttons
```html
<!-- Primary -->
<button class="govuk-button" data-module="govuk-button">Save and continue</button>

<!-- Secondary -->
<button class="govuk-button govuk-button--secondary" data-module="govuk-button">Try again</button>

<!-- Start button -->
<a href="..." class="govuk-button govuk-button--start" data-module="govuk-button">
  Start now
  <svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
  </svg>
</a>

<!-- Link styled as button -->
<a href="..." role="button" draggable="false" class="govuk-button" data-module="govuk-button">Continue</a>
```

### Task List (for module listings)
```html
<ul class="govuk-task-list">
  <li class="govuk-task-list__item govuk-task-list__item--with-link">
    <div class="govuk-task-list__name-and-hint">
      <a class="govuk-link govuk-task-list__link" href="#" aria-describedby="module-1-status">
        Naming a member
      </a>
      <div class="govuk-task-list__hint">Chapter 21 · 8 minutes</div>
    </div>
    <div class="govuk-task-list__status" id="module-1-status">
      <strong class="govuk-tag govuk-tag--blue">In progress</strong>
    </div>
  </li>
</ul>
```

### Tags (status indicators)
```html
<strong class="govuk-tag">Completed</strong>
<strong class="govuk-tag govuk-tag--blue">In progress</strong>
<strong class="govuk-tag govuk-tag--grey">Not started</strong>
```

### Radios (for answer choices — NOT custom buttons)
```html
<div class="govuk-form-group">
  <fieldset class="govuk-fieldset">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
      <h2 class="govuk-fieldset__heading">What should the member do?</h2>
    </legend>
    <div class="govuk-radios" data-module="govuk-radios">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="answer-1" name="answer" type="radio" value="a">
        <label class="govuk-label govuk-radios__label" for="answer-1">
          Option A text
        </label>
      </div>
      <!-- more items -->
    </div>
  </fieldset>
</div>
```

### Panel (for completion/results)
```html
<div class="govuk-panel govuk-panel--confirmation">
  <h1 class="govuk-panel__title">Module completed</h1>
  <div class="govuk-panel__body">Your score: 100%</div>
</div>
```

### Notification Banner (for feedback)
```html
<div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
  <div class="govuk-notification-banner__header">
    <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">Correct</h2>
  </div>
  <div class="govuk-notification-banner__content">
    <p class="govuk-body">Explanation text here</p>
  </div>
</div>
```

### Inset Text (for source quotes from Erskine May)
```html
<div class="govuk-inset-text">
  <p>Quote from Erskine May ¶21.24</p>
</div>
```

### Details (for expandable authority panel)
```html
<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">See the authority: Erskine May ¶21.24</span>
  </summary>
  <div class="govuk-details__text">
    <p>Source text here...</p>
  </div>
</details>
```

### Back Link
```html
<a href="..." class="govuk-back-link">Back</a>
```

### Breadcrumbs
```html
<div class="govuk-breadcrumbs">
  <ol class="govuk-breadcrumbs__list">
    <li class="govuk-breadcrumbs__list-item"><a class="govuk-breadcrumbs__link" href="/">Home</a></li>
    <li class="govuk-breadcrumbs__list-item" aria-current="page">Current page</li>
  </ol>
</div>
```

### Typography
- `govuk-heading-xl` — page title (h1)
- `govuk-heading-l` — section heading (h2)
- `govuk-heading-m` — subsection heading (h3)
- `govuk-heading-s` — small heading (h4)
- `govuk-body-l` — lead paragraph
- `govuk-body` — body text
- `govuk-body-s` — small text
- `govuk-caption-xl` — caption above heading

### Spacing
- `govuk-!-margin-top-6` (30px)
- `govuk-!-margin-bottom-6`
- `govuk-!-padding-top-4` (20px)
- Numbers: 0-9 (0=0px, 1=5px, 2=10px, 3=15px, 4=20px, 5=25px, 6=30px, 7=40px, 8=50px, 9=60px)

## Pages to Rebuild

1. **Dashboard** (`app/page.tsx`) — Two-thirds layout, task list for programmes
2. **Programme** (`app/programme/[slug]/ProgrammeClient.tsx`) — Task list for modules
3. **Module Learn** (`app/module/[id]/learn/ModuleLearnClient.tsx`) — Two-thirds, body text, details component
4. **Module Practice** (`app/module/[id]/practice/ModulePracticeClient.tsx`) — Radios for choices, notification banner for feedback
5. **Module Test** (`app/module/[id]/test/ModuleTestClient.tsx`) — Same as practice
6. **Module Summary** (`app/module/[id]/summary/ModuleSummaryClient.tsx`) — Panel for completion
7. **Library** (`app/library/page.tsx`) — Summary list or simple links
8. **Chapter** (`app/chapter/[number]/page.tsx`) — Two-thirds layout, body text
9. **Section** (`app/section/[id]/page.tsx`) — Two-thirds, pagination
10. **Train** (`app/train/[id]/page.tsx`) — Radios for choices
11. **Header** (`components/ParliamentHeader.tsx`) — Keep Parliament brand but use govuk-header structure
12. **Footer** (`components/ParliamentFooter.tsx`) — Use govuk-footer structure

## Parliament-only overrides (the ONLY custom CSS allowed)
1. Header background: `#373151` (Parliament purple)
2. Footer background: `#373151`
3. Accent bar: 4px green `#006E46` stripe
4. National font family override
5. Button colour override to Commons Green `#006E46` (instead of GDS green `#00703c`)
6. Focus colour override to Parliament Yellow `#FBCF20` (instead of GDS `#fd0`)

## Files to modify
- `styles/_parliament-overrides.scss` — strip down to ONLY the 6 items above
- `styles/main.scss` — stays as is
- All page/component files listed above

# Project Page Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll-reveal entrance animations and subtle parallax to the four project pages by enhancing the shared project layout components, so all pages gain layered/staggered motion with a single small diff.

**Architecture:** Work *with* the codebase's existing animation idiom rather than introducing Framer Motion `motion.div`/`animate`. Reveals are driven by `IntersectionObserver` (via `useInViewport`) toggling a `data-visible` attribute; CSS transitions/keyframes (the already-present `projectFadeSlide`) handle the actual motion, staggered with `--delay` custom properties. Parallax reuses the existing `useParallax(multiplier, onChange)` callback hook that sets a `--offset` CSS variable. Accessibility (`prefers-reduced-motion`) and SSR-safety come for free because all motion lives in `@media (--mediaUseMotion)` CSS and `data-*` attributes render identically on server and client.

**Tech Stack:** Remix, React, CSS Modules, existing `useInViewport` / `useParallax` hooks, `framer-motion`'s `useReducedMotion` (already a dependency).

---

## Deviation from the design spec (read first)

The approved spec (`docs/superpowers/specs/2026-06-16-project-page-animations-design.md`) proposed three new hooks returning Framer Motion `{ ref, controls }` and wrapping elements in `<motion.div animate={...}>`. After reading the actual code, that mechanism contradicts the established pattern (CSS-transition reveals keyed on `data-visible`, parallax via CSS `--offset`, stagger via `--delay`). Per the project's global rule "prefer editing existing patterns over inventing new structure; keep diffs minimal," this plan preserves the spec's **intent** (moderate engagement, layered stagger, hero/image parallax, mobile-aware, accessible, SSR-safe) but implements it idiomatically:

| Spec item | Plan realization |
|---|---|
| `useScrollReveal` hook | New `useScrollReveal` hook, but wraps existing `useInViewport` and returns `{ ref, visible }` (boolean), not Framer controls |
| `useParallax` (new) | Reuse the **existing** `useParallax(multiplier, onChange)` — do not duplicate |
| `useStaggeredText` (word-level split) | Dropped. Element-level stagger (heading → paragraphs → button) via CSS `:nth-child` `--delay`. Word-splitting is invasive to SSR/a11y and unnecessary for "moderate." |
| `motion.div` + `animate` per element | CSS `projectFadeSlide` keyframe (already defined) toggled by `data-visible` |
| Edit each of the 4 project pages | Edit the **shared layout components** they all compose; pages inherit animations with zero per-page edits |

**No test runner exists** in this repo (no `test` script; only Storybook). Verification is therefore done against the running dev server: inspecting server-rendered `data-visible` attributes with `curl`, and a Playwright snapshot to confirm reveal-on-scroll. This matches how the project was verified earlier in the session.

---

## File Structure

**Create:**
- `app/hooks/useScrollReveal.js` — convenience hook: owns a ref, runs `useInViewport` with a reveal-friendly `rootMargin`, returns `{ ref, visible }`. One responsibility: "tell me when this element has scrolled into view."

**Modify:**
- `app/hooks/index.js` — re-export `useScrollReveal`.
- `app/layouts/project/project.jsx` — add scroll-reveal to `ProjectTextRow` and `ProjectSectionColumns`; add gentle parallax to `ProjectImage`.
- `app/layouts/project/project.module.css` — add staggered reveal rules for `.textRow` / `.sectionColumns` children; add `--offset` parallax transform for `.image`.

**Unchanged (inherit animations automatically):**
- `app/routes/projects.workflowos/workflowos.jsx`
- `app/routes/projects.minecraft-panel/minecraft-panel.jsx`
- `app/routes/projects.mentorhub/mentorhub.jsx`
- `app/routes/projects.ai-memory/ai-memory.jsx`

---

## Task 1: Create the `useScrollReveal` hook

**Files:**
- Create: `app/hooks/useScrollReveal.js`
- Modify: `app/hooks/index.js`

- [ ] **Step 1: Create the hook**

Create `app/hooks/useScrollReveal.js`:

```js
import { useRef } from 'react';
import { useInViewport } from './useInViewport';

/**
 * Reveal-on-scroll helper. Owns an element ref and reports when that element
 * has scrolled into view (once — it unobserves after the first intersection).
 *
 * The `rootMargin` default fires the reveal slightly before the element is
 * fully on screen so the motion reads as "already happening" as it enters.
 *
 * @param {Object} [options]
 * @param {string} [options.rootMargin='0px 0px -10% 0px']
 * @returns {{ ref: import('react').RefObject, visible: boolean }}
 */
export function useScrollReveal({ rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const visible = useInViewport(ref, true, { rootMargin });

  return { ref, visible };
}
```

- [ ] **Step 2: Export it from the hooks barrel**

In `app/hooks/index.js`, add the export alphabetically after `useScrollToHash`:

```js
export * from './useFormInput';
export * from './useHasMounted';
export * from './useInterval';
export * from './useInViewport';
export * from './useParallax';
export * from './usePrevious';
export * from './useScrollReveal';
export * from './useScrollToHash';
export * from './useWindowSize';
```

- [ ] **Step 3: Verify the dev server compiles**

Run: `curl -s http://localhost:7777/projects/workflowos | grep -o '<title>[^<]*</title>'`
Expected: `<title>Projects | WorkflowOS</title>` (no Vite error overlay). If the dev server is not running, start it with `npm run dev` first.

- [ ] **Step 4: Commit**

```bash
git add app/hooks/useScrollReveal.js app/hooks/index.js
git commit -m "feat: add useScrollReveal hook for scroll-triggered reveals"
```

---

## Task 2: Add staggered scroll-reveal to `ProjectTextRow`

**Files:**
- Modify: `app/layouts/project/project.jsx` (the `ProjectTextRow` export, currently lines 160-180)
- Modify: `app/layouts/project/project.module.css` (the `.textRow` rule, currently lines 369-423)

`ProjectTextRow` wraps the prose blocks (heading + paragraphs) on every project page. We add reveal here so each row fades/slides up and its children stagger in.

- [ ] **Step 1: Add the hook import**

In `app/layouts/project/project.jsx`, the existing hooks import is:

```js
import { useParallax } from '~/hooks';
```

Change it to:

```js
import { useParallax, useScrollReveal } from '~/hooks';
```

- [ ] **Step 2: Wire reveal into `ProjectTextRow`**

Replace the entire current `ProjectTextRow` export (lines 160-180):

```js
export const ProjectTextRow = ({
  center,
  stretch,
  justify = 'center',
  width = 'm',
  noMargin,
  className,
  centerMobile,
  ...rest
}) => (
  <div
    className={classes(styles.textRow, className)}
    data-center={center}
    data-stretch={stretch}
    data-center-mobile={centerMobile}
    data-no-margin={noMargin}
    data-width={width}
    data-justify={justify}
    {...rest}
  />
);
```

with:

```js
export const ProjectTextRow = ({
  center,
  stretch,
  justify = 'center',
  width = 'm',
  noMargin,
  className,
  centerMobile,
  animate = true,
  ...rest
}) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      className={classes(styles.textRow, className)}
      data-center={center}
      data-stretch={stretch}
      data-center-mobile={centerMobile}
      data-no-margin={noMargin}
      data-width={width}
      data-justify={justify}
      data-animate={animate}
      data-visible={!animate || visible}
      ref={ref}
      {...rest}
    />
  );
};
```

Note: `data-visible={!animate || visible}` means when `animate` is false the row is always visible (opt-out escape hatch), otherwise it reveals on scroll.

- [ ] **Step 3: Add the staggered reveal CSS**

In `app/layouts/project/project.module.css`, find the `.textRow` rule (starts at line 369 with `.textRow {`). Immediately after its opening declarations and before its `@media (--mediaMobile)` block, the rule currently begins:

```css
  .textRow {
    align-self: center;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
```

Replace that opening with the following (adds the staggered-children reveal; the existing properties are preserved):

```css
  .textRow {
    align-self: center;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &[data-animate='true'] {
      @media (--mediaUseMotion) {
        & > * {
          opacity: 0;
        }

        &[data-visible='true'] > * {
          animation: projectFadeSlide 1.2s var(--bezierFastoutSlowin) both;
        }

        &[data-visible='true'] > *:nth-child(1) {
          animation-delay: 0ms;
        }

        &[data-visible='true'] > *:nth-child(2) {
          animation-delay: 100ms;
        }

        &[data-visible='true'] > *:nth-child(3) {
          animation-delay: 200ms;
        }

        &[data-visible='true'] > *:nth-child(4) {
          animation-delay: 300ms;
        }

        &[data-visible='true'] > *:nth-child(n + 5) {
          animation-delay: 400ms;
        }
      }
    }
```

(Leave the rest of the `.textRow` rule — the `@media (--mediaMobile)` block and all the `&[data-width=...]` / `&[data-justify=...]` selectors — exactly as they are.)

- [ ] **Step 4: Verify SSR renders the hidden state**

Run: `curl -s http://localhost:7777/projects/workflowos | grep -o 'data-animate="true" data-visible="false"' | head -1`
Expected: `data-animate="true" data-visible="false"` (proves the row server-renders in its pre-reveal state; IntersectionObserver flips it client-side).

- [ ] **Step 5: Verify reveal works in a real browser**

Use the Playwright MCP browser to navigate to `http://localhost:7777/projects/workflowos`, scroll down past the first `ProjectTextRow` ("The Challenge" heading), and take a snapshot. Expected: the heading + paragraph are visible (not opacity 0) after scrolling into view.

- [ ] **Step 6: Commit**

```bash
git add app/layouts/project/project.jsx app/layouts/project/project.module.css
git commit -m "feat: staggered scroll-reveal for project text rows"
```

---

## Task 3: Add scroll-reveal to `ProjectSectionColumns`

**Files:**
- Modify: `app/layouts/project/project.jsx` (the `ProjectSectionColumns` export, currently lines 182-188)
- Modify: `app/layouts/project/project.module.css` (the `.sectionColumns` rule, currently lines 425-439)

`ProjectSectionColumns` is the two-column "Platform Overview" / "The Solution" blocks. It is built on `ProjectSectionContent`. We give it the same reveal treatment as `ProjectTextRow`.

- [ ] **Step 1: Wire reveal into `ProjectSectionColumns`**

Replace the current `ProjectSectionColumns` export (lines 182-188):

```js
export const ProjectSectionColumns = ({ className, centered, ...rest }) => (
  <ProjectSectionContent
    className={classes(styles.sectionColumns, className)}
    data-centered={centered}
    {...rest}
  />
);
```

with:

```js
export const ProjectSectionColumns = ({ className, centered, animate = true, ...rest }) => {
  const { ref, visible } = useScrollReveal();

  return (
    <ProjectSectionContent
      className={classes(styles.sectionColumns, className)}
      data-centered={centered}
      data-animate={animate}
      data-visible={!animate || visible}
      ref={ref}
      {...rest}
    />
  );
};
```

- [ ] **Step 2: Confirm `ProjectSectionContent` forwards the ref**

`ProjectSectionContent` (lines 138-144) spreads `...rest` onto a plain `<div>`, so `ref` passes through to the DOM node. No change needed. (A plain function component receiving `ref` in `...rest` and spreading it onto a host element works because `ref` is passed as a normal prop here via `{...rest}` — verify the div receives it by checking the rendered DOM in Step 4. If React warns about `ref` in props, fall back to wrapping the columns in a `<div ref={ref}>` instead.)

> Implementation note for the worker: React does **not** pass `ref` through `...rest` on a normal function component — it intercepts it. Because `ProjectSectionContent` is a plain (non-`forwardRef`) component, the cleaner approach is to wrap, not pass `ref` down. Use this version instead of Step 1's if you prefer certainty:
>
> ```js
> export const ProjectSectionColumns = ({ className, centered, animate = true, ...rest }) => {
>   const { ref, visible } = useScrollReveal();
>
>   return (
>     <div ref={ref} data-animate={animate} data-visible={!animate || visible} className={styles.columnsReveal}>
>       <ProjectSectionContent
>         className={classes(styles.sectionColumns, className)}
>         data-centered={centered}
>         {...rest}
>       />
>     </div>
>   );
> };
> ```
>
> If you use the wrapper version, the CSS in Step 3 must target `.columnsReveal` instead of `.sectionColumns`. Pick ONE approach and keep the CSS selector consistent with it. The wrapper version is recommended for correctness.

- [ ] **Step 3: Add the reveal CSS**

In `app/layouts/project/project.module.css`, if you used the **wrapper version** (recommended), add a new rule after the `.sectionColumns` rule (after line 439's closing `}`):

```css
  .columnsReveal {
    &[data-animate='true'] {
      @media (--mediaUseMotion) {
        & .sectionColumns > * {
          opacity: 0;
        }

        &[data-visible='true'] .sectionColumns > * {
          animation: projectFadeSlide 1.2s var(--bezierFastoutSlowin) both;
        }

        &[data-visible='true'] .sectionColumns > *:nth-child(1) {
          animation-delay: 0ms;
        }

        &[data-visible='true'] .sectionColumns > *:nth-child(2) {
          animation-delay: 120ms;
        }

        &[data-visible='true'] .sectionColumns > *:nth-child(n + 3) {
          animation-delay: 240ms;
        }
      }
    }
  }
```

- [ ] **Step 4: Verify in browser**

Use the Playwright MCP browser to navigate to `http://localhost:7777/projects/ai-memory` and scroll to "The Solution: Unified Memory" (a `ProjectSectionColumns` block). Snapshot and confirm both columns are visible after scrolling in.

- [ ] **Step 5: Commit**

```bash
git add app/layouts/project/project.jsx app/layouts/project/project.module.css
git commit -m "feat: scroll-reveal for project section columns"
```

---

## Task 4: Add subtle parallax to `ProjectImage`

**Files:**
- Modify: `app/layouts/project/project.jsx` (the `ProjectImage` export, currently lines 132-136)
- Modify: `app/layouts/project/project.module.css` (the `.image` rule, currently lines 327-333)

The inner `Image` already does an accent-bar reveal sweep on scroll-in. We add a gentle vertical parallax to the image container for depth, reusing the existing `useParallax` hook exactly as `ProjectBackground` does (lines 106-130), but with a much smaller multiplier so content images drift subtly rather than dramatically.

- [ ] **Step 1: Add parallax to `ProjectImage`**

Replace the current `ProjectImage` export (lines 132-136):

```js
export const ProjectImage = ({ className, alt, ...rest }) => (
  <div className={classes(styles.image, className)}>
    <Image reveal alt={alt} delay={300} {...rest} />
  </div>
);
```

with:

```js
export const ProjectImage = ({ className, alt, ...rest }) => {
  const imageRef = useRef();

  useParallax(0.04, value => {
    if (!imageRef.current) return;
    imageRef.current.style.setProperty('--offset', `${value}px`);
  });

  return (
    <div className={classes(styles.image, className)} ref={imageRef}>
      <Image reveal alt={alt} delay={300} {...rest} />
    </div>
  );
};
```

(`useRef` is already imported on line 9: `import { forwardRef, useRef } from 'react';` — no import change needed. `0.04` is a deliberately small multiplier; `ProjectBackground` uses `0.6`.)

- [ ] **Step 2: Apply the offset in CSS, motion-gated**

In `app/layouts/project/project.module.css`, replace the `.image` rule (lines 327-333):

```css
  .image {
    position: relative;
    display: grid;
    transform: translate3d(0, 0, 0);
    max-width: 100%;
    width: 100%;
  }
```

with:

```css
  .image {
    position: relative;
    display: grid;
    transform: translate3d(0, 0, 0);
    max-width: 100%;
    width: 100%;
    will-change: transform;

    @media (--mediaUseMotion) {
      transform: translate3d(0, var(--offset, 0), 0);
    }
  }
```

(The `--offset` defaults to `0` until `useParallax` sets it. `useParallax` already no-ops when `prefers-reduced-motion` is set, and the transform is additionally gated behind `@media (--mediaUseMotion)`, so reduced-motion users get a static image.)

- [ ] **Step 3: Verify no layout breakage**

Run: `curl -s http://localhost:7777/projects/mentorhub | grep -o '<title>[^<]*</title>'`
Expected: `<title>Projects | MentorHub</title>` (compiles cleanly, no error overlay).

- [ ] **Step 4: Verify parallax in browser**

Use the Playwright MCP browser: navigate to `http://localhost:7777/projects/mentorhub`, evaluate `getComputedStyle(document.querySelector('[class*="image"]')).transform` before and after scrolling. Expected: the `matrix(...)` translateY component changes after scroll (proving the offset applies). Confirm visually the image does not overlap adjacent content.

- [ ] **Step 5: Commit**

```bash
git add app/layouts/project/project.jsx app/layouts/project/project.module.css
git commit -m "feat: subtle parallax drift on project images"
```

---

## Task 5: Full-page verification across all four projects

**Files:** none (verification only)

- [ ] **Step 1: Confirm every project page compiles**

Run:

```bash
for r in workflowos minecraft-panel mentorhub ai-memory; do
  echo "== $r =="
  curl -s "http://localhost:7777/projects/$r" | grep -o '<title>[^<]*</title>' | head -1
done
```

Expected: each prints its `Projects | <Name>` title with no `Error` title.

- [ ] **Step 2: Reduced-motion smoke check**

Use the Playwright MCP browser with reduced motion emulated (navigate, then evaluate). Confirm that with `prefers-reduced-motion: reduce`, text rows are visible (not stuck at opacity 0) and images carry no parallax transform. Because reveal opacity is gated behind `@media (--mediaUseMotion)`, reduced-motion users should see fully-visible content immediately.

> If reduced-motion users ever see opacity:0 stuck content, that's a bug: the `& > * { opacity: 0 }` rule must live **inside** the `@media (--mediaUseMotion)` block (as written in Task 2 Step 3 and Task 3 Step 3). Re-check those blocks.

- [ ] **Step 3: Mobile viewport check**

Use the Playwright MCP browser at a 390px-wide viewport on `http://localhost:7777/projects/workflowos`. Confirm reveals still fire and layout is intact. (Parallax naturally diminishes at small scroll ranges; no separate mobile gating needed since the multiplier is tiny and motion-gated.)

- [ ] **Step 4: Final commit (if any verification fixes were made)**

```bash
git add -A
git commit -m "test: verify project page animations across all routes and reduced-motion"
```

---

## Self-Review Notes

- **Spec coverage:** hero parallax (already present via `ProjectBackground`, unchanged), image parallax (Task 4), staggered text reveal (Tasks 2–3), section reveals (Tasks 2–3), accessibility/reduced-motion (CSS `@media (--mediaUseMotion)` throughout + `useParallax`'s built-in guard), SSR-safety (data-attributes + Task 2 Step 4 server-render check), mobile (Task 5 Step 3). Buttons/dividers within text rows are covered as `:nth-child` children of `ProjectTextRow`.
- **Dropped from spec (with reason):** word-level `useStaggeredText` (a11y/SSR cost, not needed for "moderate"); duplicate `useParallax`/Framer `motion.div` mechanism (codebase already provides idiomatic equivalents).
- **Type/name consistency:** `useScrollReveal()` returns `{ ref, visible }` and is used identically in Tasks 2 and 3. `useParallax(multiplier, onChange)` matches the existing signature used by `ProjectBackground`.
- **Known sharp edge flagged in-plan:** passing `ref` through a non-`forwardRef` `ProjectSectionContent` — Task 3 Step 2 gives the recommended wrapper version to avoid it.

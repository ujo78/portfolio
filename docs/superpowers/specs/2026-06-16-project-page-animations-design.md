# Project Page Animations & Scroll Effects Design

**Date:** 2026-06-16  
**Status:** Approved  
**Scope:** Enhance WorkflowOS, Craftboard, MentorHub, and AI Memory Vault project pages with moderate, engaging animations

---

## Overview

Add layered, staggered animations to project pages using Framer Motion + custom hooks. Animations combine:
- **Intersection Observer triggers** for entrance animations
- **Scroll-driven parallax** for depth on hero/image sections
- **Staggered text reveals** for narrative flow
- **Subtle interactive effects** on buttons and dividers

Target: Moderate engagement level, professional aesthetic, full accessibility.

---

## Goals & Success Criteria

✅ All elements (hero, images, text, buttons, dividers) animated  
✅ Layered & staggered aesthetic (50-100ms between elements)  
✅ Smooth parallax on hero/image sections (8-15px shifts)  
✅ Mobile-optimized (no parallax on <768px screens)  
✅ SSR-safe (client-side only, no server-rendered transforms)  
✅ Accessible (respects `prefers-reduced-motion`, no semantic changes)  
✅ Performant (GPU-accelerated, debounced scroll, lazy initialization)  
✅ Non-breaking changes to existing components

---

## Animation Architecture

### Core Hooks to Create

#### 1. `useScrollReveal`
**Purpose:** Trigger entrance animations when element enters viewport  
**Behavior:**
- Returns `{ ref, controls }` tuple for Framer Motion integration
- Accepts props: `delay`, `duration`, `variant`
- Variants: `'fadeIn'`, `'slideUp'`, `'scaleUp'` (default: `'slideUp'`)
- Manages Intersection Observer internally
- Supports `delayChildren` for staggered child animations

**Example:**
```jsx
const controls = useScrollReveal({ delay: 0.2, variant: 'slideUp' });
<motion.div ref={controls.ref} animate={controls.controls}>...</motion.div>
```

#### 2. `useParallax`
**Purpose:** Apply scroll-driven depth parallax to elements  
**Behavior:**
- Tracks scroll position and applies `transform: translateY()`
- Accepts prop: `intensity` (0-30px range, default: 10px)
- Auto-disables on mobile (<768px)
- Respects `prefers-reduced-motion`
- Debounces scroll events at 60fps (16ms)

**Example:**
```jsx
const parallaxProps = useParallax({ intensity: 15 });
<motion.img {...parallaxProps} src={heroImage} />
```

#### 3. `useStaggeredText`
**Purpose:** Reveal text word-by-word or line-by-line with stagger  
**Behavior:**
- Splits text into words or lines
- Returns animated variants with stagger delays
- Accepts props: `mode` ('words' | 'lines'), `delayMs` (default: 50-100ms)
- Pairs with `useScrollReveal` for entry trigger

**Example:**
```jsx
const textVariants = useStaggeredText({ mode: 'words', delayMs: 75 });
<motion.h1 variants={textVariants}>Hero Headline</motion.h1>
```

### Hook File Structure
```
app/hooks/
├── useScrollReveal.js       (new)
├── useParallax.js           (new)
├── useStaggeredText.js      (new)
└── (existing hooks unchanged)
```

---

## Animations Per Element Type

### Hero Section (ProjectHeader + ProjectBackground)
**Background Image:**
- Animation: `useParallax(intensity: 15px)` + fade-in
- Duration: 0.6s entrance, continuous parallax on scroll
- Easing: `easeOut` for entrance

**Title (ProjectSectionHeading):**
- Animation: `useScrollReveal('slideUp')` + `useStaggeredText('words')`
- Duration: 0.6s entrance
- Stagger: 75ms between words
- Delay: 0ms (first element)

**Description (ProjectSectionText):**
- Animation: `useScrollReveal('slideUp')`
- Duration: 0.6s
- Delay: 0.3s (after title)

**Role Tags:**
- Animation: `useScrollReveal('fadeIn')`
- Duration: 0.4s
- Delay: 0.5s

### Project Images (ProjectImage)
**Container:**
- Animation: `useScrollReveal('slideUp')`
- Duration: 0.6s
- Easing: `easeOut`

**Image Element:**
- Animation: Scale on reveal (1 → 1.05) for depth
- Parallax: `useParallax(intensity: 8px)` within section
- Duration: 0.6s

### Text Content Sections (ProjectSectionText)
**Each Paragraph:**
- Animation: `useScrollReveal('slideUp')` + optional word stagger
- Duration: 0.6s
- Stagger: 100ms between paragraphs
- Delay: Incremental per paragraph position

**Headings (ProjectSectionHeading):**
- Animation: `useScrollReveal('slideUp')` + `useStaggeredText('lines')`
- Duration: 0.6s
- Stagger: 75ms between lines
- Delay: 0ms (reveals before text)

### Section Dividers & Backgrounds
**Dividers:**
- Animation: Scale + opacity (0 → 1)
- Duration: 0.5s
- Easing: `easeOut`

**Section Backgrounds:**
- Animation: `useParallax(intensity: 3px)` (subtle)
- Purpose: Adds depth without distraction

### Buttons & Interactive Elements
**Button (ProjectButton, CTA links):**
- Animation: `useScrollReveal('fadeIn')` + scale (0.95 → 1)
- Duration: 0.5s
- Delay: Staggered after text content

**Hover State:**
- Transform: `translateY(-2px)`
- Box-shadow: Increase depth
- Duration: 0.2s

### Footer
**Footer Content:**
- Animation: `useScrollReveal('slideUp')`
- Duration: 0.6s
- Parallax: None (grounded feel)

---

## Animation Timing Defaults

| Element Type | Duration | Delay | Stagger | Variant |
|---|---|---|---|---|
| Entrance (heading/image) | 0.6s | Per section | N/A | slideUp |
| Text paragraphs | 0.6s | 0.1s increments | 100ms | slideUp |
| Staggered text (words) | 0.6s | Per section | 75ms | opacity |
| Buttons | 0.5s | Per section | 50ms | fadeIn |
| Parallax (hero) | N/A | N/A | N/A | 15px |
| Parallax (images) | N/A | N/A | N/A | 8px |

**Easing Defaults:**
- Entrance: `easeOut` (cubic-bezier(0.16, 1, 0.3, 1))
- Parallax: Linear (smooth, continuous)
- Interactive: `easeInOut` (0.2s for hover states)

---

## Component Integration Strategy

### Modified Components

#### `ProjectImage` Component
**New Props:**
- `useParallax?: boolean` (default: true for hero images, false for content images)
- `parallaxIntensity?: number` (default: 8)

**Internal Changes:**
```jsx
const ProjectImage = ({ useParallax, parallaxIntensity = 8, ...props }) => {
  const parallaxProps = useParallax ? useParallax({ intensity: parallaxIntensity }) : {};
  const controls = useScrollReveal();
  
  return (
    <motion.div ref={controls.ref} animate={controls.controls}>
      <motion.img {...parallaxProps} {...props} />
    </motion.div>
  );
};
```

#### `ProjectSectionHeading` Component
**Internal Changes:**
- Auto-wrap with `useScrollReveal` + `useStaggeredText` internally
- No prop changes needed (backwards compatible)

#### `ProjectSectionText` Component
**Internal Changes:**
- Auto-wrap with `useScrollReveal`
- Stagger multiple `ProjectSectionText` elements via parent key

### Updated Project Pages

Each project page (e.g., `workflowos.jsx`) receives:
- Minimal code additions (just prop passes)
- No JSX restructuring required
- All animation logic moved to hooks/components

**Example Change:**
```jsx
// Before
<ProjectImage srcSet={sprBuilderDark} width={1280} height={800} />

// After (no change needed - component handles it internally)
<ProjectImage srcSet={sprBuilderDark} width={1280} height={800} parallaxIntensity={8} />
```

### Project Pages to Update
1. `app/routes/projects.workflowos/workflowos.jsx`
2. `app/routes/projects.minecraft-panel/minecraft-panel.jsx`
3. `app/routes/projects.mentorhub/mentorhub.jsx`
4. `app/routes/projects.ai-memory/ai-memory.jsx`

---

## Performance Optimizations

### GPU Acceleration
- **Transforms Only:** All animations use `transform` and `opacity` (not layout properties)
- **Framer Motion Optimization:** Automatic hardware acceleration via `will-change`
- **Target FPS:** Smooth 60fps on modern devices, 30fps degradation on mobile

### Scroll Event Handling
- **Parallax Debounce:** 16ms (60fps) debounce on scroll listener
- **Intersection Observer:** Native API (no polling), triggers once per entry/exit
- **Lazy Initialization:** Hooks only activate when ref is mounted

### Memory Management
- **Cleanup:** All event listeners removed on component unmount
- **Ref Management:** Intersection Observer disconnected on unmount
- **No Global State:** All animations scoped to component level

### Mobile Optimization
- **Parallax Disabled:** Screens < 768px (tablet and smaller)
- **Reduced Animations:** On `prefers-reduced-motion`, parallax disabled, entrances subtle
- **Touch Scroll:** Native scroll performance unaffected

---

## Accessibility

### Respects User Preferences
- **prefers-reduced-motion:** Checks media query, disables parallax, keeps subtle entrances
- **High Contrast Mode:** No animation reduces contrast ratios
- **Focus Visible:** Keyboard navigation unaffected

### Semantic & Structure
- **No DOM Changes:** All animations are CSS/transform only
- **Text Remains Readable:** No animation obscures content
- **Screen Readers:** Content accessible (animations are presentational)

### Testing Approach
- Add `data-testid` to animated elements for E2E verification
- Test parallax disabled on mobile viewports
- Test `prefers-reduced-motion` support with browser DevTools

---

## Browser Support

- **Modern Browsers:** Chrome 51+, Firefox 55+, Safari 12.1+, Edge 16+
- **Intersection Observer:** Polyfill in `package.json` if needed (not currently required)
- **CSS Transforms:** Universal support (IE 10+)
- **Framer Motion:** Handles graceful degradation automatically

---

## Implementation Phases

### Phase 1: Core Hooks
- Create `useScrollReveal.js`
- Create `useParallax.js`
- Create `useStaggeredText.js`
- Test hooks in isolation with Storybook

### Phase 2: Component Integration
- Update `ProjectImage` component
- Update `ProjectSectionHeading` component
- Update `ProjectSectionText` component
- Backwards compatibility verified

### Phase 3: Project Pages
- Update `workflowos.jsx` with parallax intensity props
- Update `minecraft-panel.jsx`
- Update `mentorhub.jsx`
- Update `ai-memory.jsx`

### Phase 4: Testing & Polish
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS Safari, Android Chrome)
- Accessibility audit (`prefers-reduced-motion`, focus states)
- Performance profiling (DevTools Performance tab)

### Phase 5: Deployment
- Dev server test (all animations working)
- Production build test (animations still smooth)
- Commit with design doc

---

## Success Metrics

✅ All 4 project pages load with smooth animations  
✅ Parallax disabled on mobile (<768px)  
✅ 60fps on desktop, no layout shift jank  
✅ Entrance animations play on scroll-in  
✅ Staggered text reveals word-by-word  
✅ `prefers-reduced-motion` respected  
✅ No console errors or warnings  
✅ Keyboard navigation unaffected  
✅ Screen reader content unchanged  

---

## Dependencies & Notes

- **No new packages:** Uses existing Framer Motion + native Intersection Observer
- **SSR Safe:** All animations client-side only
- **Remix Compatible:** No friction with Server-Side Rendering
- **Mobile First:** Graceful degradation on lower-end devices
- **Future Extensible:** Hooks can be reused on other pages (home, articles, etc.)

---

## Design Decisions & Rationale

**Why Hooks Over Wrapper Component?**
- Granular control per element (needed for staggered animations)
- Easier to test in isolation
- Aligns with Remix/React patterns
- Less overhead (no wrapper re-renders)

**Why Intersection Observer + Scroll-Driven?**
- Hybrid approach gives best of both worlds
- Intersection Observer is performant (native browser API)
- Scroll-driven parallax adds depth without complexity
- Fallback to entrance animation if scroll tracking fails

**Why Respect prefers-reduced-motion?**
- Accessibility requirement for vestibular issues
- Small code addition, big inclusivity win
- Modern browser standard (90%+ support)

**Why No SVG Morphing or 3D Rotations?**
- Moderate engagement goal (not bold/creative)
- Reduces complexity, keeps focus on content
- Maintains professional portfolio aesthetic
- Easier to maintain and debug

---

## Files to Create
- `app/hooks/useScrollReveal.js`
- `app/hooks/useParallax.js`
- `app/hooks/useStaggeredText.js`

## Files to Modify
- `app/components/image/image.jsx` (ProjectImage)
- `app/components/heading/heading.jsx` (ProjectSectionHeading)
- `app/components/text/text.jsx` (ProjectSectionText)
- `app/routes/projects.workflowos/workflowos.jsx`
- `app/routes/projects.minecraft-panel/minecraft-panel.jsx`
- `app/routes/projects.mentorhub/mentorhub.jsx`
- `app/routes/projects.ai-memory/ai-memory.jsx`

---

## Next Steps
1. User reviews this design doc
2. Invoke `writing-plans` to create detailed implementation plan
3. Execute plan with phase-based approach
4. Test on dev server, deploy when verified

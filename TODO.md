# UI/UX improvement plan

Findings from the desktop UI/UX review. Preserve the existing static-site
architecture, course content, and interactive lesson behavior.

## P0 — Correctness and accessibility

- [x] Map each inspectable diagram component to its own relevant explanation
  instead of selecting a lesson point by its position. Provide an honest
  fallback when a component has no dedicated explanation. (`app.js`)
  All current lessons have component-specific descriptions; unknown components
  still use the fallback.
- [x] Make Pause stop both SVG and CSS animations; resume both consistently.
- [x] Respect `prefers-reduced-motion` across the entire scene, including
  animated paths, particles, highlights, and transitions.
- [ ] Announce step changes to screen readers without excessive repeated
  announcements; verify focus remains useful during navigation.
- [ ] Prevent global keyboard shortcuts from interfering with focused
  interactive controls, especially Space on buttons.

## P1 — Diagram readability and visual consistency

- [ ] Frame each step around its visible content, including labels and
  decorations, with safe space for the caption and controls.
- [ ] Avoid abrupt changes in diagram scale between consecutive steps; honor
  reduced-motion preferences if transitions are added.
- [ ] Keep labels legible in dense scenes and prevent collisions with paths,
  neighboring components, and scene controls.
- [ ] Define consistent diagram tokens for colors, outlines, corner radii,
  depth, shadows, badges, and active/failure states.
- [ ] Apply the visual system to all shared shapes and bespoke scenes, while
  preserving the cyberpunk theme and clear contrast.
- [ ] Verify diagram component inspection and keyboard access after visual
  changes.

## P1 — Responsive layout and navigation

- [ ] Test desktop, tablet, and mobile layouts, including narrow screens and
  200%/400% zoom; fix clipping, overlap, and horizontal overflow where found.
- [ ] Audit the mobile course menu: keyboard access, Escape to close, focus
  management, background interaction, and returning focus to its trigger.
- [ ] Check touch target sizes and spacing, especially the detail close button,
  traffic slider, timeline, and scene controls.
- [ ] Improve the visual hierarchy so the active scene and step explanation
  take precedence over secondary metrics and controls.

## P2 — Learning flow and polish

- [ ] Add a clear no-results state and a way to clear lesson search.
- [ ] Decide and communicate what marks a lesson complete; avoid implying that
  jumping to the last step proves the full lesson was viewed.
- [ ] Align the theme toggle's accessible name and state with its behavior:
  either offer a true light theme or describe the alternative color palette.
- [ ] Review small text and color contrast in both palettes, including SVG
  labels, inactive states, and focus indicators.
- [ ] Review keyboard shortcut discoverability and ensure on-screen hints match
  actual behavior.

## Verification

- [ ] Test representative early, dense, failure, and bespoke scenes across
  multiple lessons.
- [ ] Test navigation, search, progress, theme switching, replay, pause,
  failure simulation, traffic control, and component inspection.
- [ ] Run keyboard-only and screen-reader checks, reduced-motion checks, and a
  contrast/accessibility audit; record results and remaining limitations.
- [ ] Run `node --test diagram-viewport.test.js` and add regression coverage
  for changed behavior.

## Review limitations

The original review included a desktop browser inspection and source review.
It did not establish WCAG compliance or independently test mobile layouts,
screen readers, all lessons, or every interaction.

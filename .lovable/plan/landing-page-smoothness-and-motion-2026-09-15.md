# Landing Page Smoothness and Motion

## Goal
Make the current XRounder landing page feel smoother and more polished without changing its content, structure, or brand identity.

## Changes
- Add a staggered entrance for the headline, supporting copy, actions, trust points, and product preview.
- Reveal major sections and repeated cards progressively as they enter the screen.
- Add restrained lift, icon, arrow, and selection transitions to interactive cards and controls.
- Smooth the learning-loop and quiz-demo content changes without slowing interaction.
- Preserve instant tap feedback and disable non-essential movement when reduced motion is requested.
- Check desktop and phone layouts for overflow, overlap, and browser errors.

## Technical details
- Reuse the existing semantic colors and animation utilities in the global design system.
- Use CSS-driven animation and existing React state; no new dependencies or data changes.
- Keep motion transform/opacity-based for reliable performance on phones.

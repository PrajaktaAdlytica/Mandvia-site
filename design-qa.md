# Mandvia Cinematic Homepage Design QA

## Evidence

- Source brief: `/Users/prajaktagaikwad/.codex/attachments/d00402c0-21e6-4ca0-9e8f-24eb351e6523/pasted-text.txt`
- Source motion: five supplied CloudFront MP4s, each opened and visually inspected before implementation
- Implementation: `http://127.0.0.1:4173/`
- Desktop capture: `qa/cinematic-home-desktop.png`
- Mobile capture: `qa/cinematic-home-mobile.png`
- Combined source frame and implementation: `qa/source-vs-cinematic-home.jpg`
- Data story captures: `qa/data-lifecycle-desktop.jpg`, `qa/spend-boundary-desktop.jpg`, `qa/evidence-ledger-desktop.jpg`
- Mobile data captures: `qa/spend-boundary-mobile.jpg`, `qa/evidence-ledger-mobile.jpg`
- New narrative sections, desktop: `qa/problem-desktop.jpg`, `qa/solution-desktop.jpg`, `qa/testimonials-desktop.jpg`, `qa/pricing-desktop.jpg`
- New narrative sections, mobile: `qa/problem-mobile.jpg`, `qa/solution-mobile.jpg`, `qa/testimonials-mobile.jpg`, `qa/pricing-mobile.jpg`
- Navigation, desktop: `qa/navigation-home-desktop.png`, `qa/navigation-product-menu-desktop.png`
- Navigation, mobile: `qa/navigation-home-mobile.png`, `qa/navigation-product-menu-mobile.png`
- Product routes: `qa/product-wallet-desktop.png`, `qa/product-policy-desktop.png`, `qa/product-ledger-desktop.png`, `qa/product-wallet-mobile.png`
- Company routes: `qa/page-security-desktop.png`, `qa/page-pricing-desktop.png`, `qa/page-company-desktop.png`
- Conversion routes: `qa/page-signin-desktop.png`, `qa/page-demo-desktop.png`
- Mandate instrument, desktop: `qa/mandate-instrument-identity-desktop.png`, `qa/mandate-instrument-policy-desktop.png`, `qa/mandate-instrument-evidence-desktop.png`
- Mandate instrument, mobile: `qa/mandate-instrument-identity-mobile.png`, `qa/mandate-instrument-policy-mobile.png`
- Footer: `qa/footer-desktop.png`, `qa/footer-mobile.png`
- Legal: `qa/privacy-page-desktop.png`

## Visual Comparison

The combined image confirms that the implementation preserves the supplied source's black cinematic field, cosmic human imagery, central editorial composition, restrained serif scale, liquid-glass controls, and high-contrast interface treatment. Mandvia's own copy, mint authorization signal, coral-to-mint route line, approved wordmark, and payment-control product model replace the unrelated agency identity from the recreation prompt.

- Typography: Instrument Serif carries the narrative statements; IBM Plex Sans keeps controls and evidence records legible.
- Composition: the hero remains full-viewport and video-led, with a contained conversion path and a separate live authority status.
- Motion: hero playback uses the specified fade/restart behavior; section reveals and media movement respond to scroll.
- Product clarity: Wallet, Policy, and Ledger each receive a distinct film card and a direct product route.
- Brand: the approved traced Mandvia wordmark is used without font substitution. Its reversed SVG now has a transparent field.
- Responsive behavior: tested at 1440 x 1024 and 390 x 844 with no horizontal overflow.

## Interaction Checks

- Hero email submission changes to a confirmed success icon.
- Product dropdown opens and exposes Wallet, Policy, and Ledger.
- Mobile navigation opens above page media with readable links and a clear demo CTA.
- Product, Ledger, and demo links use existing application routes.
- All five videos reached ready state 4 during browser verification.
- Desktop and mobile layouts retain readable text, contained status cards, and unobscured controls.
- Browser console contains no warnings or errors.
- The header hides on downward scroll and returns immediately when the user reverses direction.
- Active route states, desktop Product disclosure, and the mobile menu were verified through their real controls.
- The mobile Product drawer is constrained to the viewport and remains internally scrollable when content grows.
- Demo workflow selection advances to the correct second step with the chosen use case preserved in the copy.

## Shared Navigation And Routes

- The homepage, product, security, pricing, and company routes now share the same dark glass navigation, approved inverse wordmark, route signal, active state, and demo CTA.
- Wallet presents an agent allocation console, Policy presents a live rule decision, and Ledger presents an evidence timeline instead of repeating a generic product visual.
- Security uses an authority-boundary system view, Pricing uses an illustrative operating model, and Company uses a Poland / European Union origin panel with intent, authority, and evidence principles.
- Sign-in remains a focused passwordless access page; Demo remains a distinct two-step qualification flow. Both preserve the Mandvia brand without forcing the full marketing navigation into conversion tasks.
- Responsive verification covered 1440 x 1024 and 390 x 844. No horizontal overflow was detected.

## Mandate Instrument Visual Chapter

- The three supplied Mandvia industrial compositions were converted into measured focal assets rather than embedded as full webpage screenshots.
- The custodian device represents per-agent identity, the aperture represents executable policy, and the authorization rail represents the attached evidence path.
- A light, pinned chapter translates vertical scroll into a three-panel horizontal sequence between the solution console and the transaction film.
- Original obsolete navigation and "pilot" wording are excluded from the visible crops.
- Desktop and mobile states keep the imagery legible, preserve the surrounding cinematic storyline, and introduce no horizontal document overflow.

## Footer And Legal Trust Layer

- Homepage and secondary-page footers now include Warsaw, Poland / European Union operating location, direct email, Product, Company, Access, and Legal navigation.
- LinkedIn, X, and GitHub icons use accessible names and native hover titles. They remain intentionally non-clicking until official Mandvia profile URLs are confirmed.
- Service status and EU operating-requirement signals are visible without overstating certifications or inventing registration details.
- Privacy and Terms links resolve to complete branded routes rather than placeholders.
- Footer layouts were verified at 1440 x 1024 and 390 x 844 with no horizontal overflow.

## Data Story Integration

- The feature film now reveals intent, identity, policy, receipt, and settlement as one connected lifecycle.
- The spending-boundary chart animates requested and settled spend against a visible €250 policy line.
- The evidence record now behaves as a real ledger table with timestamp, event, actor, proof, and verification state.
- These additions preserve the original video order, dark cinematic palette, liquid-glass treatment, vertical scroll direction, and editorial typography.
- Recharts supplies the graphing engine; the visual layer uses Mandvia's existing coral, mint, frost, and ink tokens.

## Extended Narrative Sections

- Problem: a full-viewport pinned chapter translates vertical scroll into a horizontal sequence of identity, policy, evidence, and control failures. The rail stays pinned for its complete range and cards lift on hover.
- Solution: a sticky Mandvia console changes from Wallet to Policy to Ledger as the corresponding explanation enters the viewport.
- Testimonials: representative design-partner perspectives stack as sticky inspection records on desktop and become a readable vertical sequence on mobile. The section explicitly states that customer-approved quotes must replace these perspectives after design-partner sessions.
- Pricing: Demo, Scale, and Platform plans reveal from different directions, expose structured commercial dimensions, and provide hover-responsive CTAs without inventing public card-processing fees.
- All four sections use distinct motion and information structures while retaining the existing cinematic videos, typography, glass treatment, and vertical narrative direction.

## Fixes During QA

- Removed the background rectangle from the reversed wordmark so it sits naturally in the glass navigation.
- Corrected the authority status card's positioning specificity; it no longer compresses or overlaps the mobile hero.
- Increased the fixed header's dark glass density for contrast over both video and mint sections.
- Corrected the mobile menu's clipping and stacking, then gave the panel a dark cinematic surface.
- Constrained the expanded mobile Product navigation to the available viewport and compacted its supporting links so the demo action remains visible.
- Removed guessed social destinations after the LinkedIn handle returned 404 and the GitHub handle resolved to an unverified account; the icons now communicate that official profiles are forthcoming.

## Final Release QA

- Production build: passed.
- Sites worker and packaging tests: 4 passed, 0 failed.
- Route sweep: 11 routes passed at 1440 x 1024 and 390 x 844.
- All routes expose their expected primary heading and no route creates document-level horizontal overflow.
- Homepage media: all six video elements reached ready state 4 with no playback errors.
- Conversion paths: homepage email confirmation, passwordless sign-in confirmation, workflow selection, transaction-value selection, and the complete two-step demo request were verified through their real controls.
- Navigation: desktop Product disclosure and the nested mobile Product drawer were verified; the mobile drawer remains contained and internally scrollable.
- Browser console: no warnings or errors in a fresh final session.
- Residual performance note: the production JavaScript bundle is approximately 948 kB minified and triggers Vite's 500 kB advisory. This is non-blocking, but route-level code splitting should be scheduled before traffic scales.

## Result

No actionable P0, P1, or P2 visual, routing, or interaction issues remain. One P3 bundle-size optimization remains.

final result: passed

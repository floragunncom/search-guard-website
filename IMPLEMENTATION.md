# Homepage Redesign — Implementation Package

Maps the 9-task redesign (search-guard-homepage-redesign-tasks.md) onto the actual
repo (`search-guard/search-guard-website`, Next.js static export + React Router app,
i18next, colorschema design system). Written to be executable by a developer or by
Claude Code with `CLAUDE.md` context.

## Files in this package

| File | Target location in repo |
|---|---|
| `home.en.json` | `src/i18n/locales/en/home.json` (replace) |
| `HomePage.js` | `src/views/HomePage/HomePage.js` (replace) |
| `components/HomeHero.js` + `.scss` | `src/components/Hero/` |
| `components/WhySearchGuard.js` | `src/components/WhySearchGuard/` |
| `components/ProductPillars.js` | `src/components/ProductPillars/` |
| `components/QuickstartStrip.js` | `src/components/QuickstartStrip/` |
| `components/FinalCTA.js` | `src/components/FinalCTA/` |
| `components/sections.scss` | split per component or import once in `src/index.scss` |

All components follow repo conventions: `colorschema` prop resolved via
`styleUtils`, Materialize grid (`row` / `col s12 m6 l4`), `Button` component,
`useTranslation('home')`, FA SVGs via `ReactSVG` (the established pattern in
`Labels.js` / `Services.js`) with `aria-hidden` set in `beforeInjection`.

## Icon assets to add (Font Awesome 6 Free, solid, as SVG)

Download from fontawesome.com into `src/images/` (same pattern as the existing
`headset-solid.svg`, `clipboard-check-solid.svg`):

shield-halved-solid.svg · scale-balanced-solid.svg · layer-group-solid.svg ·
bell-solid.svg · hard-drive-solid.svg · boxes-stacked-solid.svg ·
wave-square-solid.svg · rocket-solid.svg · calendar-check-solid.svg ·
file-signature-solid.svg · clock-rotate-left-solid.svg · fingerprint-solid.svg ·
certificate-solid.svg · location-dot-solid.svg

Already in repo (reused): `headset-solid.svg`.
Note: the `font-awesome@4.7.0` npm dependency is only used by
GlobalSearch/Navbar — the SVG-file pattern above is independent of it; no
dependency change needed.

## Manual steps not included as code

1. **Task 1 (hero screenshot):** `HomeHero.js` has a commented-out `<img>` slot.
   Produce a screenshot (the Docker demo is the fastest way) and drop it in.
2. **Task 4 (TrustBar):** rather than blind-editing `TrustedBy`/`Labels` (their
   internals feed from `ColumnedTile`), replace `<Labels/>` with a 4-item
   `ColumnedTile` using the new `trustbar.*` i18n keys and the icons above
   (clock-rotate-left, fingerprint, certificate, location-dot) — ~15 lines,
   mirroring `Labels.js`. Remove the Pivotal logo from the `TrustedBy` asset list.
3. **Task 6 ([Get a quote] on edition cards):** `LicensingModel` is shared with
   `/licensing/`; adding a second button per card is an edit there — add a
   `quoteButton` prop rendered only when passed, so the licensing page is
   unaffected. The `licensing.intro` key is provided; render it under the
   headline inside `LicensingModel` or directly in `HomePage.js`.
4. **Task 7 (Quotes trim):** quote content lives in the `Quotes` component's
   data source — reduce to 3 one-liners there (see task list for suggested picks).
5. **Task 9 (globals):** header quote button (Navbar), single newsletter
   instance (check `PreFooter` vs. page-level), nav "(Beta)" → "Preview".
6. **`quickstart.command`** in `home.en.json` is a TODO — copy the exact
   `docker run` command from the docs quickstart so both stay in sync.

## Translations

`home.en.json` is complete. The de/es/fr `home.json` files need the same key
structure — translate before merging or ship EN fallback temporarily (i18next
falls back to EN for missing keys if configured; verify `src/i18n/config`).
I can generate the DE/ES/FR files on request.

## Verify before merge

- `npm run build` completes and the homepage renders in all 4 locales.
- Removed components (`SimpleHero` usage, `ImageTextTile` tiles, `Services`,
  `Labels`, `FilledDivider`, `CTAStartFreeTrial`) are still used elsewhere or
  cleaned up — Services in particular is also used with a `landing` prop
  (grep for usages before deleting anything).
- Keys removed from `home.json` (`tile1–3`, `labels.*`, `services.*`, old
  `hero.button`/`hero.teaser`) are not referenced by other components.
- Lighthouse/a11y quick pass: one H1, sequential H2s, SVGs aria-hidden.

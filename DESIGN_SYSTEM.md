# DESIGN_SYSTEM.md

Design system reference for the Search Guard website. This document describes the visual foundations (colors, typography, spacing, breakpoints), the global utilities and layout primitives, and every reusable React component the site composes its pages from.

It complements `CLAUDE.md` (which is the AI handover guide for the repo) by giving designers and developers a precise inventory of the design language and component contracts.

---

## 1. Foundations

### 1.1 Color tokens

Defined in `src/styles/Colors.scss`. Imported in every component SCSS via `@use '../../styles/Colors' as *;`.

| Token | Value | Use |
| --- | --- | --- |
| `$white` | `#FFF` | Backgrounds, text on dark sections |
| `$black` | `#000` | Reserved (rarely used directly) |
| `$primary` | `#184962` | Brand blue. Body text color, dark-section background |
| `$primary-light` | `#478EB3` | Highlight blue (Heise variant) |
| `$primary-dark` | `#184962` | Same as `$primary` (alias) |
| `$secondary` | `#02F0DD` | Brand mint. Buttons, link highlights, SVG fills on light |
| `$secondary-light` | `#B0F8F2` | Mint pastel. Light-section background, SVG fills on dark/white |
| `$secondary-dark` | `#00B7A8` | Material icon color, hover/active accents |
| `$green` | alias of `$secondary` | Legacy |
| `$lightGrey` | `#E8ECED` | Borders, separators |
| `$darkGrey` | `#63737E` | Muted text |
| `$navyBlue` | `#246E94` | Legacy navigation accent |
| `$darkBlueNav` | `#133346` | Legacy navigation accent |

Selection color: `::selection` uses `$primary` background with `$white` text.

### 1.2 Color schemas (composable section themes)

A site-wide convention: every section component takes a `colorschema` prop with one of three values. Resolved by `src/utils/styleUtils.js`.

| `colorschema` | Background | Text color | SVG fill/stroke |
| --- | --- | --- | --- |
| `"dark"` | `$primary` (`#184962`) | `$white` | `$secondary-light` (`#B0F8F2`) |
| `"light"` | `$secondary-light` (`#B0F8F2`) | `$primary` | `$secondary` (`#02F0DD`) |
| `"white"` | `$white` | `$primary` | `$secondary-light` (`#B0F8F2`) |

Underlying CSS classes (declared in `src/index.scss`):

- Backgrounds + text: `.color-schema-dark`, `.color-schema-light`, `.color-schema-white`
- SVG recoloring: `.color-schema-svg-dark`, `.color-schema-svg-light`, `.color-schema-svg-white`

JS helpers:

```js
import { getColorSchemaCSS, getColorSchemaCSSForSVG } from 'src/utils/styleUtils';
getColorSchemaCSS('dark');        // -> 'color-schema-dark'
getColorSchemaCSSForSVG('dark');  // -> 'color-schema-svg-dark'
getColorSchemaCSSForSVG('none');  // -> '' (used by ColumnedTile when no SVG recolor wanted)
```

The intended page rhythm is to alternate `light` / `dark` between adjacent `ImageTextTile` rows so sections feel banded.

### 1.3 Typography

Two type families are loaded from `/public/assets/fonts/`:

- **Parafina** — display family. Weights used in code: `Parafina-SemiWideXBold` (h1–h4), `Parafina-SemiWideBold` (h5). All headlines are uppercase, center-aligned by default.
- **Inter** — body family. Used as `Inter-Regular` for `body`, `.subtitle`, `.body1`, `.body2`, `.body-din`, `.button-medium`, `.button-large`.

The `@font-face` declarations live in the legacy global CSS bundle (`public/assets/index-*.css` / Materialize bundle); SCSS only references the family names.

#### Heading scale (from `src/index.scss`)

| Element | Family | Desktop | Tablet (`<=992px`) | Mobile (`<=600px`) | Letter-spacing |
| --- | --- | --- | --- | --- | --- |
| `h1` | Parafina-SemiWideXBold | 96px | 72px | 60px | -1.5px |
| `h2` | Parafina-SemiWideXBold | 60px | 56px | 42px | -0.5px |
| `h3` | Parafina-SemiWideXBold | 48px | 42px | 36px | — |
| `h4` | Parafina-SemiWideXBold | 40px | 34px | 28px | 0.25px |
| `h5` | Parafina-SemiWideBold | 28px | 24px | 20px | — |

All headings are: `font-style: normal`, `text-transform: uppercase`, `text-align: center`, `line-height: 100%`, `font-feature-settings: "kern" 1, "cpsp" 1`.

#### Body / utility classes

| Class | Family | Size | Weight | Line-height | Letter-spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `body` | Inter-Regular | 18px | 400 | 24px | 0.15px | Default page body, `color: $primary` |
| `.subtitle` | Inter-Regular | 16px | 700 | 28px | 0.15px | Used in headlines like the prefooter |
| `.body1` | Inter-Regular | 16px | 400 | 24px | 0.15px | Marked "REMOVE" — legacy, still in use |
| `.body2` | Inter-Regular | 14px | 400 | 20.02px | 0.15px | Marked "REMOVE" — legacy, still in use |
| `.body-din` | Inter-Regular | 20px | 400 | 30px | 0.15px | Used in `TextTile` and `Quotes` body copy |
| `.button-medium` | Inter-Regular | 14px | 700 | 24px | 0.4px | Marked "REMOVE?" |
| `.button-large` | Inter-Regular | 15px | 700 | 26px | 0.46px | Used inside Button component |

> The classes flagged "REMOVE" still ship — treat them as the working body styles until a typography refactor lands.

### 1.4 Breakpoints

Defined in `src/styles/Breakpoints.scss`.

| Token | Value | Common usage |
| --- | --- | --- |
| `$xxs` | 0px | — |
| `$xs` | 360px | Smallest phones |
| `$m` | 500px | Edge-case mobile |
| `$mobile` | 600px | **Primary mobile breakpoint** |
| `$tablet` | 768px | Tablet |
| `$tabletBig` | 992px | **Primary tablet/desktop breakpoint** (Materialize "med") |
| `$xl` | 1200px | Wide desktop |
| `$xxl` | 1500px | Extra-wide |

Almost every component uses two media-query queries: `max-width: $tabletBig` (collapse to single column) and `max-width: $mobile` (mobile-specific tightening).

### 1.5 Spacing

Two simultaneous spacing systems:

1. **JS token map** — `src/styles/Spaces.js` (used in inline styles only):

   ```js
   { xxs: 2, xs: 4, s: 8, m: 16, l: 32, xl: 64, xxl: 128 }
   ```

2. **Section padding utility classes** — declared in `src/index.scss`:

   | Class | Desktop | Tablet | Mobile |
   | --- | --- | --- | --- |
   | `.default-padding-top-bottom` | 96px | 56px | 42px |
   | `.default-margin-top-bottom` | 96px | 56px | 42px |
   | `.default-margin-bottom` | 96px | 56px | 42px |

   Apply these to any full-width section to inherit the canonical vertical rhythm.

### 1.6 Grid (Materialize)

The site uses the Materialize 12-column grid. Stylesheet is loaded globally from `/public/assets/materialize.min.css`; JS (`materialize.min.js`) is loaded on demand for sidenav, dropdown, and slider behaviors.

- Container: `.row` (max-width 1180px in `src/index.scss`).
- Columns: `.col .s12 .m6 .l4` etc. — `s` = mobile, `m` = tablet, `l` = desktop.
- Push/pull for source-order swapping: `.push-m6` / `.pull-m6` (used by `ImageTextTile` to flip image/text order).
- Custom `.row .col` padding: `0 20px` (top padding bumps to 20px on mobile via the override in `index.scss`).
- **Pitfall:** Materialize `.col` uses `float: left`. Flexbox alignment on `.col` itself often fails — wrap content in an inner `<div>` and use higher-specificity selectors.

### 1.7 Material Icons

Loaded globally. Use `<i className="material-icons">name</i>`.

Size modifier classes (in `src/index.scss`):

- `.md-18` → 18px
- `.md-24` → 24px
- `.md-36` → 36px
- `.md-48` → 48px
- `.md-96` → 96px

Default icon color is `$secondary-dark` (`#00B7A8`).

### 1.8 Link/anchor defaults

- `a` → cursor pointer, color `$primary`, underlined.
- `li a` → no underline (used in nav menus).
- `iframe` → no border.

### 1.9 Layout helpers

- `.flex-row` → `display: flex; align-items: stretch;`
- `.flex-col-bottom` → `display: flex; align-items: flex-end;`
- `.flex-col-center-on-med-down` → at `<=$tabletBig`, centers content (used in the Hero CTA column).
- `.hidden` → `display: none;`
- Materialize visibility helpers in heavy use: `.hide-on-med-and-down`, `.hide-on-large-only`.

### 1.10 Carousels (Glide.js)

Loaded on demand from `/public/assets/glide.min.js`. Glide core CSS is inlined into `src/index.scss` (saves a network hop). Used by `TrustedBy`, `References`, `Integrators`. Standard config: `{ type: 'carousel', perView: 4, autoplay: 2000, hoverpause: false }` with retry-init pattern guarding `window.Glide`.

---

## 2. SCSS architecture

- **Single entry point** — `styles/main.scss` is imported in `pages/_app.js`. Next.js compiles it via built-in Sass support and emits hashed chunks to `_next/static/css/`.
- **Aggregation** — every component/page SCSS file is registered in `main.scss` with `@use '...'`. To add a new style file:
  1. Place `Foo.scss` next to its component.
  2. `@use '../../styles/Colors' as *;` and `@use '../../styles/Breakpoints' as *;` at the top.
  3. Add `@use '../src/components/.../Foo.scss';` to `styles/main.scss`.
- **Never** import `.scss` directly from a `.js` component — Next.js will fail the build. CSS Modules are not used.
- Colliding basenames must be aliased: `@use '...' as AliasName;`.
- `src/index.scss` is the global stylesheet (resets, typography, color-schema utility classes, grid overrides, Materialize tweaks, Glide CSS).

---

## 3. Application chrome

Components used on every page (composed by `PageWrapper`).

### 3.1 `PageWrapper` (`src/components/PageWrapper/PageWrapper.js`)

Wraps every page; mounts the navbar, footer, and default Helmet meta.

**Props**

| Prop | Type | Notes |
| --- | --- | --- |
| `children` | node | Page body |
| `background` | string | Forwarded to `Navbar` (`'white'` default) |
| `landing` | bool | When `true`, footer hides link columns and `Navbar` adapts |

Sets defaults: `<title>`, description, canonical URL (with locale prefix when locale ≠ default), OG/Twitter meta, hreflang alternates for localizable routes.

### 3.2 `Navbar` (`src/components/Navbar/Navbar.js`)

Fixed top navigation. SVG brand logo on the left, primary nav `<ul>` on the right, hidden on `<=$tabletBig` (replaced by Materialize sidenav `#sg-sidenav` triggered by a hamburger). Two dropdowns: `#nav-solutions`, `#nav-resources`. Includes `LanguageSwitcher` and `GlobalSearch` (Algolia InstantSearch) toggled by a search icon.

**Props**: `background` (`'white'` default), `landing`.

**Initialization**: dynamically loads `materialize.min.js` and initializes `M.Sidenav` and `M.Dropdown` with `{ hover: true, coverTrigger: false }`.

### 3.3 `Footer` (`src/components/Footer/Footer.js`)

Four link columns (Security, License, Resources, Company), social icons row (X/Twitter, Facebook, LinkedIn, YouTube), copyright/trademark line, and embedded `RichSnippetCompany` JSON-LD. When `landing={true}`, link columns are hidden — only social row + legal text remain.

### 3.4 `RichSnippetCompany` (`src/components/RichSnippets/RichSnippetCompany.js`)

Emits `Organization` JSON-LD for floragunn GmbH (Berlin address, founders, contact points, social `sameAs`). Always rendered inside `Footer`.

### 3.5 `LanguageSwitcher` (`src/components/LanguageSwitcher/LanguageSwitcher.js`)

Flag-emoji dropdown in the navbar. Hidden on non-localizable pages (blog, authors, whitepapers, etc.). Builds locale-prefixed hrefs (`/de/...`, `/es/...`, `/fr/...`); the default locale `en` uses unprefixed URLs.

### 3.6 `LocalizedLink` (`src/components/LocalizedLink/LocalizedLink.js`)

`<a>` wrapper that prepends the active locale prefix to internal hrefs; external/anchor URLs pass through unchanged.

### 3.7 `ScrollToTop` (`src/components/ScrollToTop/ScrollToTop.js`)

Helper that scrolls to top on route change.

### 3.8 `Tracking` (`src/components/Tracking/Tracking.js`)

Hosts analytics tracking integration.

---

## 4. Layout primitives — the **Tile** family

Three composable section components form the visual backbone of every feature page. All accept `colorschema` and obey the `default-padding-top-bottom` rhythm.

### 4.1 `ImageTextTile` (`src/components/Tiles/ImageTextTile/ImageTextTile.js`)

Two-column section: SVG icon on one side, headline + body on the other. Source order flips via Materialize `push-m6`/`pull-m6` for true alternation without CSS reordering.

**Props**

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `colorschema` | `'dark' \| 'light' \| 'white'` | yes | Resolves background + text |
| `iconPosition` | `'left' \| 'right'` | — | Default `'left'` |
| `icon` | string (SVG src) | yes | Rendered via `react-svg` with attributes stripped (`fill`, `stroke`, `filter`, `mask`, `style`, `class`) so the color schema can recolor it via class |
| `svgcolor` | `'dark' \| 'light' \| 'white' \| 'none'` | — | Defaults to `colorschema`. `'none'` skips SVG recoloring |
| `headline` | string | yes | Rendered as `<h3>` |
| `text` | node | yes | Body content |

Vertical rhythm via `.tile-row` (padding 80px top / 96px bottom; flex on desktop, stacked on mobile).

### 4.2 `ColumnedTile` (`src/components/Tiles/ColumnedTile/ColumnedTile.js`)

Equal-width card grid. Auto-divides columns: `m${12 / columns.length}` (so 2-up uses `m6`, 3-up uses `m4`, etc.). Cards stretch to equal height via flex. Buttons stick to the bottom of each card via `margin-top: auto`.

**Props**

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `colorschema` | string | yes | Background + text |
| `columns` | array | yes | Throws if missing/non-array |
| `headline` | string | — | Optional section headline (`h2`) |
| `svgcolor` | string | — | Override SVG recolor; `'none'` to skip |
| `wrapperclass` | string | — | Extra class on outer container (commonly `'default-padding-top-bottom'`) |

**Column shape**

```js
{
  headline: string,            // -> <h2 class="columnedtile-headline">
  text: node | string,         // -> <div class="body1 columnedtile-content">
  image: { src, width, height, alt },  // SVG or raster; SVG inlined and recolored
  button: { text, href, target },      // optional CTA at bottom
}
```

Image handling resolves `string`, `{src}`, `{default}` shapes (legacy import compat). SVGs are inlined via `ReactSVG`; non-SVGs render as `<img class="responsive-img">`.

### 4.3 `TextTile` (`src/components/Tiles/TextTile/TextTile.js`)

Centered text block with optional CTA button. Tall section (160px top/bottom on desktop). Used directly for centered marketing blocks and as the implementation behind every CTA variant.

**Props**

| Prop | Type | Notes |
| --- | --- | --- |
| `colorschema` | string | yes |
| `headline` | string | optional |
| `text` | node | optional, rendered with `.body-din` |
| `ctaText` | string | optional |
| `link` | string | required for the button to render |
| `target` | string | passed to `<Button>` |

### 4.4 `FilledDivider` (`src/components/FilledDivider/FilledDivider.js`)

Decorative SVG arrow band (`src/images/arrows_group.svg`) used as a visual breath between sections. Single prop: `colorschema`. Background and arrow color follow the schema (using both `getColorSchemaCSS` and `getColorSchemaCSSForSVG`).

---

## 5. Form & input components

### 5.1 `Button` (`src/components/Button/Button.js`)

Single entry point that delegates to one of two implementations:

| `variant` | Renders | Used for |
| --- | --- | --- |
| `'link'` (default) | `ButtonLink` — `<a>` styled as button | Navigation/CTA |
| `'submit'` | `ButtonSubmit` — `<button type="submit">` | Forms |

**Props**: `variant`, `text`, `link` (link variant), `target`, `onPress`, `style` (default `'light'` — currently not branched in markup), `additionalCss` (submit only).

**Visual**: `.button-default-container` — `$secondary` background (mint), 48px tall, 3px radius, 14px/20px padding, capitalized text. Hover adds a layered drop shadow with a 0.1s linear transition. Full-width on `<=$mobile`.

### 5.2 `Email` (`src/components/Email/Email.js`)

Newsletter subscribe form rendered by `PreFooter`. Posts to the AWS API Gateway endpoint `https://45xbqthu4l.execute-api.eu-central-1.amazonaws.com/prod/`. Three states: idle (form), processing (`<h5 class="nl-feedback">Processing</h5>`), submitted (thank-you message). Uses Materialize `input-field` styling for the email field plus a `Button variant="submit"`.

### 5.3 `TextInput` (`src/components/TextInput.js`)

Plain controlled `<input>` wrapper used in forms. Props: `value`, `onTextChange`, `placeholder`. Inline-styled (310×40px, `#184962` text).

### 5.4 `DropDown` (`src/components/DropDown/DropDown.js`)

Native `<select>` with a label. Props: `category` (label; `'Country'` is auto-marked required with `*`), `options` (string array), `name`. Styled via `.drop-down-wrapper`.

### 5.5 `ContactForm` family

- `ContactForm.js` — full-width contact form
- `ContactFormSuperSlim.js`, `ContactFormSuperSlimOnly.js`, `ContactFormSuperSlimOnlyNoNL.js` — narrower variants used inline (e.g. on the free-trial page). The "NoNL" variant omits the newsletter opt-in.

All composed of `TextInput`, `DropDown`, and a `Button variant="submit"`.

---

## 6. Hero / page-title components

### 6.1 `Hero` (`src/components/Hero/Hero.js`)

Home-page hero. 7/8-column text block (headline + body + CTA + certificate strip) and 5/4-column inline-recolored SVG illustration. Hardcoded copy (English) — used only on the home page.

### 6.2 `SimpleHero` (`src/components/Hero/SimpleHero.js`)

Translatable hero variant (uses i18n `home` namespace: `hero.headline`, `hero.text`, `hero.button`). Used by the home page when localized.

### 6.3 `Title` (`src/components/Title/Title.js`)

Reusable hero/title block for non-home feature and content pages.

**Props**

| Prop | Notes |
| --- | --- |
| `headline` | HTML allowed (`dangerouslySetInnerHTML`) — rendered as `<h1>` |
| `text` | HTML allowed — rendered as `<h2>` styled with body font |
| `breadcrumb` | array of `{ name, anchor }` — emits `schema.org/BreadcrumbList` JSON-LD-friendly markup |
| `buttonstyle` | passed to `<Button>` |
| `buttontext`, `buttonlink`, `buttontarget` | optional CTA |
| `titlestyle` | `'flx'` (left-aligned, no uppercase) or `'heise'` (alternate light-blue background variant) |

Uses `useTranslation` to set `<h1 lang>` from the current resolved language.

### 6.4 `BlogTitle` (`src/components/BlogTitle/BlogTitle.js`)

Specialized title for blog posts. Hardcodes the breadcrumb chain `Home > Resources > Blog > <post>` and renders tags as links to `/blog/category/<slug>/`.

---

## 7. Marketing/content sections

### 7.1 `Services` (`src/components/Services/Services.js`)

8-icon feature grid (Encryption, Authentication, Authorization, RBAC, Audit Logging, Multi Tenancy, Elastic Stack Support, Compliance). Renders inline-recolored SVG icons with i18n labels. Behaves differently on landing pages (`landing` prop): swaps to a custom background image and hides the bottom CTA.

### 7.2 `Certified` (`src/components/Certified/Certified.js`)

Two-column trust block (Alliance for Cybersecurity + TeleTrust). i18n `security` namespace.

### 7.3 `Labels` (`src/components/Labels/Labels.js`)

Three-column trust strip ("certified", "support", "trustedBy") implemented on top of `ColumnedTile colorschema="white"`.

### 7.4 `TrustedBy` (`src/components/TrustedBy/TrustedBy.js`)

Glide.js carousel of 9 customer logos (Red Hat, ObjectRocket, Würth Phoenix, Pivotal, SieMonster, UNIL, Mitratech, KubeDB, Siren). 4-up perView, 2s autoplay, no hover-pause. Headline from i18n `home.trustedBy.headline`.

### 7.5 `References` (`src/components/References/References.js`)

Glide.js carousel of 15 academic/research customer logos (Heanet, Harvard, KIT, Seges, Deflect, Princeton, KOC, MDC, Laval, UC3M, UB, Bucharest, ICFO, Arnes, Oxford). Same Glide config as `TrustedBy`.

### 7.6 `Integrators` (`src/components/Integrators/Integrators.js`)

Same Glide pattern; 8 integration partner logos (Red Hat, ObjectRocket, Würth Phoenix, Pivotal, SieMonster, Mitratech, KubeDB, Siren). Headline from i18n `security.integrators.headline`.

### 7.7 `Partners` (`src/components/Partners/Partners.js`)

Three partner logos (Eliatra, Excelerate, Siren) rendered via `ColumnedTile colorschema="white" svgcolor="none"` so the partner branding is preserved.

### 7.8 `Quotes` (`src/components/Quotes/Quotes.js`)

Materialize `Slider` of 7 customer quotes (i18n `home.quotes.0..6`). Each slide shows top-left and bottom-right quote-mark icons, the quote, author, profession, company. Light schema, `default-padding-top-bottom`. Resilient init that retries up to 20× while waiting for `window.M`.

### 7.9 `News` (`src/components/News/News.js`)

Renders the first 6 events from `src/Api/contentfulEvents.json` as background-image cards with date range, optional labels, headline, Markdown description, and booth number.

### 7.10 `Press` → `PressTeaser` (`src/components/Press/PressTeaser.js`)

Three press-release teasers (German DSGVO, Signals release, DACH sales). Each teaser shows an image (hidden on `<=med`), headline, body, and one or two `Button` variants (English/German). Hardcoded content.

### 7.11 `Team` (`src/components/Team/Team.js`)

Two-column grid of 5 founder/team profile cards (avatar SVG, `<h5>` name, position, LinkedIn icon).

### 7.12 `Journey` (`src/components/Journey/Journey.js`)

Vertical company timeline. Each year is a collapsible header (`keyboard_arrow_up`/`keyboard_arrow_down` Material icons) toggling a list of monthly events. Most recent two years auto-expanded. Light schema. Dataset hardcoded in the component (2013–2025).

### 7.13 `Faq` (`src/components/Faq/Faq.js`)

Hardcoded headline "Frequently asked questions" + a grid of FAQ entries from `src/Api/pagecontent/sections.json` (filtered by `contentType === 'sectionTopFaq'`). Answers are rendered with `markdown-to-jsx`. Bottom button links to `/faq/`.

### 7.14 `LicensingModel` (`src/components/LicensingModel/LicensingModel.js`)

Three-column edition card matrix (Community / Enterprise / Compliance). Toggle buttons (`topButtons` prop) flip to a two-column view (Academic / Custom).

**Props**: `tableView`, `plain`, `topButtons`, `headline`, `subheadline`. Each edition card has icon, headline, three feature bullets, and a CTA button.

Sub-component: `CustomizeLicense.js`.

### 7.15 `FeatureBreakdown` (`src/components/FeatureBreakdown/FeatureBreakdown.js`)

Wide feature-comparison table (3 edition columns). Categories: Encryption, Access Control, Authentication, Authorization, Audit Logging, Alerting, Configuration, Kibana, Compatibility. Checkmarks are SVG icons in three colors:

- `checkmark-gold.svg` — community
- `checkmark-green.svg` — enterprise
- `checkmark-red.svg` — compliance

### 7.16 `SEOSection` (`src/components/SEOSection/SEOSection.js`)

3-column grid of internal/external SEO links with arrow icons. Currently rendered with placeholder copy ("seo headline 1..15"). Treat as a slot for future SEO content rather than a shipped section.

### 7.17 `Video` (`src/components/Video/Video.js`)

Featured video iframe + optional 3-column playlist (when `playlist` prop is set). Pulls from `src/Api/contentfulVideos.json`. Hidden on `<=med` (uses `hide-on-med-and-down`).

### 7.18 `Tiles/TileSimpleFLX/` (legacy)

`TileSimpleFLX` exists in `src/components/TileSimpleFLX/` but is **excluded from `styles/main.scss`** (dead code referencing undefined variables). Do not introduce new usages.

---

## 8. Pre-footer family

### 8.1 `PreFooter` (`src/components/PreFooter/PreFooter.js`)

Newsletter sign-up section appended to most pages. Two columns: an `Email` form (s12 m8 l6) and the Search Guard helmet logo (s12 m4 l6, hidden on mobile). Background `$primary`, white text. Used at the bottom of every standard page above the footer.

### 8.2 `PreFooterAnnouncement` (`src/components/PreFooterAnnouncement/PreFooterAnnouncement.js`)

Centered headline + button announcement strip ("View Full Documentation" → docs). Single prop: `headline`. Used at the bottom of feature pages that should drive readers to docs.

---

## 9. CTA component family

Thin, page-specific wrappers around `TextTile`. All accept a single `colorschema` prop and pull copy from `i18n` (`common` namespace, `cta.<key>.{headline,text,button}`).

| Component | Icon | Link target |
| --- | --- | --- |
| `CTAStartFreeTrial` | `icon-sg.svg` | `/search-guard-free-trial/` (localized) |
| `CTAAlerting` | `icon-sg.svg` | `/search-guard-free-trial/` (localized) |
| `CTACompliance` | `icon-sg.svg` | `/search-guard-free-trial/` (localized) |
| `CTAAIM` | `icon-sg.svg` | `https://docs.search-guard.com/latest/automated-index-management` (`_blank`) |
| `CTATLSTool` | `icon-sg.svg` | `https://docs.search-guard.com/latest/offline-tls-tool` (`_blank`) |
| `CTAEncryptionAtRest` | `icon-envelope.svg` | `/contacts/` (localized) |
| `CTAContactUs` | `icon-envelope.svg` | `/contacts/` (localized) |
| `CTAResourceHub` | `folder-glass.svg` | `/resource/` (localized) |

The CTA convention is: pick one CTA per page based on the lead the page is trying to drive, render it just above `<PreFooter/>` with `colorschema="white"`.

---

## 10. Blog & content components

### 10.1 `BlogBox` (`src/components/BlogBox/BlogBox.js`)

3-up grid of blog post previews. Pulls from `src/Api/contentfulPosts.json`.

**Props**

| Prop | Notes |
| --- | --- |
| `headline` | section headline |
| `overview` | when `true`, shows two rows (6 posts) and a "see more" button → `/blog/` |
| `randomize` | Fisher-Yates shuffle the post array |
| `category` | filter by tag |
| `postsyoulike` | switches to a "related posts" wrapper class |

Uses CDN image params `?fm=jpg&fl=progressive&w=500&fit=scale` for thumbnail scaling. Title trimmed at 100 chars on word boundary, description at 200 chars.

### 10.2 `BlogPost` (`src/components/BlogPost/BlogPost.js`)

Single blog post preview card. Same trimming rules as `BlogBox`. Used in feed/category lists.

Sibling files in the same folder: `BlogPostArticleContent.scss`, `BlogPostSmall.scss`, `CodeBlock.scss` (styling for blog post article body, small variant, and fenced code blocks).

### 10.3 `SearchBlogPost` (`src/components/SearchBlogPost/SearchBlogPost.js`)

Search-result variant of the blog post preview.

### 10.4 `Pagination` (`src/components/Pagination/Pagination.js`)

Simple `<ul class="pagination-wrapper">` of page numbers. Page 1 links to `/blog/`; pages 2+ link to `/blog/page/N/`. Driven by `postsPerPage` and `totalPosts` props.

### 10.5 `Blockquote` (`src/components/Blockquote/Blockquote.js`)

Article pull-quote: a `quote-up.svg` icon (58×51) followed by `props.children` styled as `.blogpostarticle-quote-text`. Used inside long-form blog content.

### 10.6 `Badge` (`src/components/Badge/Badge.js`)

Inline label `<span class="badge-style">` with configurable `bgColor` / `textColor` / `text` / arbitrary spread props. Used by `GlobalSearch` to mark hit source ("Docs" / "Blog").

### 10.7 `GlobalSearch` (`src/components/GlobalSearch/GlobalSearch.js`)

Algolia InstantSearch overlay. Two indexes:

- `latest` (Search Guard docs) — opens hits in new tab to `docs.search-guard.com`
- `blogposts` — opens hits in `/blog/<slug>/`

Each hit is rendered with a `Badge` indicating its index. Companion file `SgAlgolia.js` holds `SEARCH_GUARD_ALGOLIA_APP_ID` and `SEARCH_GUARD_ALGOLIA_SEARCH_API_KEY`.

---

## 11. Resources page tile components

Each is a thin `ColumnedTile` factory used on `/resource/` and related pages:

- `Resources/CVEDisclosure.js` — CVE Advisory + Disclosure Policy (icons: `dharmachakra-solid.svg`, `eye-slash-solid.svg`)
- `Resources/DocumentationForum.js`
- `Resources/PresentationsWhitepapers.js`
- `Resources/SourceCodeNewsletter.js`

All accept `colorschema` (defaults to `'dark'`).

Page-specific sub-components in similar style:

- `Alerting/AlertingBenefits.js`, `Alerting/AlertingNotificationModel.js`
- `AnomalyDetection/AnomalyDetectionBenefits.js`, `AnomalyDetectionCapabilities.js`, `AnomalyDetectionHowItWorks.js`
- `Compliance/ComplianceFeatures.js`
- `SecurityForElasticsearch/{Hero,Labels,LicensingModel,TableEditions}.js`

These all wrap one of the Tile primitives with translated copy and route into `i18n` namespaces matching their page.

---

## 12. Standard feature page composition

This is the canonical structure used by `views/Alerting/`, `views/Compliance/`, `views/AnomalyDetection/`, `views/EncryptionAtRest/`, etc.:

```jsx
<PageWrapper>
  <Helmet>{/* page-specific title/description/canonical */}</Helmet>

  <Title
    headline="..."
    text="..."
    breadcrumb={[{ name: 'Home', anchor: '/' }, /* ... */ ]}
  />

  <ImageTextTile iconPosition="left"  colorschema="light" icon={...} headline="..." text={...} />
  <ImageTextTile iconPosition="right" colorschema="dark"  icon={...} headline="..." text={...} />
  <ImageTextTile iconPosition="left"  colorschema="light" icon={...} headline="..." text={...} />

  <FilledDivider colorschema="white" />

  {/* Page-specific section(s): benefits, capabilities, connectors, etc. */}
  {/* Implemented as ColumnedTile or page-specific component under src/components/<Page>/ */}

  <CTA... colorschema="white" />
  <PreFooter />
</PageWrapper>
```

**Rhythm rules**

1. Hero is always `<Title>` (or `<Hero>`/`<SimpleHero>` for the home page).
2. `ImageTextTile` rows alternate `iconPosition="left"` / `right` and `colorschema="light"` / `"dark"`.
3. End every section group with a `FilledDivider` before switching to a different layout primitive (e.g. before a `ColumnedTile` benefits grid).
4. Pick exactly one CTA from §9 just above `PreFooter`.
5. `PreFooter` is the last component before `</PageWrapper>` (it sits inside the `PageWrapper`'s footer slot, above the `Footer` rendered by `PageWrapper`).

---

## 13. Asset conventions

- **Icons** — SVG only for any icon that needs to recolor with the color schema. Imported as React modules (`import icon from '../../images/icon.svg'`) and rendered via `react-svg` so attributes can be stripped.
- **Logos** — `.svg` for vector partners; `.png`/`.jpg` for non-vector. Pass `svgcolor="none"` to `ColumnedTile` to preserve original colors.
- **Photos** — JPG/PNG, served from `public/assets/`.
- **CDN image params (Contentful)** — `?fm=jpg&fl=progressive&w=500&fit=scale` for blog thumbnails.
- **Lazy loading** — every `<img>` and `<LazyLoadImage>` declares `loading="lazy"`.

---

## 14. Internationalization

- `i18next` + `react-i18next` with namespaces matching feature areas: `common`, `home`, `security`, `alerting`, `compliance`, `license`, `resource`, `company`.
- Locale registry: `src/i18n/locales.js` (`SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `LOCALE_LABELS`, `isLocalizableRoute`, `isNonLocalizableRoute`).
- Locale prefix is added to URLs for non-default locales (`/de/...`, `/es/...`, `/fr/...`); English uses unprefixed paths.
- Use `useLocalizedPath()` from `src/i18n/useLocalizedPath` (exposed via `lp(href)`) in any component that links to internal routes.
- `LanguageSwitcher` auto-hides on non-localizable pages; `PageWrapper` only emits `hreflang` alternates when `isLocalizableRoute` is true.

---

## 15. Behavior conventions / pitfalls

- **Browser-only globals**: every component that depends on `window.M` (Materialize) or `window.Glide` guards initialization with retry-up-to-20× / 100ms-delay loops and tears the instance down in cleanup. Reuse this pattern when adding new third-party JS.
- **Asset import shape patch**: `pages/_app.js` carries a normalization patch for legacy asset import shapes (`{src}` / `{default}` / string). `ColumnedTile` already handles all three internally.
- **JSON-LD**: serialize via `JSON.stringify` and inject through `dangerouslySetInnerHTML`. Don't string-interpolate JSON-LD payloads — see `RichSnippetCompany` for the canonical pattern.
- **`<h1>` / `<h2>` defaults are uppercase + center-aligned** (the shared `font-headlines` mixin). When designing left-aligned or sentence-case display copy, use a `titlestyle` variant (e.g. `Title`'s `'flx'`) or override `text-transform` / `text-align` in a scoped class — do not redefine the heading element globally.
- **Materialize float-based grid** breaks flexbox alignment on `.col`. Always wrap flex content in an inner `<div>` and scope custom styles under a wrapper class to win specificity.
- **`PageWrapper` always renders `Navbar` + `Footer`.** Don't render either yourself in views.

---

## 16. File map (quick reference)

```
src/
  index.scss                          # Resets, typography, color-schema utilities, grid overrides
  styles/
    Colors.scss                       # Color tokens
    Breakpoints.scss                  # Breakpoint tokens
    Spaces.js                         # Spacing scale (JS)
  utils/
    styleUtils.js                     # getColorSchemaCSS / *ForSVG
  components/
    PageWrapper/PageWrapper.js        # Required page wrapper
    Navbar/Navbar.js                  # Top navigation
    Footer/Footer.js                  # Site footer
    Tiles/
      ImageTextTile/ImageTextTile.js  # 2-column section
      ColumnedTile/ColumnedTile.js    # N-column card grid
      TextTile/TextTile.js            # Centered text + CTA
    Title/Title.js                    # Page hero/title
    Hero/{Hero,SimpleHero}.js         # Home-page heroes
    BlogTitle/BlogTitle.js            # Blog post hero
    Button/{Button,ButtonLink,ButtonSubmit}.js
    FilledDivider/FilledDivider.js    # Section divider
    PreFooter/PreFooter.js            # Newsletter signup
    PreFooterAnnouncement/...js       # Docs CTA strip
    CTA/CTA*.js                       # Page-specific CTA wrappers
    Tracking/Tracking.js              # Analytics
    LanguageSwitcher/...
    LocalizedLink/...
    GlobalSearch/...                  # Algolia search
    RichSnippets/RichSnippetCompany.js
    BlogBox/, BlogPost/, BlogTitle/, SearchBlogPost/, Pagination/
    Quotes/, References/, TrustedBy/, Integrators/, Partners/, Team/, News/, Press/
    LicensingModel/, FeatureBreakdown/
    Faq/, Video/, Services/, Certified/, Labels/, Journey/
    Badge/, Blockquote/, DropDown/, Email/, ContactForm*.js, TextInput.js
styles/
  main.scss                           # SCSS aggregation (single Next.js entry)
  legacy.scss                         # Legacy @import-based aggregation (reference only)
public/assets/
  fonts/                              # Inter (TTF) + Parafina (OTF) families
  materialize.min.{css,js}            # Loaded globally (CSS) / on-demand (JS)
  glide.min.js                        # Loaded on-demand for carousels
```

---

## 17. Adding a new page (design-system checklist)

1. Create the view under `src/views/<NewPage>/<NewPage>.js`.
2. Wrap the body in `<PageWrapper>`.
3. Use a `<Title>` (or `<SimpleHero>`) at the top with breadcrumb structured-data array.
4. Compose the body from `ImageTextTile` (alternating `light`/`dark`), `ColumnedTile` for grids, and `FilledDivider` between groups.
5. Pick the right CTA from `src/components/CTA/` and place it just before `<PreFooter />`.
6. Add page-specific styles as `<NewPage>.scss` next to the view, register in `styles/main.scss` with `@use`.
7. Register the route in `src/Routes.js`.
8. Add i18n strings under `src/i18n/locales/<locale>/<namespace>.json` and use `useTranslation('<namespace>')`.
9. Verify `npm run build-local` produces `out/<path>/index.html` with the correct title/description/canonical.

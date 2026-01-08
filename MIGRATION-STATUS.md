# Vite Migration Status

**Date:** 2026-01-08
**Status:** ✅ Core Migration Complete
**Branch:** feature/vite-migration

---

## ✅ Completed

### 1. Environment Updates
- [x] Node.js upgraded from 14.x to 20.x
- [x] Updated `.nvmrc` to 20.18.1
- [x] Updated `package.json` engines

### 2. Dependencies
- [x] React upgraded: 16.8.4 → 18.3.1
- [x] React DOM upgraded: 16.8.4 → 18.3.1
- [x] React Router upgraded: v5 → v6 (6.28.0)
- [x] Vite installed: 7.3.1
- [x] @vitejs/plugin-react installed: 5.1.2
- [x] vite-plugin-svgr installed: 4.5.0
- [x] SASS updated: 1.97.2
- [x] Prettier updated: 3.7.4
- [x] Removed react-scripts
- [x] Removed react-snap
- [x] Removed react-snapshot

### 3. Configuration Files
- [x] Created `vite.config.mjs` with:
  - React plugin with JSX support in `.js` files
  - SVGR plugin for SVG imports
  - SCSS preprocessing
  - Path aliases (@, @components, @views, etc.)
  - Code splitting configuration
  - Dev server on port 3000

### 4. Project Structure
- [x] Moved `index.html` from `public/` to project root
- [x] Added Vite entry point script tag to `index.html`
- [x] Created `src/main.jsx` with React 18 API
- [x] Updated to use `ReactDOM.createRoot()`

### 5. Routing Migration (React Router v6)
- [x] Updated `src/Routes.js`:
  - Renamed component to `AppRoutes` to avoid conflict
  - Changed `Switch` → `Routes`
  - Changed `component={X}` → `element={<X />}`
  - Changed `Redirect` → `Navigate`
  - Removed `exact` prop (default behavior in v6)
  - Consolidated redirects
- [x] Updated `src/components/ScrollToTop/ScrollToTop.js`:
  - Removed `withRouter` HOC
  - Replaced with `useLocation` hook
- [x] Updated `src/components/ContactForm.js`:
  - Removed unused `withRouter` HOC

### 6. Package Scripts
- [x] Updated `package.json` scripts:
  - `dev`: vite
  - `start`: vite
  - `build`: npm run fetch && vite build
  - `build-local`: vite build
  - `preview`: vite preview
  - `clean`: rm -rf dist/*

### 7. Testing
- [x] Vite dev server tested and working
- [x] Confirmed serving on http://localhost:3000
- [x] Hot Module Replacement (HMR) functional

---

## ⚠️ Remaining Tasks

### 1. Update Link Components (Priority: Medium)

**Issue:** One component still uses React Router v5 Link syntax.

**File:** `src/components/BlogPost/BlogPostSmall.js:24`

```javascript
// Current (v5):
<Link to={{ pathname: `/blog/${blogPost.slug}` }}>

// Should be (v6):
<Link to={`/blog/${blogPost.slug}`}>
```

**Action:** Search for other instances:
```bash
grep -r "to={{ pathname" src/
grep -r "to={{" src/
```

### 2. Environment Variables (Priority: HIGH)

**Issue:** Contentful API credentials are hardcoded in source files.

**Files affected:**
- `src/Api/fetchContentfulPosts.js`
- `src/Api/fetchContentfulEvents.js`
- `src/Api/fetchContentfulWhitepapers.js`
- `src/Api/fetchContentfulVideos.js`
- `src/Api/fetchContentfulPersons.js`
- `src/Api/fetchContentfulPageContents.js`

**Solution:**

1. Create `.env` file:
```bash
VITE_CONTENTFUL_SPACE_ID=95di84mqkkro
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

2. Update fetch scripts to use:
```javascript
const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});
```

3. Add `.env` to `.gitignore`
4. Create `.env.example` for documentation

### 3. Static Site Generation (Priority: HIGH)

**Issue:** Vite builds a SPA by default. Need SSG/pre-rendering to replace react-snap.

**Options:**

**Option A: vite-ssg (Recommended)**
```bash
npm install -D vite-ssg
```
- Update `vite.config.mjs` with ssgOptions
- Create routes manifest for all static routes
- Configure dynamic route generation

**Option B: vite-plugin-ssr (vike)**
```bash
npm install -D vike
```
- More powerful but more complex
- Better for future SSR needs

**Option C: Custom Prerender Script**
- Use Puppeteer to crawl and save HTML
- Similar to old react-snap approach
- See `MIGRATION-GUIDE-CONSERVATIVE.md` for implementation

### 4. Build Output Configuration (Priority: Medium)

**Issue:** Build output changed from `build/` to `dist/`

**Update needed:**
- Deployment scripts (Heroku, CI/CD)
- `.gitignore` (add `/dist`)
- Server configuration files
- Documentation

### 5. Sitemap Generation (Priority: Low)

**Current:** `./scripts/sitemap.js` runs in postbuild

**Verify:** Ensure script works with new `dist/` directory instead of `build/`

### 6. Code Cleanup (Priority: Low)

**Files to review:**
- Remove old `src/index.js` (replaced by `src/main.jsx`)
- Remove `config/webpack-*.js` files (no longer needed)
- Remove unused webpack-related devDependencies
- Update `.gitignore` to include `/dist` instead of `/build`

### 7. Testing Before Production (Priority: CRITICAL)

**Must test:**
- [ ] All 40+ routes load correctly
- [ ] Dynamic routes work (`/blog/:slug`, `/author/:slug`, `/whitepapers/:slug`)
- [ ] Blog pagination (`/blog/page/:pageNumber`)
- [ ] Category filtering (`/blog/category/:slug`)
- [ ] All redirects work
- [ ] Forms submit properly
- [ ] Newsletter signup
- [ ] Contact form
- [ ] Search functionality (Algolia)
- [ ] Analytics tracking (GTM, Plausible, Matomo)
- [ ] Social sharing buttons
- [ ] Images load and optimize
- [ ] PDFs download (whitepapers)
- [ ] External links work
- [ ] Responsive design on mobile
- [ ] Browser compatibility

**Performance testing:**
```bash
npm run build
npm run preview
# Test with Lighthouse
lighthouse http://localhost:5000 --view
```

---

## 🚀 Usage

### Development
```bash
npm run dev
# or
npm start
```
Opens dev server at http://localhost:3000

### Build for Production
```bash
npm run build
```
Outputs to `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Serves production build at http://localhost:5000

### Fetch Content from Contentful
```bash
npm run fetch
```
(Runs automatically before build)

---

## 📊 Expected Performance Improvements

Based on the migration from CRA to Vite:

**Development:**
- Dev server start: 10-15 seconds → <1 second (10-15x faster)
- Hot Module Replacement: 2-5 seconds → 50-200ms (10-100x faster)
- Initial page load: Faster due to native ESM

**Production:**
- Build time: ~3 minutes → ~1 minute (2-3x faster)
- Bundle size: Expected 30-40% reduction
- Better code splitting
- Improved caching strategies

---

## 🔄 Rollback Procedure

If issues arise:

```bash
# Return to pre-migration state
git checkout pre-vite-migration

# Or reset to specific commit
git reset --hard <commit-hash>

# Reinstall old dependencies
npm install
```

**Backup tag created:** `pre-vite-migration`

---

## 📝 Notes

### Known Issues
1. Node version warning: Using 22.1.0, but Vite recommends 20.19+ or 22.12+
   - This is a warning only, not blocking
   - Consider upgrading Node to 22.12+ when available

2. Legacy peer dependencies flag required
   - Some older dependencies have peer dependency conflicts
   - Using `--legacy-peer-deps` resolves this
   - Should audit and update these dependencies over time

### Security Vulnerabilities
After migration: 77 vulnerabilities (14 low, 18 moderate, 38 high, 7 critical)
- Reduced from 249 vulnerabilities (significant improvement)
- Most are in devDependencies
- Run `npm audit` for details
- Consider `npm audit fix` for automated fixes

---

## 📚 Documentation

For detailed migration instructions, see:
- `MIGRATION-GUIDE.md` - Full Next.js migration guide
- `MIGRATION-GUIDE-CONSERVATIVE.md` - Vite migration guide (used for this migration)

---

## ✅ Ready for Next Steps

The core migration is complete and functional. Priority next steps:

1. **Implement SSG/pre-rendering** (replaces react-snap)
2. **Move credentials to environment variables** (security)
3. **Update Link components** (compatibility)
4. **Full QA testing** (quality assurance)
5. **Deploy to staging** (validation)

---

**Migration performed by:** Claude Sonnet 4.5
**Date completed:** 2026-01-08

# How to deploy this to GitHub Pages

## What was changed (and why)

**The root cause of the white screen:** `App.tsx` used `React.lazy()` (dynamic imports)
for DemoPlayer and AdminPage. `vite-plugin-singlefile` cannot inline dynamically-imported
chunks — it only handles static imports. The result was a built `index.html` with broken
or missing `<script>` tags, causing a white screen on GitHub Pages.

### Files changed:
- `src/App.tsx` — removed `lazy()` and `Suspense`, use direct static imports instead
- `vite.config.ts` — added `inlineDynamicImports: true` + proper singlefile config
- `package.json` — `vite-plugin-singlefile` is back as a devDependency
- `.github/workflows/deploy.yml` — uses `npm install` (not `npm ci`) so lockfile
  mismatches don't block the build

## Steps to push and deploy

```bash
# 1. Replace your project files with these
# 2. From the project root:
git add -A
git commit -m "fix: use static imports for singlefile build"
git push origin main
```

GitHub Actions will build and deploy automatically.
The site will be live at: https://meetmind-fun.github.io/meetmind/

## How it works

`vite-plugin-singlefile` inlines ALL JS and CSS into a single `index.html`.
This means:
- No separate `/assets/` folder needed
- No base path issues — the HTML is self-contained
- Works from any URL, any sub-path, any repo name

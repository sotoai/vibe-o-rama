# Deployment Guide

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/vibe-o-rama in your browser.

Note: The basePath is `/vibe-o-rama`, so local dev also uses this path.

## Deploy to GitHub Pages

```bash
npm install
npm run deploy
```

This will:
1. Build the static site to `/out`
2. Push the contents to the `gh-pages` branch

## GitHub Pages Settings

After running `npm run deploy`, configure GitHub Pages:

1. Go to your repo: **Settings → Pages**
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**

The site will be live at: https://sotoai.github.io/vibe-o-rama/

## Build Output

The static export produces:
- `out/index.html` → `/`
- `out/prizes/index.html` → `/prizes`
- `out/levels/index.html` → `/levels`
- `out/_next/` → JS/CSS assets
- `out/*.svg` → Static images

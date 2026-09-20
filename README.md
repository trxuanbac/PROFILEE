# Trần Xuân Bắc Portfolio

Personal portfolio site for Backend .NET, System Analysis, API Testing, and software project case studies.

Live site: https://xuanbackhoaibu.github.io/PROFILEE/

Built with **Vue 3**, **TypeScript**, and **Vite**. Motion via **GSAP** and **Lenis**, 3D via **three.js**, audio via **Howler**. GLSL is compiled through **vite-plugin-glsl**.

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`   | Dev server on port **3000** (`strictPort`) |
| `npm run build` | `vue-tsc` then production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Typecheck only (`vue-tsc -b`) |

## Content

The default CV PDFs use `public/files/CV-Tran-Xuan-Bac.html` as their content source.
After editing the online CV, regenerate and verify the downloads on macOS (the
generator uses the installed Times New Roman fonts):

```sh
python3 -m pip install reportlab pymupdf
python3 scripts/generate-cv-pdf.py --online-only
python3 scripts/test-cv-pdf.py
node scripts/test-cv-download.mjs
```

Commit both generated PDFs and update the PDF/page URL versions when publishing
changes so returning visitors receive the new downloads.

- **Projects**: `src/content/projects/{en,de}/<slug>.ts` - copy, tags, media, links. Slugs must align with `projectIds` in `src/content/projects/index.ts`.
- **Previews / listing**: `src/content/projects/previews/`.
- **Tags**: variants and labels live in `src/components/tagVariants.ts` (used by `Tag.vue` and content types).

## Stack (high level)

- Vue 3 (`<script setup>`), SCSS with shared mixins (`src/assets/styles/`)
- i18n helpers under `src/i18n/`
- WebGL / GLSL under `src/three/` where applicable

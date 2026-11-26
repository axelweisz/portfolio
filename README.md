# Axel — portfolio

Astro static site. Dark, typewriter-style, video-first.

## Run it locally

```bash
cd ~/localProjects/portfolio
npm install      # first time only
npm run dev      # then open http://localhost:4321
```

Edits to files show up in the browser immediately. Stop the server with Ctrl+C.

## Where things are

| What | Where |
|---|---|
| Name, tagline, menu, email, form URL | `src/site.config.ts` |
| Colors & fonts | `src/styles/global.css` (top of file) |
| Projects (one folder each) | `src/content/projects/<slug>/index.md` + images |
| Progress log posts | `src/content/logs/YYYY-MM-DD-title.md` |
| Background / Contact pages | `src/pages/background.astro`, `src/pages/contact.astro` |
| Playable demos (Unity WebGL builds) | `public/demos/<slug>/` |

## Add an old project

1. Create `src/content/projects/<slug>/` (lowercase, dashes: `caminhos-da-lapa`).
2. Put `cover.png` (and optionally `cover-roll.png` for hover, `poster.png`) in it.
3. Copy an existing `index.md`, change the fields, write the paragraph.
4. `video:` takes a Vimeo or YouTube URL (`https://vimeo.com/123456789`) or a local file in `public/media/`.

## Post a progress update

Copy `src/content/logs/2026-11-05-example.md`, rename with today's date, set `project:` to the project's
folder name, remove `draft: true`, write.

## Notes

- `public/media/` holds temporary local videos and is git-ignored. Move videos to Vimeo before deploying.
- Videos autoplay muted (browser rule). Visitors unmute with the controls.
- Contact form posts to Formspree — create a free form at formspree.io and paste its URL into `site.config.ts`.

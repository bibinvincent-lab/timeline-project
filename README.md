# Timeline App


## Quick overview

- Framework: Next.js (App Router)
- UI: MUI (`@mui/material`, `@mui/lab`)
- Data: local JSON files in `src/data`

## Prerequisites

- Node.js (recommended: Node 18 or newer)
- npm (or yarn / pnpm / bun)

## Install

Install dependencies:

```bash
npm install
```

Available package scripts (from `package.json`):

- `npm run dev` — start development server (Next.js dev)
- `npm run build` — build for production
- `npm run start` — start the production server after build

Run the dev server and open http://localhost:3000:

```bash
npm run dev
```

Build + run production locally:

```bash
npm run build
npm run start
```

## Pages / Routes

User-facing routes in this app:

- `/` — app root (rendered by `src/app/page.js`) showing a timeline built with MUI `Timeline` components.
- `/timeline` — interactive client timeline with filters and search.
- `/time` — client timeline that fetches data from the API.
- `/time/:id` — server-rendered detail page that fetches the corresponding event via the API.
- `/detailed` and `/detailed/:id` — alternate detailed listing and detail pages.


Most pages read from `src/data/timeline.json` or call the API endpoints above.



## Project structure (important files)

- [src/app/page.js](src/app/page.js) — the app root page (server component) rendering the main timeline.
- [src/app/timeline/page.js](src/app/timeline/page.js) — client timeline with search and filters.
- [src/app/time/page.js](src/app/time/page.js) — client page that fetches `/api/timeline`.
- [src/app/time/[id]/page.js](src/app/time/[id]/page.js) — server page that fetches a single event via `/api/timeline/:id`.
- [src/app/detailed/page.js](src/app/detailed/page.js) — alternate detailed timeline listing.
- [src/app/detailed/[id]/page.js](src/app/detailed/[id]/page.js) — server detail page using in-repo data.

- [src/app/api/timeline/route.js](src/app/api/timeline/route.js) — API endpoint returning all timeline events.
- [src/app/api/timeline/[id]/route.js](src/app/api/timeline/[id]/route.js) — API endpoint returning a single event by `id`.
- [src/data/timeline.json](src/data/timeline.json) — primary timeline data used by the API/pages.
- [src/data/timeline1.json](src/data/timeline1.json) — a smaller sample dataset.

## API Endpoints

This project uses Next.js route handlers living under `src/app/api/timeline`.

- GET `/api/timeline`
	- Returns: `200` with a JSON array of timeline event objects (contents of `src/data/timeline.json`).
	- Example:

```bash
curl http://localhost:3000/api/timeline
```

Sample (trimmed) response:

```json
[
	{
		"id": 1,
		"slug": "started-learning-coding",
		"title": "Started Learning Coding",
		"date": "2023-01-10",
		"category": "education",
		"description": "Began learning HTML, CSS, and JavaScript fundamentals."
	},
	{
		"id": 2,
		"slug": "built-first-project",
		"title": "Built First Project",
		"date": "2023-06-15",
		"category": "project"
	}
]
```

- GET `/api/timeline/:id`
	- Returns: `200` with a single event object when found.
	- If the `id` does not exist, returns `404` with body `{ "message": "Event not found" }`.
	- Example:

```bash
curl http://localhost:3000/api/timeline/1
```

Example response when missing:

```json
{ "message": "Event not found" }
```

Implementation notes:

- See [src/app/api/timeline/route.js](src/app/api/timeline/route.js) — it imports `src/data/timeline.json` and returns it as JSON.
- See [src/app/api/timeline/[id]/route.js](src/app/api/timeline/[id]/route.js) — it finds an event by `id` and returns `404` using NextResponse if not found.



## Data format

Each event object in `src/data/timeline.json` contains many fields used by the UI (examples):

```json
{
	"id": 1,
	"slug": "started-learning-coding",
	"title": "Started Learning Coding",
	"date": "2023-01-10",
	"category": "education",
	"status": "Completed",
	"description": "Began learning HTML, CSS, and JavaScript fundamentals.",
	"technologies": ["HTML","CSS","JavaScript"]
}
```


## Dependencies (high-level)

Key dependencies listed in `package.json`:

- `next` — application framework
- `react`, `react-dom` — UI library
- `@mui/material`, `@mui/lab`, `@mui/icons-material` — Material UI
- `@emotion/react`, `@emotion/styled` — styling for MUI
- `framer-motion` — animations

See the full `package.json` for exact versions.



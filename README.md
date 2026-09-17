# Keerthan Karne — Portfolio (React + Express)

Assignment 3: the Assignment 2 React portfolio now backed by a live Node.js/Express
API. Navbar, routing, theme toggle, and page structure are unchanged — only the
data source for projects and the destination of the contact form have moved
from static/client-only to a real backend.

## Project layout

```
/               React frontend (Assignment 2, unchanged except the 3 files below)
  src/
    pages/Projects.jsx        ← now fetches from GET /api/projects
    pages/ProjectDetail.jsx   ← now fetches from GET /api/projects/:id
    components/ContactForm.jsx← now POSTs to /api/contact
    config/api.js             ← new: shared API_BASE_URL
  .env.example                ← new: VITE_API_URL

/server         Express backend (new)
  src/
    index.js                  Express app entry point
    routes/projects.routes.js GET /api/projects, GET /api/projects/:id
    routes/contact.routes.js  POST /api/contact, GET /api/contact
    data/projects.js          Project data (moved out of the frontend)
    data/contacts.json        JSON-file storage for contact submissions
    middleware/errorHandler.js 404 + centralized error handling
    utils/validateContact.js  Server-side contact form validation
  .env.example
  postman_collection.json     Importable Postman collection for all endpoints
```

Storage choice: contact submissions are persisted to a plain JSON file
(`server/src/data/contacts.json`), as permitted by the assignment — no
database/ORM was required for this scope.

## Setup / Run

You need **two terminals** running at once.

**Terminal 1 — backend**
```bash
cd server
cp .env.example .env
npm install
npm start        # or: npm run dev (with nodemon)
# → API running on http://localhost:5001
```

**Terminal 2 — frontend**
```bash
cp .env.example .env        # sets VITE_API_URL=http://localhost:5001
npm install
npm run dev                 # → http://localhost:5173
```

With both running, the Projects page, project detail pages, and contact form
all talk to the live API. Stopping the backend and reloading the Projects
page (or submitting the contact form) shows a friendly error message instead
of a blank page or crash; restarting the backend recovers it without any
code change.

## API Endpoints

### `GET /`
Health check.
```json
// 200 OK
{ "status": "ok" }
```

### `GET /api/projects`
Returns every project.
```json
// 200 OK
[
  {
    "id": 1,
    "title": "Portfolio Website",
    "description": "…",
    "techStack": ["React", "Vite", "React Router", "CSS"],
    "image": "/images/projects/portfolio.png",
    "link": "https://github.com/keerthankarne/protfolio_react"
  }
]
```

### `GET /api/projects/:id`
```json
// 200 OK
{ "id": 1, "title": "Portfolio Website", "...": "..." }
```
```json
// 404 Not Found (unknown id)
{ "error": "Project not found" }
```

### `POST /api/contact`
Body: `{ "name": string, "email": string, "message": string }`
```json
// 201 Created
{
  "message": "Thanks! Your message has been received.",
  "submission": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Loved your portfolio!",
    "submittedAt": "2026-09-17T12:40:35.039Z"
  }
}
```
```json
// 400 Bad Request (missing/invalid fields)
{
  "error": "Validation failed",
  "fields": { "email": "Email format is invalid." }
}
```

### `GET /api/contact`
Returns every stored submission, for verification.

> ⚠️ **This endpoint has no authentication.** It's intentionally open for
> assignment-evaluation purposes only — do not deploy this as-is with real
> user data.

```json
// 200 OK
[ { "id": 1, "name": "Jane Doe", "email": "jane@example.com", "message": "...", "submittedAt": "..." } ]
```

### Any undefined route
```json
// 404 Not Found
{ "error": "Route GET /api/doesnotexist not found" }
```

## Testing the API

Import `server/postman_collection.json` into Postman, or use curl:

```bash
curl http://localhost:5001/
curl http://localhost:5001/api/projects
curl http://localhost:5001/api/projects/1
curl http://localhost:5001/api/projects/999          # 404
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","message":"Hi!"}'
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"bad","message":""}'          # 400
curl http://localhost:5001/api/contact
curl http://localhost:5001/api/doesnotexist            # 404
```

## Environment variables

**server/.env**
| Variable | Purpose |
|---|---|
| `PORT` | Port the Express server listens on |
| `CLIENT_ORIGIN` | Origin allowed by CORS (your Vite dev server) |
| `CONTACTS_FILE` | Path to the JSON file used for contact storage |

**.env** (frontend root)
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL the React app calls for the API |

No secrets are committed — only `.env.example` files are tracked; each real
`.env` is git-ignored.

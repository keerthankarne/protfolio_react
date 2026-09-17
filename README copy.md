# Keerthan Karne — Portfolio (React)

This is Assignment 2 — I took the static portfolio from Assignment 1 and rebuilt it as an actual React app: componentized, stateful, and routed, using Vite + `react-router-dom`.

## Running it

```bash
npm install
npm run dev        # dev server, usually localhost:5173
npm run build       # production build into dist/, should build clean with no console errors
npm run preview     # serve that production build locally
```

No env variables, no backend — nothing else needed for this assignment.

## How it's put together

`main.jsx` wraps everything in `BrowserRouter`, then a `ThemeProvider` (this is where the dark/light theme context lives), then `App`, which just holds all the routes.

`Layout` wraps every page — it's the Navbar + `<Outlet/>` + Footer, and it persists across route changes so the nav bar doesn't remount every time you click a link.

Pages:
- **Home** — has a fake ~1s loading screen on mount via `useEffect`
- **About** — background image + scroll-reveal animations
- **Skills** (at `/skills`) — renders the `Skills` component, which has a hover-to-pause marquee and skill category cards
- **Projects** — loops over `data/projects.js` and renders a `ProjectCard` for each
  - `ProjectCard` gets a full project object as props, and passes just the `techStack` part down to `TechStack` (this is the prop-drilling demo)
- **ProjectDetail** — reads `:projectId` from the URL with `useParams` and looks the project up
  - also uses `TechStack`
- **Contact** — has `ContactForm`, a fully controlled form with its own validation
- **NotFound** — catch-all 404 route

Two components get reused all over the place: `MaskedText` (the animated smoke-masked logo text in the navbar) and `Reveal` (an `IntersectionObserver` wrapper that fades things in as you scroll to them).

## Why I made these state decisions

**Theme (dark/light)** is the one thing I lifted into Context instead of just passing it around as a prop. The toggle button lives in the Navbar, which is inside Layout, but the effect that actually reacts to a theme change (saving to `localStorage`, setting `data-theme` on `<html>`) needs to live higher up. Passing it as a prop would've meant threading it through `App → Layout → Navbar` for no real reason, so Context made more sense here.

**Prop drilling** — the assignment wanted an explicit 2-level example, so I did that with the project data instead of theme: `Projects` owns the `projects` array and hands a full project object to `ProjectCard` as props. `ProjectCard` then only pulls out `techStack` and passes just that one level further down into `TechStack`, which has no idea what the rest of the project object even looks like.

**The "View details" expand/collapse** on each project card is local state inside that specific `ProjectCard` instance — on purpose, to show that expanding one card doesn't touch any of the others. I didn't lift it.

**The contact form** is fully controlled — `values` (name/email/message), `touched`, and a derived `errors` object all live inside `ContactForm`. The submit button stays disabled until `errors` is empty.

## `useEffect` hooks — what each one's actually doing

- **`Home.jsx`** (`[]`) — fakes a ~1s loading sequence with `setTimeout` on mount, cleans up with `clearTimeout` in case you navigate away before it fires
- **`ThemeContext.jsx`** (`[theme]`) — every time `theme` changes, saves it to `localStorage` and sets `data-theme` on `<html>` so a refresh (or anything else reading that attribute) sees the current value. The initial theme itself is read synchronously in `useState`'s initializer, not in an effect, so there's no flash of the wrong theme on load
- **`Navbar.jsx`** (resize listener, `[]`) — tracks window width for the mobile menu breakpoint, removes the listener on unmount
- **`Navbar.jsx`** (scroll listener, `[]`) — a separate effect that toggles the navbar's blurred/solid background once you scroll past the hero, also cleaned up on unmount
- **`Reveal.jsx`** (`[]`) — sets up an `IntersectionObserver` per instance, fades/slides content in the first time it hits the viewport, then disconnects itself. Used on About, Projects, Skills, Contact, and ProjectDetail

## Folder structure

```
src/
  components/   Navbar, Footer, Layout, MaskedText, Reveal, ProjectCard,
                TechStack, Skills, ContactForm
  pages/        Home, About, SkillsPage, Projects, ProjectDetail, Contact, NotFound
  data/         projects.js
  context/      ThemeContext.jsx
  assets/       images
  styles/       tokens.css (design tokens / CSS variables)
```

## Other notes

No state library, no UI component library — just `useState`/`useEffect`/props/Context and plain CSS. Responsive at ≤768px and ≤480px. Tried to keep things semantic (`nav`/`main`/`section`/`footer`) with visible focus states, and `prefers-reduced-motion` is respected for anyone who's got that turned on.

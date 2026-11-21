# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal site that shows a force-directed "knowledge graph" of Grayson Penland. It is live at https://graysonpenland.com. There is no build step, package manager, linter or test suite. The whole site is two files:

- `index.html`: the app (CSS, physics simulation, React components), all inline.
- `graph-data.yaml`: all content (nodes, links, side-panel text). Its header comment documents the schema. Read it before editing content.

## Running locally

The page loads its data with `fetch()`, so opening it directly over `file://` won't work. Serve it from the repo root:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/. The browser caches `graph-data.yaml` aggressively, so use a hard refresh (Cmd-Shift-R) after editing it. `.claude/launch.json` has a `graph-site` config for the same server.

## Deployment

The site is a Sevalla static site called "PersonalGraph" with auto-deploy on. It serves the repo root and has no build command. **Every push to `main` deploys to production.** DNS is in Cloudflare: `graysonpenland.com` is a CNAME to `to.kinsta.page`, set DNS-only (not proxied) so Sevalla can issue SSL. The page must stay named `index.html` for the root URL to work.

## How `index.html` fits together

React 18, Babel standalone (JSX compiled in the browser) and js-yaml load from unpkg as pinned `<script>` tags. The page then runs these inline scripts in order:

1. **Data loader** (plain `<script>`): fetches and parses the YAML. It turns each node's `children` into `"tree"` links and its `connects` into `"cross"` links. It logs `[graph-data]` console warnings for unknown ids and orphan nodes, rather than failing. It then sets `window.GRAPH = { nodes, links, adj, degree }` and dispatches a `graphready` event. `links` are `[source, target, type]` tuples, and `adj` maps each id to a `Set` of neighbor ids.
2. **`Sim` class** (plain `<script>`, exported as `window.Sim`): a hand-rolled force simulation with O(n²) repulsion, spring links, center gravity, drag pinning and bounds padding. `_build()` sets the initial layout: hubs on a ring, leaves fanned out beyond their hub. It also sets the load-in sequence: each node has `spawnMs`, `alive`, `parent` and `dir`. Until its spawn time a node rides on its parent and is skipped by the force calculations. Reduced-motion users get every node spawned at 0ms.
3. **`components.jsx`** (`type="text/babel"`): `GraphView` runs a `requestAnimationFrame` loop that ticks the sim and re-renders the whole SVG every frame. The other components are `Panel` (the side panel driven by the node's `panel` field), `TopBar` and `StatusBar`.
4. **`app.jsx`**: `App` holds the `dark` and `selectedId` state. It mounts once `graphready` fires.

### Visual state rules worth knowing before tweaking styles

There are two separate fading systems, which are easy to confuse:

- **At rest** (nothing hovered or selected): leaf nodes get `.node-g.leaf-hidden` and leaf links get `.link.leaf-link-hidden`. This is what "dim nodes" means when looking at the page without interacting.
- **While a node is hovered or selected**: nodes outside its neighbor set get `.node-g.dim` (dot opacity in CSS) plus a JS-computed `labelOpacity`. Unrelated links get `.link-dim`.

Leaf label opacity at rest is also set separately in JS (`labelOpacity`), and it multiplies with the group opacity.

Node color comes from `colorFor()`, which currently returns the single `ACCENT` color for every node. The YAML `group` field is kept but doesn't affect color right now.

The load-in animation is in two layers. The physics (`Sim`, timed in sim ticks of about 16.67ms each) moves nodes out from their parents. A CSS animation (`.node-pop` / `.link-in`) scales and fades each node and link, with `animationDelay` set from `spawnMs`. Change the timings in both places together.

## Content notes

- Everything in `graph-data.yaml` is published on the public site and the public GitHub repo. Don't add private contact details. A phone number was previously scrubbed from git history.
- Contact info and the center node's links include an email address on purpose.

# quietprint

A calm, editorial, typography-first Hugo theme built for
[kirillbobyrev.com](https://kirillbobyrev.com): prose-focused pages, a manual
light/dark toggle, reading progress, a table of contents on long posts, and a
couple of small interactive pages (an SVG places map, a "taste" grid).

This theme lives in the same repo as the site that uses it
(`themes/quietprint/`), wired in via `theme = "quietprint"` in the site's
`hugo.toml`. It owns presentation only — `layouts/`, `assets/`
(CSS/JS/OG-image fonts), and `static/fonts/` (webfonts). Site-level
`content/`, `data/`, `archetypes/`, and the rest of `static/` stay at the
repo root and are layered on top by Hugo.

## Content contract

Since content and theme are now separate, this is the interface between
them: what the site's content needs to provide for this theme to render it
correctly. A replacement theme would need to support the same contract (or
the content would need to change).

### Front matter

| Field | Where | Purpose |
| --- | --- | --- |
| `title`, `description`, `publishDate`, `draft` | any page | standard Hugo fields; used in `<title>`/meta, blog listings, RSS |
| `tagline` | home page (`content/_index.md`) | subhead rendered under the site title on `home.html` |
| `layout` | `content/now.md`, `content/places.md`, `content/taste.md` | selects the theme's `now.html` / `places.html` / `taste.html` templates instead of the default `page.html` |
| `menu = "main"`, `weight` | a section's `_index.md` (e.g. `content/blog/_index.md`) | adds the section to the header nav, in `weight` order |
| `image` | blog post front matter | thumbnail shown in the blog timeline entry (`_partials/blog-timeline-entry.html`) |
| `compact = true` | blog post front matter | renders a condensed timeline entry (no summary paragraph) |

### Data files

- **`data/places.toml`** — `[[places]]` array, each with `city`, `country`
  (Natural Earth common English name — see `assets/js/places.js` for the
  alias map covering names that differ), `lat`, `lon`, and a free-form
  `when` string. Rendered by `layouts/places.html` as an SVG world map (dots
  + visited-country tint) plus a by-country list.
- **`data/taste.toml`** — either a `[football]` table with `groups` (each a
  `label` + `items`, where each item is `{ file, name, note }` pointing at an
  SVG in `static/crests/`), or one or more generic `[[sections]]` entries
  with their own `items`. Rendered by `layouts/taste.html` as a crest grid /
  list.

### Other assumptions

- `static/crests/*.svg` — crest images referenced by `data/taste.toml`.
- `static/data/countries-*.json` — Natural Earth TopoJSON backing the
  `/places` map (`layouts/places.html` + `assets/js/places.js`).
- `static/embeds/*.html` — standalone iframe demos referenced via the
  `{{< embed >}}` shortcode.
- `[params.author]`, `[params.social]`, `[params.description]`,
  `[services.googleAnalytics]` in the site's `hugo.toml` — author name,
  social handles (GitHub/Twitter/LinkedIn/Instagram icons in the footer),
  default meta description, and the GA property ID.

## Swapping this theme out later

1. Add a sibling directory, e.g. `themes/<new-theme>/`, with its own
   `layouts/`/`assets/`/`static/` implementing the content contract above.
2. Change `theme = "quietprint"` to `theme = "<new-theme>"` in the site's
   `hugo.toml`.

No changes to `content/`, `data/`, or `archetypes/` should be required.

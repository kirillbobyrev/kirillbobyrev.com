# typewriter

A warm, quiet, editorial Hugo theme built for
[kirillbobyrev.com](https://kirillbobyrev.com), loosely in the spirit of
[brentfitzgerald.com](https://brentfitzgerald.com): one voice, Space
Grotesk, for the site title, every heading, and body copy alike (JetBrains
Mono kept for code only), a paper-toned palette, thin hairline rules, and
compact date-first blog listings. It keeps
the interactive touches from its sibling theme `quietprint` that the
reference site doesn't have: a manual light/dark toggle, reading progress,
and a table of contents on long posts.

This theme lives in the same repo as the site that uses it
(`themes/typewriter/`), wired in via `theme = "typewriter"` in the site's
`hugo.toml`. It owns presentation only — `layouts/`, `assets/`
(CSS/JS/OG-image fonts), and `static/fonts/` (webfonts). Site-level
`content/`, `data/`, `archetypes/`, and the rest of `static/` stay at the
repo root and are layered on top by Hugo.

## Content contract

Since content and theme are separate, this is the interface between them:
what the site's content needs to provide for this theme to render it
correctly. Identical to `themes/quietprint`'s contract, since both themes
render the same site content.

### Front matter

| Field                                          | Where                                                   | Purpose                                                                           |
| ---------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `title`, `description`, `publishDate`, `draft` | any page                                                | standard Hugo fields; used in `<title>`/meta, blog listings, RSS                  |
| `tagline`                                      | home page (`content/_index.md`)                         | subhead rendered under the site title on `home.html`                              |
| `layout`                                       | `content/now.md`                                        | selects the theme's `now.html` template instead of the default `page.html`        |
| `menu = "main"`, `weight`                      | a section's `_index.md` (e.g. `content/blog/_index.md`) | adds the section to the header nav, in `weight` order                             |
| `image`                                        | blog post front matter                                  | thumbnail shown in the blog timeline entry (`_partials/blog-timeline-entry.html`) |
| `compact = true`                               | blog post front matter                                  | renders a condensed timeline entry (no summary paragraph)                         |

### Other assumptions

- `static/crests/*.svg` — club crest images rendered inline via the
  `{{< crests >}}` shortcode.
- `static/embeds/*.html` — standalone iframe demos referenced via the
  `{{< embed >}}` shortcode.
- `[params.author]`, `[params.social]`, `[params.description]`,
  `[services.googleAnalytics]` in the site's `hugo.toml` — author name,
  social handles (GitHub/Twitter/LinkedIn/Instagram icons in the footer),
  default meta description, and the GA property ID.

## Swapping this theme out later

1. Add a sibling directory, e.g. `themes/<new-theme>/`, with its own
   `layouts/`/`assets/`/`static/` implementing the content contract above.
2. Change `theme = "typewriter"` to `theme = "<new-theme>"` (e.g. back to
   `"quietprint"`) in the site's `hugo.toml`.

No changes to `content/`, `data/`, or `archetypes/` should be required.

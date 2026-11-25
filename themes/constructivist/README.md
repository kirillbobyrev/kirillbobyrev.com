# constructivist

An editorial-modernist Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com): a warm paper/near-black
palette that follows the OS light/dark setting, with one brick-red accent
used sparingly (a heading's trailing dot, hover, links inside articles).
Source Serif 4 for everything read in runs, Space Grotesk for everything
scanned (headings, nav, dates, contents, captions, tables), JetBrains Mono
only inside code. Articles borrow lexi-lambda's hanging section heads and
colored links, with the date and contents in a left rail on wide screens.
The header is sticky, collapsing to Cyrillic initials on phones.

This theme lives in the same repo as the site that uses it
(`themes/constructivist/`) and is wired in with `theme = "constructivist"`
in the site's `hugo.toml`.

## Structure

- `assets/css/` - `fonts.css`, `tokens.css` (sizes, spacing, colors), `base.css`,
  `layout.css` (header, page headers, Writing index), `article.css` (post
  header, contents rail), `prose.css` (Markdown content), `blocks.css`
  (figures, code, math, diagrams), `syntax.css`, `print.css`; each holds
  its own phone overrides. `main.css` `@import`s them in cascade order and
  `_partials/css.html` bundles them with `css.Build`, inlined in production.
- `assets/js/` - `toc.js` (contents collapse and section tracking),
  `analytics.js` (Google Analytics, loaded when idle), `mermaid.js`.
  `_partials/script.html` builds each with `js.Build` and inlines it.
- `layouts/_markup/` - render hooks: responsive images, wrapped tables,
  KaTeX math, Mermaid code blocks, and GitHub-style alerts (`> [!NOTE]`,
  `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`).

## Content contract

Content and theme are separate; this is what the site's content provides
for the theme to render it.

### Front matter

| Field                                          | Where                                    | Purpose                                                                          |
| ---------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `title`, `description`, `publishDate`, `draft` | any page                                 | standard Hugo fields; `<title>`/meta, the Writing index, RSS, the OG card        |
| `deck`                                         | blog post                                | optional 1-2 sentence subtitle under the post title                              |
| `toc`                                          | blog post                                | force the table of contents on or off (default: on for 1500+ words, 3+ headings) |
| `tagline`                                      | home page (`content/_index.md`)          | optional lede under the "About." heading                                         |
| `layout = "now"`                               | `content/now.md`                         | selects `now.html` (an "Updated" line from `lastmod`) instead of `page.html`     |
| `menu = "main"`, `weight`                      | a section's `_index.md` or a single page | adds it to the header nav, in `weight` order                                     |

### Site config (`hugo.toml`)

| Field                                                        | Purpose                                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `[params.author] name`                                       | author meta and structured data                                          |
| `[params.social] github`, `twitter`, `linkedin`, `instagram` | the arrow-link row on the About page; `twitter` also sets `twitter:site` |
| `params.description`, `params.images`                        | fallback meta description and OG image for pages without their own       |
| `[services.googleAnalytics] id`                              | Google Analytics, loaded once the page is idle (production builds only)  |

### Markdown

Beyond CommonMark and GFM tables/footnotes: `~sub~`, `^sup^`,
`==mark==`, `++insert++` and `~~delete~~` (Goldmark extras; single-tilde
strikethrough is off since it collides with subscript), `\( \)` /
`\[ \]` / `$$` math, ` ```mermaid ` diagrams, and alerts. A standalone
image becomes a full-width figure, its title the caption.

### Other assumptions

- `static/crests/*.svg` - club crests for the `{{< crests >}}` shortcode.

There is no sitewide footer: the social row is About-page-only chrome,
not repeated on every page.

## Previewing

```sh
hugo server -D
```

# paper

A quiet, book-like Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com), after Tufte CSS: ink on
warm paper (following the OS light/dark setting), one dark-red accent for
link underlines and hover, and a single typeface,
[ET Book](https://github.com/edwardtufte/et-book), for everything -
sizes on one major-third scale around 20px running text, large
regular-weight titles and subheads, italic meta lines, in a column of
~80 characters that widens a little on big monitors. JetBrains Mono
only inside code. There is no header bar: the name and nav sit on the
column's edges and scroll away; the resume is linked from the About page
rather than the nav. Long articles get a contents list in the left
margin on wide screens.

This theme lives in the same repo as the site that uses it
(`themes/paper/`) and is wired in with `theme = "paper"`
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
| `tagline`                                      | home page (`content/_index.md`)          | optional lede under the name on the home page                                    |
| `layout = "now"`                               | `content/now.md`                         | selects `now.html` (an "Updated" line from `lastmod`) instead of `page.html`     |
| `menu = "main"`, `weight`                      | a section's `_index.md` or a single page | adds it to the header nav, in `weight` order                                     |

### Site config (`hugo.toml`)

| Field                                                        | Purpose                                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `[params.author] name`                                       | author meta and structured data                                         |
| `[params.social] github`, `twitter`, `linkedin`, `instagram` | the slash-separated links on About; `twitter` also sets `twitter:site`  |
| `params.description`, `params.images`                        | fallback meta description and OG image for pages without their own      |
| `[services.googleAnalytics] id`                              | Google Analytics, loaded once the page is idle (production builds only) |

### Markdown

Beyond CommonMark and GFM tables/footnotes: `~sub~`, `^sup^`,
`==mark==`, `++insert++` and `~~delete~~` (Goldmark extras; single-tilde
strikethrough is off since it collides with subscript), `\( \)` /
`\[ \]` / `$$` math, ` ```mermaid ` diagrams, and alerts. A standalone
image becomes a full-width figure, its title the caption. Footnotes
become sidenotes in the right margin on wide screens (84rem+), built
from the rendered footnotes by `_partials/sidenotes.html`, and stay as
endnotes below that. Figures and diagrams stay centered on the column.

### Other assumptions

- `static/crests/*.svg` - club crests for the `{{< crests >}}` shortcode.

There is no sitewide footer: the social row is About-page-only chrome,
not repeated on every page.

## Previewing

```sh
hugo server -D
```

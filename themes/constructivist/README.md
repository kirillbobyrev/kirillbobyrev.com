# constructivist

An editorial-modernist Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com), with a quiet constructivist
accent: a warm paper/near-black palette (light and dark are the same
palette inverted, not separate designs) with one brick-red accent used
sparingly (a heading's trailing dot, hover, links inside articles). Two
families split by job: Source Serif 4 for everything read in runs (body,
lists, quotes, the lede and deck) and Space Grotesk for everything scanned
(headings, wordmark, nav, dates, the contents rail, captions, tables);
JetBrains Mono only inside actual code. Six fixed type sizes, restrained
hierarchy, no tiny uppercase-tracked metadata (think iA, Anthropic's
research blog, Increment, Stripe Press, Works in Progress); articles
borrow lexi-lambda's hanging section heads and colored links. The header is
static on desktop and a sticky one-line bar with Cyrillic initials on
mobile; the theme toggle is a plain half-filled circle.

This theme lives in the same repo as the site that uses it
(`themes/constructivist/`) and is wired in with `theme = "constructivist"`
in the site's `hugo.toml`.

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
| `[params.author] location`                                   | optional eyebrow line above the "About." heading                         |
| `[params.social] github`, `twitter`, `linkedin`, `instagram` | the arrow-link row on the About page; `twitter` also sets `twitter:site` |
| `[params.social] email`                                      | optional "Email" entry in that row                                       |
| `params.description`, `params.images`                        | fallback meta description and OG image for pages without their own       |
| `[services.googleAnalytics] id`                              | Google Analytics, loaded once the page is idle (production builds only)  |

### Other assumptions

- `static/crests/*.svg` - club crests for the `{{< crests >}}` shortcode.
- `static/embeds/*.html` - standalone iframe demos for the `{{< embed >}}`
  shortcode.

There is no sitewide footer: the social row is About-page-only chrome,
not repeated on every page.

## Previewing

```sh
hugo server -D
```

A build can be sanity-checked the same way:

```sh
hugo --gc --minify -d /tmp/constructivist-build
```

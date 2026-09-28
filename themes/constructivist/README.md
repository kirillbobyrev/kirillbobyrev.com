# constructivist

An editorial-modernist Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com), with a quiet constructivist
accent: a warm paper/near-black palette (light and dark are the same
palette inverted, not separate designs) with one brick-red accent used
sparingly (a heading's trailing dot, a link on hover). One typeface, Space
Grotesk, for everything; Space Mono appears only inside actual code. Five
fixed type sizes, restrained hierarchy, no tiny uppercase-tracked metadata
(think iA, Anthropic's research blog, Increment, Stripe Press, Works in
Progress). The header is static on desktop and a sticky one-line bar with
Cyrillic initials on mobile; the theme toggle is a plain half-filled
circle.

This theme lives in the same repo as the site that uses it
(`themes/constructivist/`), same layered convention as its sibling theme
`typewriter`, and is the active theme (`theme = "constructivist"` in the
site's `hugo.toml`).

## Content contract

Identical to `themes/typewriter`'s contract (see that theme's README for
the full table), since both themes render the same site content. Two
purely additive, fully optional params this theme also reads, both no-ops
if left unset:

| Field                      | Where       | Purpose                                                                                 |
| -------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `[params.author] location` | `hugo.toml` | eyebrow line above the "About." heading (e.g. `location = "Mountain View, California"`) |
| `[params.social] email`    | `hugo.toml` | adds an "Email" entry to the arrow-link row on the About page                           |

Deliberately different from `typewriter`: there is no sitewide footer. The
social arrow-link row is About-page-only chrome, not repeated on every
page.

## Previewing

```sh
hugo server -D
```

A build can be sanity-checked the same way:

```sh
hugo --gc --minify -d /tmp/constructivist-build
```

## Switching back to a sibling theme

Change `theme = "constructivist"` to `theme = "typewriter"` in the site's
`hugo.toml`; it implements the same content contract, so no changes to
`content/`, `data/`, or `archetypes/` are required. To preview it without
switching the live config, pass `--theme typewriter` to `hugo
server`/`hugo` for that invocation only.

# constructivist

A poster-like, constructivist-inspired Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com): a warm near-black default
(light mode is the same palette inverted, not a separate design) with one
brick-red accent that stays constant across both modes, Space Grotesk for
display type and body prose,
Space Mono for everything that functions as a label - the site mark, nav,
dates, tables, code, and the numbered "01 / Section Name" headings that
run through every page's prose. The header condenses to initials on
scroll; the theme toggle is a plain half-filled circle rather than a
sun/moon swap.

This theme lives in the same repo as the site that uses it
(`themes/constructivist/`), same layered convention as its sibling themes
`typewriter` and `quietprint`. It is **not** wired in via `hugo.toml` yet -
see "Previewing" below.

## Content contract

Identical to `themes/typewriter`'s contract (see that theme's README for
the full table), since all three themes render the same site content. Two
purely additive, fully optional params this theme also reads, both no-ops
if left unset:

| Field                      | Where       | Purpose                                                                                 |
| -------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `[params.author] location` | `hugo.toml` | eyebrow line above the "About." heading (e.g. `location = "Mountain View, California"`) |
| `[params.social] email`    | `hugo.toml` | adds an "Email" entry to the arrow-link row on the About page                           |

Deliberately different from `typewriter`/`quietprint`: there is no
sitewide footer. The social arrow-link row is About-page-only chrome, not
repeated on every page.

## Previewing without switching the live theme

`hugo.toml` still has `theme = 'typewriter'`. To look at this theme
locally without touching that:

```sh
hugo server -D --theme constructivist
```

(`--theme` overrides the config value for that invocation only.) A build
can be sanity-checked the same way:

```sh
hugo --gc --minify --theme constructivist -d /tmp/constructivist-build
```

## Switching it in for real

Change `theme = "typewriter"` to `theme = "constructivist"` in the site's
`hugo.toml`. No changes to `content/`, `data/`, or `archetypes/` are
required.

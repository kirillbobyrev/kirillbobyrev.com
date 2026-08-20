# constructivist

An editorial-modernist Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com), with a quiet constructivist
accent: a warm near-black default (light mode is the same palette
inverted, not a separate design) with one brick-red accent used sparingly
(a heading's trailing dot, the rule beneath it, a link on hover), not
scattered through the page. One typeface, Space Grotesk, for everything;
Space Mono appears only inside actual code. Five fixed type sizes, no
one-off values, restrained hierarchy, no tiny uppercase-tracked metadata:
generous reading size and quiet typography over decoration (think iA,
Anthropic's research blog, Increment, Stripe Press, Works in Progress).
The header condenses to initials on scroll; the theme toggle is a plain
half-filled circle rather than a sun/moon swap; a small circle/square/
diamond mark sits on the "About." heading's own line, straight from the
source design.

This theme lives in the same repo as the site that uses it
(`themes/constructivist/`), same layered convention as its sibling themes
`typewriter` and `quietprint`, and is the active theme (`theme =
"constructivist"` in the site's `hugo.toml`).

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

## Previewing

```sh
hugo server -D
```

A build can be sanity-checked the same way:

```sh
hugo --gc --minify -d /tmp/constructivist-build
```

## Switching back to a sibling theme

Change `theme = "constructivist"` to `theme = "typewriter"` (or
`"quietprint"`) in the site's `hugo.toml`; each implements the same
content contract, so no changes to `content/`, `data/`, or `archetypes/`
are required. To preview one without switching the live config, pass
`--theme <name>` to `hugo server`/`hugo` for that invocation only.

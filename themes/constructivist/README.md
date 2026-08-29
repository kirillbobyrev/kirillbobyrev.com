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
(`themes/constructivist/`), same layered convention as its sibling theme
`typewriter`, and is the active theme (`theme = "constructivist"` in the
site's `hugo.toml`).

## Keyboard navigation

Vim motions, for readers who never left the home row: `j`/`k` steps through
the posts on the Writing index (and scrolls on a page that has no list),
`gg`/`G` jumps to the top/bottom, `o` (or Enter) opens the selected post,
`?` shows the list and Esc dismisses it. No `/` search (the site has no
index for one to drive) and no Ctrl/Cmd chord anywhere, so no browser
shortcut is ever taken over. Selection is real DOM focus rather than a
bespoke highlight, so it reuses the theme's focus ring and improves Tab
navigation for free. It lives in `layouts/_partials/keyboard-nav.html` and
is entirely additive: with JavaScript off, the site behaves exactly as it
did before.

## Content contract

Identical to `themes/typewriter`'s contract (see that theme's README for
the full table), since all three themes render the same site content. Two
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

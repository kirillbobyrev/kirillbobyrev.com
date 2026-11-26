# paper

A quiet, book-like Hugo theme for
[kirillbobyrev.com](https://kirillbobyrev.com), after
[Tufte CSS](https://edwardtufte.github.io/tufte-css/): ink on warm paper,
one accent color, and
[Newsreader](https://github.com/productiontype/Newsreader) for everything but
code. Footnotes become margin sidenotes on wide screens, and
long articles get a table of contents.

## Content contract

Front matter the theme understands, beyond Hugo's standard fields:

| Field                    | Where                  | Purpose                               |
| ------------------------ | ---------------------- | ------------------------------------- |
| `deck`                   | blog post              | optional subtitle under the title     |
| `toc`                    | blog post              | force the table of contents on or off |
| `tagline`                | home page              | optional lede under the name          |
| `layout = "now"`         | `content/now.md`       | "Updated" line from `lastmod`         |
| `menu = "main"`,`weight` | section or single page | adds it to the nav, in `weight` order |

Site params: `[params.author]`, `[params.social]`, `params.description`, and
`[services.googleAnalytics]` (production builds only).

Markdown supports Goldmark extras (`~sub~`, `^sup^`, `==mark==`,
`++insert++`, `~~delete~~`), `\( \)` / `\[ \]` / `$$` math, ` ```mermaid `
diagrams, and GitHub-style alerts (`> [!NOTE]` and friends). A standalone
image renders as a figure with its title as the caption.

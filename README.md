# [kirillbobyrev.com](https://kirillbobyrev.com)

[![Build and deploy](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml)

My personal website built with [Hugo](https://gohugo.io) (extended, pinned to
`0.168.0` - see `.github/actions/setup-hugo/action.yml` and
`.devcontainer/devcontainer.json`).

Presentation lives in its own theme, `themes/constructivist/` (see its
[README](themes/constructivist/README.md)), wired in via
`theme = 'constructivist'` in `hugo.toml`. `content/`, `data/`, and
`archetypes/` stay at the repo root and are theme-agnostic; trying a
different look later means adding a sibling theme directory and changing
that one config line, without touching content. The previous theme,
`typewriter`, was retired in favour of this one; it's in git history
(`git show 236ca9b:themes/typewriter/README.md`).

CI: pull requests build the site, validate internal links, and check
formatting (`.github/workflows/ci.yml`); merges to `main` build and deploy to
GitHub Pages (`build-and-deploy.yml`), fetching the resume PDF from
[kirillbobyrev/resume](https://github.com/kirillbobyrev/resume)'s releases;
a weekly job checks external links online and files an issue on rot
(`link-check.yml`). Every link check shares `lychee.toml`.

## Develop

```sh
hugo server -D        # live preview with drafts at http://localhost:1313
npm run format        # format the codebase with Prettier (Node: .nvmrc)
npm run check-links   # build and validate links with lychee
```

Prettier formats the codebase - CSS, JS, YAML, JSON, the READMEs, and HTML
templates via
[prettier-plugin-go-template](https://github.com/NiklasPor/prettier-plugin-go-template) -
and CI checks it. Posts, archetypes and static files are left as written
(`.prettierignore`). Two caveats for templates:

- Keep Go template comments (`{{ /* ... */ }}`) on a single line: the plugin
  splits multiline comments across lines, which breaks Hugo's template parser.
- The theme's `layouts/rss.xml` is hand-formatted, since Prettier skips
  `.xml`: the plugin parses input as HTML, where `<link>` is a
  void element, so RSS's `<link>...</link>` container breaks its parser. The
  template uses `{{- -}}` whitespace-trim markers around text content, so
  indentation never leaks into the feed.

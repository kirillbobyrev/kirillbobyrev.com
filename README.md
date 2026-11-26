# [kirillbobyrev.com](https://kirillbobyrev.com)

[![Build and deploy](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml)

My personal website built with [Hugo](https://gohugo.io) (extended, pinned to
`0.168.0` - see `.github/actions/setup-hugo/action.yml` and
`.devcontainer/devcontainer.json`).

Presentation lives in its own theme, `themes/paper/` (see its
[README](themes/paper/README.md)), wired in via
`theme = 'paper'` in `hugo.toml`. `content/`, `data/`, and
`archetypes/` stay at the repo root and are theme-agnostic; trying a
different look later means adding a sibling theme directory and changing
that one config line, without touching content.

CI: pull requests build the site, validate internal links, and check
formatting (`.github/workflows/ci.yml`); merges to `main` build and deploy to
GitHub Pages (`build-and-deploy.yml`), fetching the resume PDF from the
private `kirillbobyrev/resume` repo's releases; a weekly job checks external
links online and files an issue on rot (`link-check.yml`). Every link check
shares `lychee.toml`.

Settings that live outside the code:

- **Settings → Pages → Source** must stay on **GitHub Actions**. Switching it
  to "Deploy from a branch", even briefly, makes GitHub publish a Jekyll render
  of this README over the site until the next deploy.
- The `RESUME_TOKEN` secret is a fine-grained PAT with read-only Contents
  access to `kirillbobyrev/resume`. When it expires, deploys fail at "Fetch
  resume PDF"; regenerate it and run
  `gh secret set RESUME_TOKEN --repo kirillbobyrev/kirillbobyrev.com`.
- The repo stays public: Pages from a private repo needs a paid plan.
- The "Protect main" ruleset blocks force-pushes and deletion of `main`.
  Workflows get a read-only token by default and may only use GitHub-owned
  actions plus `lycheeverse/lychee-action`.

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

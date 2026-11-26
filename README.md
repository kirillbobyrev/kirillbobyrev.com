# [kirillbobyrev.com](https://kirillbobyrev.com)

[![Build and deploy](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml)

My personal website, built with [Hugo](https://gohugo.io) and
deployed to GitHub Pages by GitHub Actions.

Content lives at the repo root (`content/`, `archetypes/`); presentation
lives in its own theme, [`themes/paper/`](themes/paper/README.md).

## Develop

```sh
hugo server -D        # live preview with drafts at http://localhost:1313
npm run format        # format the codebase with Prettier
npm run check-links   # build and validate links with lychee
```

Prettier formats everything except authored content and static files, and
CI checks it. Two caveats for templates:

- Keep Go template comments (`{{ /* ... */ }}`) on a single line: the
  Prettier plugin splits multiline comments, which breaks Hugo's parser.
- `rss.xml` is formatted by hand: the plugin parses templates as HTML, where
  `<link>` is a void element, so it can't handle RSS's `<link>...</link>`.

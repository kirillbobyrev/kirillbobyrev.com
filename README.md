# [kirillbobyrev.com](https://kirillbobyrev.com)

[![Build and deploy](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml)

My personal website built with [Hugo](https://gohugo.io) (extended, pinned to
`0.164.0` — see `.github/workflows/build-and-deploy.yml` and
`.devcontainer/devcontainer.json`).

## Develop

```sh
hugo server -D        # live preview with drafts at http://localhost:1313
npm run format        # format templates with Prettier
npm run check-links   # build and validate links with lychee
```

HTML templates are formatted with Prettier via
[prettier-plugin-go-template](https://github.com/NiklasPor/prettier-plugin-go-template).
Two caveats:

- Keep Go template comments (`{{ /* ... */ }}`) on a single line: the plugin
  splits multiline comments across lines, which breaks Hugo's template parser.
- `layouts/rss.xml` is hand-formatted and excluded: the plugin parses input
  as HTML, where `<link>` is a void element, so RSS's `<link>...</link>`
  container breaks its parser. The template uses `{{- -}}` whitespace-trim
  markers around text content, so indentation never leaks into the feed.

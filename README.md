# [kirillbobyrev.com](https://kirillbobyrev.com)

[![Build and deploy](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/kirillbobyrev/kirillbobyrev.com/actions/workflows/build-and-deploy.yml)

My personal website built with [Hugo](https://gohugo.io) (extended, pinned to
`0.163.0` — see `.github/workflows/build-and-deploy.yml` and
`.devcontainer/devcontainer.json`).

## Develop

```sh
hugo server -D        # live preview with drafts at http://localhost:1313
npm run format        # format templates with Prettier
npm run check-links   # build and validate links with lychee
```

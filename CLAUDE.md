# CLAUDE.md

## Project Overview

Personal blog built with Hugo (static site generator). No external theme - uses custom layouts and CSS.

## Commands

**Development server** (always use these flags for accurate preview):

```sh
hugo server --disableFastRender --noHTTPCache --ignoreCache
```

**Production build:**

```sh
hugo --gc --minify
```

**Format HTML templates:**

```sh
npm run format        # Format layouts
npm run format:check  # Check formatting
```

**Check links locally (requires [lychee](https://github.com/lycheeverse/lychee)):**

```sh
hugo --gc --minify
lychee --offline --no-progress ./public
```

## Architecture

### Content Structure

- `content/` - Markdown files for pages
  - `content/_index.md` - Homepage content
  - `content/blog/` - Blog posts
- Blog posts use standard Hugo front matter (title, date, description)

### Layout System

- `layouts/baseof.html` - Base template that all pages extend
- `layouts/home.html` - Homepage template
- `layouts/single.html` - Individual blog post template
- `layouts/list.html` - Blog listing page
- `layouts/_partials/` - Reusable components (head, header, css, math)
- `layouts/_shortcodes/figure.html` - Custom figure shortcode

### Styling

- `assets/css/main.css` - Single CSS file with all styles
- Uses CSS custom properties for theming (defined in `:root`)

### Math Support

- KaTeX for rendering math (loaded only when page contains math)
- Use `\(...\)` for inline math, `\[...\]` or `$$...$$` for block math
- Hugo's `transform.ToMath` handles server-side rendering

### Static Assets

- `static/images/` - Blog post images
- `static/CNAME` - Custom domain configuration
- Resume PDF is fetched from separate repo during CI build

## Deployment

Automated via GitHub Actions on push to `main`. Builds Hugo site, checks links, and deploys to GitHub Pages.

## Development Workflow

When making visual changes (CSS, layouts, templates), follow this workflow:

1. **Start the dev server:**
   ```sh
   hugo server --disableFastRender --noHTTPCache --ignoreCache
   ```

2. **Validate visually with Playwright MCP:**
   Use `mcp__playwright__browser_navigate` to open `http://localhost:1313` and `mcp__playwright__browser_snapshot` to inspect the page. Check both the homepage and affected blog posts.

3. **Build and check links:**
   ```sh
   hugo --gc --minify
   lychee --offline --no-progress ./public
   ```

4. **Format templates:**
   ```sh
   npm run format
   ```

## Dependencies

- `@playwright/mcp` - Browser automation for visual validation during development
- `lychee` - Fast link checker (install via system package manager or cargo)

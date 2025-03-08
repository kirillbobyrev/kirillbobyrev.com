+++
title = "CSS Variables Reminder"
publishDate = 2024-02-22
+++

CSS variables are defined with two dashes:

```css
:root {
  --primary-color: #3182ce;
}
```

And used with the var() function:

```css
.button {
  background-color: var(--primary-color);
}
```

This enables easy theming and maintenance!

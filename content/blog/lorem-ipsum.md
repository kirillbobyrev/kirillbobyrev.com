+++
title = "Lorem Ipsum"
date = 1996-09-25
tags = ["test", "draft"]
draft = true
math = true
+++

This page is for debugging purposes and to see how the Markdown rendering looks
like.

## H2

### H3

#### H4

## Footnote

Here is a simple footnote[^1]. With some additional text after it.

## Table

| Column 1 | Column 2 |
| --- | --- |
| Value 1 | Value 2 |

## Code

Some text `inline code` some more text.

```c++
class Foo {
public:
  Foo(int x);
};

int main() {
  std::vector vec = {1, 2, 3};
  vec[42] = x;
  std::string s = "Hello, world!";
  return 0;
}
```

And after.

```go {linenos=inline,hl_lines=[8,"15-17"],linenostart=199}
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see https://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
  switch strings.ToLower(style) {
  case "go":
    return strings.Title
  case "chicago":
    return transform.NewTitleConverter(transform.ChicagoStyle)
  default:
    return transform.NewTitleConverter(transform.APStyle)
  }
}
```

## Math

$$
i \hbar \frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat H \Psi(\mathbf{r},t)
$$

## Gist

{{< gist kirillbobyrev 3acb1f32d9333d91c12046df7672bf4b >}}

## YouTube

{{< youtube VhxrFor3VyQ >}}

## Mermaid diagrams

```mermaid
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
```

## Emoji

😀😸🤡💃💅💥⚡✏⚠⤴⤵

:us:

[^1]: My reference.

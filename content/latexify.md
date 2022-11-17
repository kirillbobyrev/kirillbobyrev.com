---
title: "TIL: Latexify translates Python into LaTeX"
date: 2022-11-16
description: ""
kind: idea
tags: []
draft: true
slug: ""
math: true
---

Today I learned about [latexify](https://github.com/google/latexify_py), a small
Python package that helps translate Python functions code into LaTeX. At first
glance, one might use it for:

- Making Jupyter notebooks more readable by folding the code and showing
  LaTeX-rendered definitions of the functions and integrating them into the
  textual.
- Using the LaTeX output to generate parts of scientific papers, thesis or any
  human-readable text.

Let's see what it can do!

## Using `latexify`

Using `latexify` is easy: choose a function you would like to render in LaTeX
and use `@latexify.latexify` Python
[decorator](https://docs.python.org/3/glossary.html#term-decorator):

```python
import latexify
import math

@latexify.function
def foo(x):
  if x < 0:
    return math.floor(x - 5)
  elif 0 <= x and x < 3:
    return 2
  else:
    return math.sin(x) / x
```

If you use it in Jupyter notebook and place `foo` at the end, the code block
will render this:

$$
  \mathrm{foo}(x) =
  \begin{cases}
    \left\lfloor{x - {5}}\right\rfloor, & \mathrm{if} \ {x < {0}} \newline
    {2}, & \mathrm{if} \ {{{0} \le x} \land {x < {3}}} \newline
    \frac{\sin{\left({x}\right)}}{x}, & \mathrm{otherwise} \newline
  \end{cases}
$$

`latexify` uses heuristics to transform commonly used functions like
`math.floor` or `math.sin` into `\lfloor ... \rfloor` and `\sin{...}`
respectively. Under the hood `latexify` uses Python's [Abstract Syntax Tree
library](https://docs.python.org/3/library/ast.html). The core of `latexify`
library is the Abstract Syntax Tree visitor, which is a common pattern in
program analysis. The library code is rather straightforward and easy to
understand, supplemented by well-written documentation, so it's not hard to
understand how it works if you're familiar with Python.

If you're in the terminal, something like this will be the printed out as LaTeX
render of the `foo` function.

```latex
\mathrm{foo}(x) = \left\{ \begin{array}{ll} \left\lfloor{x - {5}}
  \right \rfloor,& \mathrm{if} \ {x < {0}} \\ {2}, &
  \mathrm{if} \ {{{0} \le x} \land {x < {3}}} \\
  \frac{\sin{\left({x}\right)}}{x},
  & \mathrm{otherwise} \end{array} \right.
```

Unfortunately, this isn't formatted LaTeX code which makes it hard to edit
manually (it also uses `array` instead of `cases` which is suspicious). The
other problem is that it renders with [MathJax](https://www.mathjax.org/), but I
had to manually edit LaTeX code above to make render it here in my blog where
I'm using [KaTeX](https://katex.org/).  MathJax looks to be more popular but
KaTeX is much faster, so not being able to use it with `latexify` out of the box
can be a problem.

## Conclusion

`latexify` is a fun library to play with and it's certainly useful when building
Jupyter notebooks, but given low readability of generated code it's probably not
very useful beyond that. It won't make it into the toolbox of libraries I use
every day, but it's still an interesting example of using Python AST library.

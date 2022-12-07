---
title: "Python vs C++ for programming challenges"
date: 2022-11-29
description: ""
kind: engineering
tags: []
draft: true
slug: ""
math: false
---

While in the gym, I started listening to Lex Fridman's [second
episode](https://lexfridman.com/guido-van-rossum-2/) with Guido van Rossum, the
creator of Python programming language. I worked on compilers in LLVM ecosystem
for 6 years, so listening to discussions on programming languages, interpreters
and software performance was a delight.

Another reason why I found this episode interesting is that I used Python a lot
at university and in my personal projects, but I did not write much code in
Python after I started working _in_ and _on_ C++ full-time. Since then, a lot
has happened in the Python world, most notably:

- Getting some typing support in the form of [mypy](http://mypy-lang.org/) and
  [type hints](https://docs.python.org/3/library/typing.html)
- [Sunset](https://www.python.org/doc/sunset-python-2/) of Python 2
- Large performance improvements (e.g. [Python
  3.11](https://docs.python.org/3/whatsnew/3.11.html) release)
- Emergence of better language tools, such as
  [Pylance](https://devblogs.microsoft.com/python/announcing-pylance-fast-feature-rich-language-support-for-python-in-visual-studio-code/)
  and [Poetry](https://python-poetry.org/)

Apart from that, every release gradually brings more nice features (such as
[pattern matching](https://peps.python.org/pep-0636/), [assignment
expressions](https://docs.python.org/3/whatsnew/3.8.html#assignment-expressions),
[positional-only
parameters](https://docs.python.org/3/whatsnew/3.8.html#assignment-expressions)).
The stable flow of quality-of-life improvements is impressive and makes me
enthusiastic about the language future.

In contrast, C++ looks to lag behind in new and exciting features for the
language. A lot of what C++20 and C++23 brings to the table is a port of
existing libraries or something half-baked and not suitable for wide-spread
adoption yet. This might be "the grass is greener on the other side", but since
I have been involved with C++ way more than I ever was with Python, I don't like
the direction C++ and its ecosystem is heading to. The
[sentiment](https://news.ycombinator.com/item?id=33436268) towards C++ is that
it's hard to learn and not enjoyable to use, and I think it's true. Most
universities have switched to Python for introductory Computer Science courses,
and even for the systems programming there are now more exciting options such as
Rust.

This doesn't mean that C++ will die out: just like C, it's here to stay because
of sheer amount of code that is already written in C++ at large companies. This
code will be supported, and that alone would be enough to create demand for a
large number of developers writing C++ code.

However, it feels that new developers are preferring other languages more and
more. And what I found surprising is that when I started interviewing at Google
and chose C++ and Python as preferred languages, the volume of candidates
choosing Python was almost 10 times larger than for those choosing C++.

### Div 1 + Div 2

<https://codeforces.com/contest/1750/>

C++: 21606
Python: 814
Java: 601
Rust: 30

### Div 2 vs. Div 1

#### Div 2

<https://codeforces.com/contest/1754>

C++: 21840
Python: 904
Java: 548

#### Div 1

<https://codeforces.com/contest/1753>

C++: 3460
Python: 87
Java: 21

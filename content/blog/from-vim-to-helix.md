+++
title = "From Vim to Helix"
date = "2023-03-26"
tags = []
draft = true
+++

## How it started

I was introduced to Vim 10 years ago in my first Computer Science class and
since then it was my editor of choice. I spent thousands of hours editing code
and learning how to use Vim efficiently. If you have ever used Vim, you know
that it feels very different from most other IDEs and editors due to its "modal"
design. Learning the commands and getting used to a different way of thinking
can be frustrating at first, but it pays off and in time editing text feels
effortless. Even though writing the code as fast as you can is not the most
important task in the majority of real-life scenarios, it is certainly very
useful and, when you spend most of your time editing code, investing time into
learning good tools is indeed important.

Vim is amazing, but it certainly isn't perfect. Over the years, I have developed
a love-hate relationship with it, often oscillating between minimalistic
`.vimrc` config under a hundred of Vimscript lines and ambitious attemps to craft the
perfect environemnt that will have all the tools I ever need. I think my biggest
mistake was not seeing Vim for what it really is -- a wonderful text editor that
has a lot of flexibility, but not a very good IDE.

Keeping up with a dozen Vim plugins, configuring them, making sure nothing
breaks on updates and is compatible is almost a full-time job. This is obvious
if you think about how these plugins are written: most of them are developed by
hobbyists who just want to make *their* Vim environment better. The problem is
everyone uses different operating systems, software versions and combinations.
Almost inevitably, something breaks. Understanding what went wrong and fixing
it often results in going very deep into the rabbit hole and spending a lot of
time. This often results in a lot of frustration, because most of plugins' code
is not very well-written and docuemented, and Vimscript or Lua being some of
the most popular languages for plugins doesn't make it better. Of course, the
maintainers of these plugins aren't *responsible* for user experience because
most of them write plugins to make their lives easier and just for fun, but as a
user whose job involves using these tools it is indeed very sad to find myself
in the state of everything going wrong very often.

## Real IDEs

All of the above simply means that Vim as an IDE is not a *product*. Very
few people get paid to improve Vim and its plugins and expecting it to behave
exactly as I want is unrealistic. Also, not that many people are trying to use
Vim as an everyday IDE. For that, there are plenty of wonderful IDEs that are
developed by hundreds of developers in large companies. But these IDEs also not
perfect, and I have found that most of them aren't meeting at least one of the
criteria for a desirable tool for me. When I think of an editor that I would
like to use, these are the things I want out of it:

- Cross-platform: I frequently switch between Linux (Arch or Debian derivatives)
  and macOS, and I want the editor to work seamlessly on both of them (ideally
  without platform-specific configuration)
- Fast: most IDEs have very bloated GUIs with a noticeable delay even in medium-
  sized files.
- Language-agnostic: I would like to use a single tool to edit different
  filetypes - C++, Rust, Python, Haskell code, Markdown and HTML for my blog,
  LaTeX for scientific papers and my resume, and occasionally some other
  languages. I don't need much in each of them but syntax highligting, code
  completion, navigation (go to definition, find references), basic refactoring
  (rename a symbol) and diagnostics (show warnings and errors from the compiler,
  linter)
- Good defaults: having spent so much time configuring Vim, I just don't think
  that's a very good use of my time anymore. I'm curious to learn more about the
  tools I am using, but I can't be an expert in every component of the system
  I am using. I would much rather have something that mostly works out of the box
  without much configuration.
- Simple at its core: I think most succesful projects are doomed 

## Back to Vim

## Starting to use Helix

## The power of defaults

## Issues with Helix

### Lack of features

### Differences in key bindings

### Traction

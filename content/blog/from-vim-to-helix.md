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
- Simple at its core: most succesful projects are doomed to accumulate features
  over time, succumbing to numerous user requests and becoming increasingly
  complex. However, some projects avoid the feature bloat by having clear goals
  from the start. Having a tool that doesn't try to do everything at once is
  what I find most useful.

I've tried many IDEs, both proprietary and open source, but most of them
fail don't do well in at least one of these categories. Most IDEs are good at
supporting one language, are very slow and take gigabytes of disk space upon
installation. Also, most of them have an astonishing number of features that
assume the user wants to do everything (run tests, refactor the code, triage
bugs, open pull requests) from the IDE. I'm comfortable with the terminal, so I
don't really need these features. I'd like something simple and yet powerful.

### Visual Studio Code

A notable exception is Visual Studio Code. It's somewhat in the gray zone
between an IDE and text editor, it's an amazing product supported by a very
large community of developers across multiple companies, and the plugins
are amazing. I've started using VSCode a lot and I probably spend around
30% of my coding time using it depending on the mood. I'm not particularly
happy with it being implemented on top of Electron which makes it quite slow
at times. But feature-wise, it's amazing. I love [Settings Sync](https://
code.visualstudio.com/docs/editor/settings-sync) feature and the configuration
is quite easy to edit.

One of the main reasons behind VSCode success is the invention of [Language
Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP).
LSP is an amazing idea, because it specifies a unified way for an editor to talk
to the "Language Server" (plugin). This means that developers working on tools
for a specific language only have to 

## Back to Vim

On the other side of the spectrum

## Starting to use Helix

## The power of defaults

## Issues with Helix

### Lack of features

### Differences in key bindings

### Traction

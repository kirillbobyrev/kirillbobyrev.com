+++
title = 'From Vim to Helix'
date = 2023-04-24
tags = ['tools', 'programming']
+++

I recently came across [Helix editor](https://helix-editor.com/), a modern modal
text editor for the terminal. After almost a decade of using Vim and Neovim, it
feels like it's finally time to try something new!

Although Vim's philosophy, key bindings, and motions have become ingrained in
both my consciousness and subconsciousness over time, I've also encountered
numerous issues with it. Most notably, I tried to turn my Neovim setup into a
full IDE, when in reality it's a text editor that shouldn't be bloated with too
many plugins and tool integrations. I've probably spent hundreds of hours
crafting a perfect `.vimrc` and fixing integration issues with various Linux
distributions and macOS.

Now, I'm switching between Helix editor in the terminal and Visual Studio Code,
spending approximately half my time in each while coding.

## What I like about Helix

One of the things I appreciate about Helix editor is its clear niche. Rather
than trying to be an all-encompassing IDE, it's a simple editor with excellent
[Language Server
Protocol](https://microsoft.github.io/language-server-protocol/) (LSP)
integration and great default settings. I love tools that are designed to serve
a specific purpose well, and I hope Helix stays focused on its core strengths as
it grows in popularity.

Another advantage of Helix is that it was built around LSP from the start. Most
other editors were built before LSP was invented, which meant that they had to
change a lot to integrate LSP into their existing architecture. LSP was a
game-changer in the world of programming language tooling, and having Helix
designed as front-end for LSP from the beginning is a huge advantage.

I also appreciate the fact that Helix is written in Rust, a modern programming
language that offers better code quality and can reduce technical debt in the
long term. Vim, by contrast, was written a long time ago, and its codebase can
be challenging to navigate. By choosing a modern language and development
environment, Helix has more streamlined development process.

Finally, Helix's minimalistic configuration and excellent default settings are a
breath of fresh air after the complexity of Vim and Neovim. While Vim can be a
powerful tool once you've configured it to fit your preferences, getting it to
that point is incredibly difficult. Helix, on the other hand, doesn't require me
to learn Vimscript or Lua, install a dozen plugins, or spend hours tweaking
settings to get it just right or fix a bug.

At the time of writing, my Helix
[config](https://github.com/kirillbobyrev/dotfiles/blob/main/.config/helix/config.toml)
is very simple:

```toml
theme = "gruvbox"

[editor]
line-number = "relative"
mouse = false
true-color = true
rulers = [80]
bufferline = "always"
```

And it's extremely satisfying, because maintaining a config to keep the everyday
tools working hurts a lot. Even my Visual Studio Code configuration file is
quite long and painful to maintain.

## What I am not happy with in Helix

While Helix editor's key bindings are similar to Vim's, they're not identical.
This can be a challenge for experienced Vim users, who may have developed muscle
memory around Vim's specific key bindings and motions. If the bindings were
completely different, it might be easier to treat them as a new skill to learn.
However, because I still use Vim plugins for Visual Studio Code and other IDEs,
maintaining two sets of similar bindings in my subconscious can be challenging.

Another problem is that Helix [documentation](https://docs.helix-editor.com/) is
not very extensive.  While it helps deal with most common problems I encounter,
I still have to go to the GitHub issues or read code whenever I need to
understand something. One of the best things about Vim is the Vimdoc and I hope
Helix gets more coverage of the existing features in a digestible manner.

## Conclusion

That said, I think the benefits of using Helix editor outweigh the challenges of
adjusting to its key bindings. It's clear niche, first-class LSP integration and
streamlined configuration make it a valuable tool for my workflow. While it may
take some time to adjust to its key bindings, I believe it will ultimately be
worth switching to from Vim if you edit code a lot in the terminal.

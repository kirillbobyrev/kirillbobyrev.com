+++
title = "From Vim to Helix"
date = "2023-03-26"
tags = ["Today I Learned"]
+++

I recently learned about [Helix editor](https://helix-editor.com/) --- a modern
modal text editor for terminal. After almost 10 years of using Vim and Neovim it
feels like it's finally time to move on to something else!

Vim's philosophy, key bindings and motions became ingrained in my consciousness
over time, but I've had numerous problems with it, too. Most notably, I was
trying to make a full IDE out of my Neovim setup, and I didn't see the tool for
what it really was: an powerful and extensible text editor that shouldn't be
bloated too much. I have probably spent hundreds of hours crafting my perfect
`.vimrc` and fixing integration issues with several Linux distributions and
macOS. I am now switching to Helix editor in terminal and Visual Studio Code
spending approximately half of the time in each while coding.

Few things I love about Helix compared to Vim:

- Choosing its niche
- Embracing the LSP from the start
- Minimalistic config and great defaults: if you need to do any serious coding,
  Vim is not very useful out of the box. Even if you already know very well what
  you are doing, getting it to a state where just looking at the code and
  changing few lines comfortably will take a while. Neovim improves the defaults
  slightly, but the config will still break from updates very often (especially
  with plugins). Helix, on the other hand, doesn't force me to learn Vimscript
  or Lua, install a dozen plugins and care about everything working well
  together.
- Modern language and development environment:


In the end, I don't want my editor to be extensible in every way, I want the one
that works for me very well in a limited number of scenarios, and Helix is
exactly that. It is still very fresh and, just like any successful project, it
can become a victim of the feature bloat over time, but I hope it stays focused
on the niche it can shine in and continue improving. I look forward to using it
more and enjoying a hassle-free modal text editor in my terminal!

<kbd>Ctrl</kbd> + <kbd>d</kbd>

---
title: "Debugging: from printf to GDB and back again"
date: 2022-11-11
description: ""
kind: engineering
tags: []
draft: true
slug: ""
math: false
---

I started my journey in Software Engineering by writing a program that prints
`Hello, world!` to the terminal. And then I was mainly writing programs that
interact with the terminal at school. A result of these programs would be an
integer or some string printed to the terminal, too. And when something goes
wrong, textbooks and teachers would tell me to print the values of the variables
to the terminal and follow its output to figure out where I made a mistake.

This is often called "print debugging" or
[tracing](https://en.wikipedia.org/wiki/Tracing_(software)). Most beginners
start with this technique because of its simplicity. But when a beginner starts
working on a larger project or with more senior people, tracing for debugging
somehow becomes discouraged and frowned upon. The prevailing sentiment seems to
be that tracing is a technique that professional developers should use
[debugging tools](https://en.wikipedia.org/wiki/Debugger) such as GDB, LLDB, pdb
or built-in visual tools. The problem is, after getting more experience, it
turns out that debugging using print statements isn't bad at all!  In fact, an
astonishing number of great engineers I know have not touched debuggers in
years. So why learn sophisticated tools like GDB at all if one will inevitably
come back to good old `printf`?

To understand that, let's first think why tracing might cause problems.

## Why debuggers may be better than tracing

Tracing produces a history of variable values and some information about the
execution flow. But there are problems with this approach.

### Logs are hard to navigate

Large programs produce thousands of log messages. It's often impossible to
find the right chunk of the log where the problem appears. Navigating large
log files requires text search and filtering tooling and can be a challenge on
its own.

### Understanding program flow from the log is hard

But even after I find the piece of log where there is a problem, it's often hard
to understand what path execution path leads to the bug. Tracing is a view of
program execution _history_ but it doesn't give a good understanding of the
program _flow_ or program _states_ at a particular execution stage.

### Logs trade-off: being useful vs being complete

If I want to change what information to log, I need to re-build the project.
For large projects, it can take a long time. Finding the balance between
printing _just enough_ information, so that it isn't too verbose to find the
problem on one hand, and is enough to understand the problem on the other.  This
often results in iterations and time spent on re-building the project.

### Debugging tools

Debuggers provide a view of program _state_ at particular execution points, and
this is useful to mitigate listed problems. Debuggers make it easier to fully
understand what is happening in the program step-by-step. Debugging tools show
what the user asks for and help to dive deep into the problem I'm trying to
solve. It allows checking more hypothesis about what might have gone wrong. It
also helps inspect information that is not always possible or easy to print, for
example memory layouts and stack traces. Debuggers are certainly more advanced
tools for understanding the program.

At a first glance, debuggers seem far more superior for finding and fixing the
problem, but in reality using them also leads to serious problems.

#### TUI

## Why tracing may be better than debuggers

### Debuggers are hard to use

### Debuggers are slow

### Debuggers are not always available

## Conclusion

Tracing: best when one needs to understand _where_ the problem occurs
Debugging tools: best when one has to fully understand what happens

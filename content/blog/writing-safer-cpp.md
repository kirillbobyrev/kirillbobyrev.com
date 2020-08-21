+++
title = "Writing Safer and Faster C++"
date = 2019-09-20T14:23:43+03:00
draft = true
description = ""
slug = ""
tags = []
series = []
+++

C++ is notoriously difficult. There are software problems related to memory
leaks, undefined behavior and concurrency issues that are easy to miss in C++
code. Noticing these problems and debugging them later on is hard.
Fortunately, there are tools that save the day! In this post I will cover
LLVM-based tools that you can use in your projects to find existing bugs and
prevent new ones, track performance regressions and find bottlenecks, enforce
style guides and ensure stability.

<!--more-->

## Clang-Tidy

## Sanitizers

### Address Sanitizer

### Memory Sanitizer

### Thread Sanitizer

### Other Clang Sanitizers

## Fuzzing

TODO: GitHub Project skeleton (?)

## Clang-Format

## Continuous Integration

### GitHub Actions

### OSS Fuzz

## Measuring performance and finding bottlenecks

### Benchmarks

### Chandler's Cache hits tools and talk?

### gperftools

### KDE Hotspot

## Outro

There are other tools not covered in this post, including
[Valgrind](http://valgrind.org/), ... . However, I decided to cover tools
that I use myself

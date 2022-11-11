---
title: "Writing Safer and Faster C++"
date: 2022-05-14T13:20:52+02:00
draft: false
description: ""
slug: ""
math: false
---

C++ is notoriously difficult. There are software problems related to memory
leaks, undefined behavior and concurrency issues that are easy to miss in C++
code. Noticing these problems and debugging them later on is hard. But there are
instruments that make writing C++ code faster, easier and safer! In this post I
will cover some that you can use in your projects to find existing bugs and
prevent new ones, track performance regressions and find bottlenecks, enforce
style guides and ensure stability.

## Clang-Tidy

## Sanitizers

```c++{hl_lines=[2, 4]}
int main(int argc, char **argv) {
  int *array = new int[100];
  delete [] array;
  return array[argc];  // BOOM
}
```

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

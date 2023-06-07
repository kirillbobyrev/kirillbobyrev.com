+++
title = 'Finding maximum element in C++ is hard'
date = 2023-05-19
tags = []
math = false
draft = true
+++

## TLDR

## Motivation

```c++

```

### Rust

https://web.mit.edu/rust-lang_v1.26.0/arch/amd64_ubuntu1404/share/doc/rust/html/std/f64/constant.MIN.html

## LLVM case study

Real-world example

https://github.com/search?q=repo%3Allvm%2Fllvm-project%20std%3A%3Anumeric_limits%3Cdouble%3E%3A%3Amin&type=code
https://github.com/llvm/llvm-project/blob/6963c61f0f6e4be2039cb45e824ea1e83a8f1526/llvm/unittests/tools/llvm-exegesis/X86/BenchmarkResultTest.cpp#L153

## Recommendation

`std::max_element`

`std::ranges::max_element`

---
title: "Lorem Ipsum"
date: 2021-12-13T13:16:31+01:00
draft: true
description: ""
slug: ""
math: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie velit
sed leo hendrerit pellentesque. Morbi sed libero lorem. Curabitur at maximus
nisi. Donec mattis, massa a pulvinar tristique, libero eros tempor lorem, in
condimentum erat quam malesuada ex. Suspendisse at molestie elit. Donec
fermentum mi nulla, vitae consectetur neque hendrerit eget. Pellentesque
habitant morbi tristique senectus et netus et malesuada fames ac turpis
egestas. Pellentesque non risus id diam porta rutrum. Cras quis vestibulum mi.
Maecenas libero enim, placerat eget purus placerat, tincidunt porta sem. Sed
auctor, sem id pretium ornare, augue metus sollicitudin dolor, non malesuada
orci purus eu urna. Nam mi orci, fermentum sed arcu vel, porttitor rutrum odio.

## Markup

### Code

In vitae efficitur urna. Fusce condimentum commodo dui vitae venenatis. Nam
varius ex at tempus faucibus. Vivamus iaculis nulla enim, ut porttitor ex
condimentum in. Curabitur dignissim tellus dictum, consequat lorem id,
convallis risus. Suspendisse nec varius ligula.

```python{hl_lines=[2, 4]}
def fib(n):    # write Fibonacci series up to n
    """Print a Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

# Now call the function we just defined:
fib(2000)
```

### List

- Element
- Another one
  - Nested

### Math

$$
  i \hbar \frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat H \Psi(\mathbf{r},t)
$$

## Diagrams

### Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### GoaT

```goat
   .---.       .-.        .-.       .-.                                       .-.
   | A +----->| 1 +<---->| 2 |<----+ 4 +------------------.                  | 8 |
   '---'       '-'        '+'       '-'                    |                  '-'
                           |         ^                     |                   ^
                           v         |                     v                   |
                          .-.      .-+-.        .-.      .-+-.      .-.       .+.       .---.
                         | 3 +---->| B |<----->| 5 +---->| C +---->| 6 +---->| 7 |<---->| D |
                          '-'      '---'        '-'      '---'      '-'       '-'       '---'
```

## Text

In vitae efficitur urna. Fusce condimentum commodo dui vitae venenatis. Nam
varius ex at tempus faucibus. Vivamus iaculis nulla enim, ut porttitor ex
condimentum in. Curabitur dignissim tellus dictum, consequat lorem id,
convallis risus. Suspendisse nec varius ligula. Sed venenatis orci non rhoncus
tristique. Curabitur placerat turpis condimentum maximus porta. Sed fermentum
tempus turpis eu maximus.

> Sed non consectetur orci, eget ornare dui. In a pellentesque diam. Duis nec
  mauris mauris. Vivamus magna sapien, porttitor id lacinia tempus, elementum et
  nibh. Phasellus a viverra ligula, et commodo lorem. Aenean ultrices ipsum
  ligula, vel efficitur nunc fringilla eu. Morbi quis erat non lorem sagittis
  congue nec vel orci. Sed egestas ultricies molestie. Vestibulum eu laoreet
  libero, sed maximus velit. Donec vitae mauris tellus. Suspendisse egestas enim
  rutrum turpis tincidunt posuere. Nullam blandit augue a sem hendrerit, eu
  viverra metus tempus. Sed id erat lacus. Integer ante lacus, molestie in enim
  a, pulvinar fermentum urna. Quisque consequat erat eu neque placerat ornare sed
  commodo libero. Donec nulla purus, aliquam id ullamcorper ac, scelerisque
  mollis sem.

Integer aliquet mattis posuere. Phasellus quis vehicula massa. Lorem ipsum
dolor sit amet, consectetur adipiscing elit. Nulla id ultricies arcu, non
finibus erat. Nam tincidunt rhoncus elit et auctor. Phasellus elementum nisi at
molestie laoreet. Pellentesque scelerisque augue blandit sem finibus, vel
egestas nisi aliquam. Vestibulum nulla felis, lacinia eu fermentum vel, semper
eget risus. Aenean porta volutpat lacus, ut fermentum justo bibendum et. Nam
nec tincidunt tortor, iaculis porta massa.

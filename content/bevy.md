---
title: "Bevy, ECS and the future of GameDev"
date: 2022-11-11
description: ""
kind: engineering
tags: []
draft: true
slug: ""
math: false
---

[Bevy](https://bevyengine.org/) is a new up-and-coming game
engine implemented in Rust. It offers a fresh perspective on game development
using [Entity Component
System](https://en.wikipedia.org/wiki/Entity_component_system) (ECS), which
started to get popularity recently. While it's still in early stages of
development, it's already an exciting opportunity to play with some of the ideas
it introduces.

Bevy [0.9 version](https://bevyengine.org/news/bevy-0-9/) just came out, and I
wanted to take an opportunity to share my thoughts about the engine.

## What I like about Bevy

### Entity Component System

Bevy is a data-driven engine that leverages ECS to enable higher degree of
parallelism and be more cache-friendly. It also enforces [composition over
inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance) to make
the arcitecture more
[orthogonal](https://en.wikipedia.org/wiki/Orthogonality_(programming)).

At its core, ECS is simple. There are three main concepts:

- __Entity__ is any object in the game. Players, enemy characters, projectiles,
  and world objects are typically entities in the game. Entity itself does not
  contain any data, it is merely an identifier (think an integer) that the data
  is _associated_ with.
- __Component__ is a property or data associated with an entity. Position in the
  world, velocity or health would be examples of components in the game.
- __System__ is a process that updates desired components of the entities
  according to game logic. For example, health will be updated each frame for
  the entities that were hit by projectiles, positions of the entities will be
  updated according to game physics. In Bevy, systems are Rust functions.

#### Example

Let's take an imaginary game as an example. Here is how what components we might
have:

- `Player` is the main game character
- `Enemy` is a monster in the game
- `Projectile` is a fireball or arrow that either `Player` or `Enemy` can launch

Then, the components could be:

- `Name` to display the `Player`'s

#### Performance and parallelism

#### Composition over inheritance

Pragmatic programming

#### Drawbacks

<https://godotengine.org/article/why-isnt-godot-ecs-based-game-engine>

### Open source

### Community

### Language

#### WASM

## What I wish improves in the future

### Adoption

- More games <https://itch.io/games/tag-bevy>
- More commercial projects using Bevy

### World editor

### Learning resources

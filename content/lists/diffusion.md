+++
title = "Diffusion Models"
description = "Resources on Diffusion, Flow-based, Score-based models and their derivatives"
draft = false
weight = 10
+++

This is a collection of resources mostly focused on text-to-image,
image-to-image generative models.

### MIT IAP 2025 short diffusion courses

Two amazing courses on Diffusion from MIT. The courses feature lecture videos,
code assignments, lecture notes and tons of great materials.

- [Practical Diffusion](https://www.practical-diffusion.org/)
- [Introduction to Flow Matching and Diffusion Models](https://diffusion.csail.mit.edu/)

## Foundational diffusion papers

### [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)

DDPM paper started the modern diffusion model revolution. Introduces the
mathematical framework and training methodology that underlies most current
diffusion models. Essential reading for understanding the fundamentals.

### [Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456)

### [Improved Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2102.09672)

Key improvements to the original DDPM including learned variance, cosine noise
schedule, and importance sampling. These techniques significantly improved
sample quality and are now standard in most implementations.

### [Denoising Diffusion Implicit Models](https://arxiv.org/abs/2010.02502)

DDIM introduces deterministic sampling for diffusion models, enabling faster
generation and meaningful latent space interpolation. This work opened up many
practical applications by reducing sampling time from thousands to tens of
steps.

### [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)

Introduces Latent Diffusion Models (LDM) which allows more efficient training
and inference by avoiding expensive computations in the pixel space. This paper
started Stable Diffusion family of models.

### [Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow](https://arxiv.org/abs/2209.03003)

Rectified Flow is a new method that shows both great quality and extremely fast
generation capabilities (in just a single/few steps).

### [Normalizing Flows: An Introduction and Review of Current Methods](https://arxiv.org/abs/1908.09257)

### [Classifier-Free Diffusion Guidance](https://arxiv.org/abs/2207.12598)

## Notable papers
 
### [Adding Conditional Control to Text-to-Image Diffusion Models](https://arxiv.org/abs/2302.05543)

Introduces ControlNet, which allows fine-tuning the model whithout destroying
its general capabilities.

### [Consistency Models](https://arxiv.org/abs/2303.01469)

A new family of models that can generate high-quality samples in a single step.

### [DiT: Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748)

Replaces the U-Net backbone with transformers, showing that architectural
improvements from NLP can transfer to diffusion models. Used in models like
Stable Diffusion 3.

### [Elucidating the Design Space of Diffusion-Based Generative Models](https://arxiv.org/abs/2206.00364)

Simplifies the theory behind Diffusion-Based models and proposes several
improvements for both quality and inference time (through better schedules).

### [Scaling Rectified Flow Transformers for High-Resolution Image Synthesis](https://arxiv.org/abs/2403.03206)

Introduces the methods and architecture behind Stable Diffsuion 3, one of the
most capable existing generative image models.

### [FLUX.1 Kontext: Flow Matching for In-Context Image Generation and Editing in Latent Space](https://arxiv.org/abs/2506.15742)

Introduces FLUX.1 Kontext, the most capable open weights model (as of June 2025)
that unifies image generation and editing.

### [Zero-Shot Text-to-Image Generation](https://arxiv.org/abs/2102.12092)

The original DALL-E paper.

### [Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding](https://arxiv.org/abs/2205.11487)

The original Imagen paper.

## Tutorials & Explanations

### [Sander Dieleman blog](https://sander.ai/tags/#generative%20models)

A whole series about some different aspects of the Diffusion models and
generative AI.

### [Lil'Log - What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)

Lilian Weng's detailed blog post covering the mathematical foundations.
Excellent balance of rigor and accessibility, with helpful derivations and
intuitions.

### [Let Us Flow Together](https://rectifiedflow.github.io/)

The Rectified Flow deep dive, lecture notes and code.

### [Diffusion Meets Flow Matching: Two Sides of the Same Coin](https://diffusionflow.github.io/)

Discussing the equivalence of Diffusion and Flow Matching paradigms.
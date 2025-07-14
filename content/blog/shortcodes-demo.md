---
title: "Blog Shortcodes Demo"
date: 2025-07-14
draft: true
---

This post demonstrates the available shortcodes for enhanced blog content formatting.

This is a LaTeX demo: \({\partial x}\over{10} = 1\)

## Note Blocks

Use notes to highlight important information:

{{< note >}}
This is an important note that readers should pay attention to. Note blocks use a clean blue theme that stands out without being distracting.
{{< /note >}}

## Warning Blocks

Use warnings for critical information or gotchas:

{{< warning >}}
Be careful when applying this technique in production environments. Always test thoroughly before deploying changes that could affect system performance.
{{< /warning >}}

## Algorithm Blocks

Document algorithms and procedures with proper formatting:

{{< algorithm name="Binary Search" >}}
1. Initialize left = 0, right = array.length - 1
2. While left ≤ right:
   1. Calculate mid = (left + right) / 2
   2. If array[mid] = target: return mid
   3. If array[mid] < target: left = mid + 1
   4. Else: right = mid - 1
3. Return -1 (not found)
{{< /algorithm >}}

{{< algorithm name="Gradient Descent" >}}
1. Initialize parameters \(\theta\) randomly
2. For each iteration:
   1. Compute predictions: \(\hat{y} = f(X, \theta)\)
   2. Calculate loss: \(\mathcal{L} = \text{loss}(y, \hat{y})\)
   3. Compute gradients: \(\nabla_\theta = \frac{\partial \mathcal{L}}{\partial \theta}\)
   4. Update parameters: \(\theta \leftarrow \theta - \alpha \nabla_\theta\)
3. Return optimized \(\theta\)
{{< /algorithm >}}

## Mathematical Expressions

The ToMath transform with KaTeX renders beautiful mathematics:

Block equation:
\[
\frac{\partial \mathcal{L}}{\partial W} = \nabla_W \mathcal{L} = \sum_{i=1}^{n} \frac{\partial \ell(y_i, f(x_i; W))}{\partial W}
\]

Another block with complex notation:
$$
\mathbb{E}_{x \sim p_{\text{data}}(x)}[\log q_\phi(x)] + \mathbb{KL}[p_\theta(z|x) \| p(z)]
$$

## Combining Features

You can combine different shortcodes for richer content:

{{< note >}}
The following algorithm is fundamental to understanding how neural networks learn from data.
{{< /note >}}

{{< algorithm name="Backpropagation" >}}
1. Forward pass: compute activations \(a^{(l)}\) for all layers \(l = 1, \ldots, L\)
2. Compute loss at output layer: \(\mathcal{L} = \text{loss}(y, a^{(L)})\)
3. Backward pass:
   1. For each layer \(l = L, L-1, \ldots, 1\):
      1. Compute gradients: \(\frac{\partial \mathcal{L}}{\partial W^{(l)}}, \frac{\partial \mathcal{L}}{\partial b^{(l)}}\)
      2. Propagate error: \(\delta^{(l-1)} = (W^{(l)})^T \delta^{(l)} \odot \sigma'(z^{(l-1)})\)
4. Update parameters: \(W^{(l)} \leftarrow W^{(l)} - \alpha \frac{\partial \mathcal{L}}{\partial W^{(l)}}\)
{{< /algorithm >}}

{{< warning >}}
When implementing backpropagation, be careful about vanishing gradients in deep networks. Consider using techniques like batch normalization or residual connections.
{{< /warning >}}

These shortcodes provide a clean, maintainable way to enhance your blog posts with structured, visually appealing content blocks.
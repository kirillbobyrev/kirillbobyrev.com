---
title: "Blog features demo"
date: 2025-07-14
draft: true
---

This post demonstrates the available shortcodes for enhanced blog content formatting.

This is a LaTeX demo: \({\partial x}\over{10} = 1\)

## Mathematical List Features

Here's an example of our new mathematical list styling using the Hadamard product symbol:

- Linear algebra operations and matrix transformations
- Neural network gradient descent optimization  
- Probability distributions and statistical inference
- Fourier transforms and signal processing
- Convolution operations in deep learning
- Eigenvalue decomposition techniques

You can also create nested lists:

- Machine Learning Fundamentals
  - Supervised learning algorithms
  - Unsupervised learning methods
  - Reinforcement learning paradigms
- Deep Learning Architectures
  - Convolutional Neural Networks (CNNs)
  - Recurrent Neural Networks (RNNs)
  - Transformer models and attention mechanisms

## Code Examples

Here are some examples of code blocks with syntax highlighting:

### Python Example

```python
def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Example usage
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### JavaScript Example

```javascript
class Calculator {
    constructor() {
        this.result = 0;
    }

    add(value) {
        this.result += value;
        return this;
    }

    multiply(value) {
        this.result *= value;
        return this;
    }

    getResult() {
        return this.result;
    }
}

// Chain operations
const result = new Calculator()
    .add(5)
    .multiply(3)
    .add(2)
    .getResult();
```

```go
package main

import "fmt"

// calculateSquares calculates the sum of the squares of the digits of the given number
// and sends the result to the squareop channel.
func calculateSquares(number int, squareop chan int) {
	sum := 0
	for number != 0 {
		digit := number % 10
		sum += digit * digit
		number /= 10
	}
	squareop <- sum
}

// calculateCubes calculates the sum of the cubes of the digits of the given number
// and sends the result to the cubeop channel.
func calculateCubes(number int, cubeop chan int) {
	sum := 0
	for number != 0 {
		digit := number % 10
		sum += digit * digit * digit
		number /= 10
	}
	cubeop <- sum
}

func main() {
	number := 589
	sqrch := make(chan int)
	cubech := make(chan int)

	// Start two goroutines to calculate the sum of squares and cubes of the digits.
	go calculateSquares(number, sqrch)
	go calculateCubes(number, cubech)

	// Receive the results from the channels and add them.
	squares, cubes := <-sqrch, <-cubech
	fmt.Println("Final result", squares+cubes)
}
```

### Inline Code

Use `const variable = "value"` for inline code snippets. You can also use `npm install package-name` or `git commit -m "message"` for command examples.

## Figure Examples

{{< figure src="/images/twitter.png" caption="This is a figure caption demonstrating the new figure shortcode functionality." alt="Twitter image" />}}

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
---
title: "Your Article Title Here"
date: "2025-01-20"
readTime: "X min read"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "Brief description of your article that appears in the blog listing."
---

# Main Heading

This is a paragraph with **bold text**, _italic text_, and ~~strikethrough~~. You can also add [links](https://example.com).

## Subheading

### Sub-subheading

#### Smaller heading

---

## Code Examples

Inline code looks like `const x = 5;` and can be used anywhere.

Code blocks with syntax highlighting:

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result);
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

result = fibonacci(10)
print(result)
\`\`\`

\`\`\`go
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println(fibonacci(10))
}
\`\`\`

\`\`\`rust
fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("{}", fibonacci(10));
}
\`\`\`

---

## Mathematics

Inline math: $E = mc^2$ and $\frac{1}{2}$ work seamlessly.

Block math equations:

$$
\text{Impermanent Loss} = \frac{2\sqrt{P}}{1 + P} - 1
$$

$$
L = \frac{\Delta y}{\sqrt{P_b} - \sqrt{P_a}}
$$

Complex equations:

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

---

## Lists

### Unordered List

- First item
- Second item
- Third item with more detail
- Fourth item

### Ordered List

1. First step
2. Second step
3. Third step
4. Fourth step

---

## Blockquotes

> This is a blockquote. It can span multiple lines and is useful for highlighting important information or quotes from other sources.

> "The best way to predict the future is to invent it." - Alan Kay

---

## Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Math Support | LaTeX rendering with KaTeX | ✓ |
| Code Highlighting | Syntax highlighting for multiple languages | ✓ |
| Responsive | Mobile-friendly design | ✓ |
| Dark Mode | Built-in dark theme | ✓ |

---

## Tips for Writing

- Keep paragraphs concise and focused
- Use headings to structure your content
- Include code examples to illustrate concepts
- Use math for technical explanations
- Add blockquotes for important takeaways
- Use lists to organize information

---

## Next Steps

1. Copy this template
2. Replace the title and metadata
3. Write your content using the supported elements
4. Save as a markdown file in the content directory
5. The blog system will automatically render it

Happy writing!
\`\`\`

```tsx file="" isHidden

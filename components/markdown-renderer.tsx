"use client"

import React from "react"
import { CodeBlock } from "./code-block"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [mathLoaded, setMathLoaded] = React.useState(false)

  React.useEffect(() => {
    // Load KaTeX for math rendering
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
    script.async = true
    script.onload = () => {
      const autoRenderScript = document.createElement("script")
      autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
      autoRenderScript.async = true
      autoRenderScript.onload = () => {
        if (window.renderMathInElement) {
          window.renderMathInElement(document.body, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
            ],
            throwOnError: false,
          })
          setMathLoaded(true)
        }
      }
      document.head.appendChild(autoRenderScript)
    }
    document.head.appendChild(script)

    // Load KaTeX CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    document.head.appendChild(link)
  }, [])

  // Parse markdown and convert to JSX
  const parseMarkdown = (md: string) => {
    const lines = md.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-4xl font-bold mt-8 mb-4">
            {line.slice(2)}
          </h1>,
        )
        i++
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-3xl font-bold mt-6 mb-3">
            {line.slice(3)}
          </h2>,
        )
        i++
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-2xl font-bold mt-5 mb-2">
            {line.slice(4)}
          </h3>,
        )
        i++
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={i} className="text-xl font-bold mt-4 mb-2">
            {line.slice(5)}
          </h4>,
        )
        i++
      }
      // Code blocks
      else if (line.startsWith("```")) {
        const language = line.slice(3).trim() || "text"
        const codeLines: string[] = []
        i++
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i])
          i++
        }
        elements.push(<CodeBlock key={i} language={language} code={codeLines.join("\n")} />)
        i++
      }
      // Blockquotes
      else if (line.startsWith("> ")) {
        const quoteLines: string[] = []
        while (i < lines.length && lines[i].startsWith("> ")) {
          quoteLines.push(lines[i].slice(2))
          i++
        }
        elements.push(
          <blockquote key={i} className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground">
            {quoteLines.join(" ")}
          </blockquote>,
        )
      }
      // Unordered lists
      else if (line.startsWith("- ")) {
        const listItems: string[] = []
        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(lines[i].slice(2))
          i++
        }
        elements.push(
          <ul key={i} className="list-disc list-inside my-4 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-foreground">
                {item}
              </li>
            ))}
          </ul>,
        )
      }
      // Ordered lists
      else if (line.match(/^\d+\. /)) {
        const listItems: string[] = []
        while (i < lines.length && lines[i].match(/^\d+\. /)) {
          listItems.push(lines[i].replace(/^\d+\. /, ""))
          i++
        }
        elements.push(
          <ol key={i} className="list-decimal list-inside my-4 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-foreground">
                {item}
              </li>
            ))}
          </ol>,
        )
      }
      // Horizontal rule
      else if (line === "---" || line === "***" || line === "___") {
        elements.push(<hr key={i} className="my-8 border-border" />)
        i++
      }
      // Empty lines
      else if (line.trim() === "") {
        i++
      }
      // Paragraphs
      else {
        elements.push(
          <p key={i} className="text-foreground leading-relaxed my-4">
            {parseInlineMarkdown(line)}
          </p>,
        )
        i++
      }
    }

    return elements
  }

  // Parse inline markdown (bold, italic, code, links, math)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = []
    const lastIndex = 0

    // Regex patterns for inline elements
    const patterns = [
      { regex: /\*\*(.+?)\*\*/g, type: "bold" },
      { regex: /_(.+?)_/g, type: "italic" },
      { regex: /~~(.+?)~~/g, type: "strikethrough" },
      { regex: /`(.+?)`/g, type: "code" },
      { regex: /\[(.+?)\]$$(.+?)$$/g, type: "link" },
    ]

    let result = text
    for (const { regex, type } of patterns) {
      result = result.replace(regex, (match, ...args) => {
        if (type === "bold") return `<strong>${args[0]}</strong>`
        if (type === "italic") return `<em>${args[0]}</em>`
        if (type === "strikethrough") return `<del>${args[0]}</del>`
        if (type === "code") return `<code class="bg-muted px-2 py-1 rounded font-mono text-sm">${args[0]}</code>`
        if (type === "link")
          return `<a href="${args[1]}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${args[0]}</a>`
        return match
      })
    }

    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  return <div className="prose prose-invert max-w-none">{parseMarkdown(content)}</div>
}

declare global {
  interface Window {
    renderMathInElement?: (element: HTMLElement, options: any) => void
  }
}

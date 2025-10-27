'use client'

import { useEffect } from 'react'

interface BlogPostProps {
  html: string
}

export function BlogPost({ html }: BlogPostProps) {
  useEffect(() => {
    // Render math formulas with KaTeX if available
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      })
    }
  }, [html])

  return (
    <div
      className="prose prose-invert max-w-none space-y-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

declare global {
  interface Window {
    renderMathInElement?: (element: HTMLElement, options: any) => void
  }
}
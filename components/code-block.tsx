'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800">
        <span className="text-xs font-mono text-slate-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        className="!bg-slate-900 !m-0 !p-4 !text-sm"
        showLineNumbers={false}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
# Blog System Build Guide for IDE AI

## Problem
The current blog system has 3 issues:
1. Code highlighting is broken (Tailwind classes appear as literal text)
2. Math formulas (LaTeX/KaTeX) don't render
3. Blog posts are hardcoded in TypeScript instead of being markdown files

## Solution
Build a markdown-based blog system where:
- Blog posts are `.md` files in `/content/english/blog/`
- Each post has YAML frontmatter (title, date, excerpt, tags)
- Code blocks get proper syntax highlighting using `react-syntax-highlighter`
- Math uses KaTeX (inline `$x$` and display `$$E = mc^2$$`)
- Markdown is parsed using unified/remark/rehype pipeline

## Architecture

```
Markdown files → gray-matter (extract YAML) → remark-parse → 
remark plugins (math, GFM) → rehype-katex (render math) → 
rehype-highlight (syntax highlight) → HTML string → 
React component (dangerouslySetInnerHTML)
```

## Files to Create

### 1. `/lib/markdown.ts` - Markdown Parser

```typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml', 'toml'])
  .use(remarkMath)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeKatex)
  .use(rehypeHighlight, {
    languages: {
      go: require('highlight.js/lib/languages/go'),
      rust: require('highlight.js/lib/languages/rust'),
      typescript: require('highlight.js/lib/languages/typescript'),
      javascript: require('highlight.js/lib/languages/javascript'),
      python: require('highlight.js/lib/languages/python'),
      bash: require('highlight.js/lib/languages/bash'),
      json: require('highlight.js/lib/languages/json'),
      sql: require('highlight.js/lib/languages/sql'),
      solidity: require('highlight.js/lib/languages/solidity'),
      css: require('highlight.js/lib/languages/css'),
      html: require('highlight.js/lib/languages/xml'),
    },
  })
  .use(rehypeStringify)

export async function parseMarkdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await markdownProcessor.process(markdown)
    return String(result)
  } catch (error) {
    console.error('Error parsing markdown:', error)
    return '<p>Error parsing markdown content</p>'
  }
}
```

### 2. `/lib/blog.ts` - File-Based Blog System

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseMarkdownToHtml } from './markdown'

const CONTENT_DIR = path.join(process.cwd(), 'content/english/blog')

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  excerpt?: string
  tags?: string[]
  readTime?: string
  [key: string]: any
}

export interface BlogPost extends BlogPostMetadata {
  content: string
  html?: string
}

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const html = await parseMarkdownToHtml(content)

    const wordCount = content.split(/\s+/).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    return {
      slug,
      content,
      html,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || content.substring(0, 160).replace(/[#\*`]/g, ''),
      tags: data.tags || [],
      readTime: `${readTime} min read`,
      ...data,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = getBlogPostSlugs()
  const posts: BlogPost[] = []

  for (const slug of slugs) {
    const post = await getBlogPost(slug)
    if (post) {
      posts.push(post)
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostMetadata(slug: string): BlogPostMetadata | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const wordCount = content.split(/\s+/).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || content.substring(0, 160).replace(/[#\*`]/g, ''),
      tags: data.tags || [],
      readTime: `${readTime} min read`,
      ...data,
    }
  } catch (error) {
    console.error(`Error reading blog post metadata ${slug}:`, error)
    return null
  }
}

export function getAllBlogPostMetadata(): BlogPostMetadata[] {
  const slugs = getBlogPostSlugs()
  const posts: BlogPostMetadata[] = []

  for (const slug of slugs) {
    const metadata = getBlogPostMetadata(slug)
    if (metadata) {
      posts.push(metadata)
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

### 3. `/components/code-block.tsx` - REPLACE

```typescript
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
```

### 4. `/components/blog-post.tsx` - NEW

```typescript
'use client'

import { useEffect } from 'react'

interface BlogPostProps {
  html: string
}

export function BlogPost({ html }: BlogPostProps) {
  useEffect(() => {
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
```

### 5. `/app/blog/page.tsx` - NEW

```typescript
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { getAllBlogPostMetadata } from "@/lib/blog"

export const metadata = {
  title: "Blog | MacBobby Chibuzor",
  description: "Technical articles about blockchain infrastructure, DeFi protocols, and backend systems engineering.",
}

export default function BlogPage() {
  const posts = getAllBlogPostMetadata()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Technical articles about blockchain infrastructure, DeFi protocols, and backend systems engineering.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-6">All Articles</h2>
            <div className="space-y-6">
              {posts.length === 0 ? (
                <Card className="p-6">
                  <p className="text-muted-foreground">No blog posts found. Add markdown files to `/content/english/blog/`</p>
                </Card>
              ) : (
                posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="p-6 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-balance hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/40 mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 MacBobby Chibuzor. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="mailto:macbobbychibuzor@gmail.com" className="hover:text-foreground transition-colors">
                macbobbychibuzor@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

### 6. `/app/blog/[slug]/page.tsx` - NEW

```typescript
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { BlogPost } from "@/components/blog-post"
import { getBlogPost, getBlogPostSlugs } from "@/lib/blog"

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Not Found",
    }
  }

  return {
    title: `${post.title} | MacBobby Chibuzor`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 -ml-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {post.html && <BlogPost html={post.html} />}
        </article>
      </main>

      <footer className="border-t border-border/40 mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 MacBobby Chibuzor. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="mailto:macbobbychibuzor@gmail.com" className="hover:text-foreground transition-colors">
                macbobbychibuzor@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

### 7. Update `package.json` - Replace `dependencies` and `devDependencies`

Add these to your existing package.json:

**New dependencies to add:**
```json
"gray-matter": "^4.0.3",
"highlight.js": "^11.9.0",
"rehype-highlight": "^7.0.0",
"rehype-katex": "^7.0.0",
"rehype-stringify": "^10.0.0",
"remark": "^15.0.1",
"remark-frontmatter": "^5.0.0",
"remark-gfm": "^4.0.0",
"remark-math": "^6.0.0",
"remark-parse": "^11.0.0",
"remark-rehype": "^11.0.0",
"unified": "^11.0.2"
```

Keep all your existing dependencies. Just add these new ones.

### 8. Create directory

```bash
mkdir -p content/english/blog
```

## Installation Steps

1. Create all files above with their code
2. Update package.json with new dependencies
3. Create `content/english/blog` directory
4. Run: `npm install`
5. Run: `npm run dev`
6. Visit: `http://localhost:3000/blog`

## To Add Blog Posts

Create markdown files in `/content/english/blog/` with this format:

```markdown
---
title: "Your Post Title"
date: 2025-01-20
excerpt: "Short description"
tags: ["Tag1", "Tag2"]
---

# Your Content

## Heading 2

Your **bold** and *italic* text.

### Code Example

```go
package main

func main() {
    println("Hello")
}
```

### Math

Inline: $E = mc^2$

Display:
$$\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

## Features

✅ Syntax highlighting for: go, rust, typescript, javascript, python, bash, json, sql, solidity, css, html
✅ KaTeX math rendering (inline and display)
✅ GitHub Flavored Markdown (tables, strikethrough, etc.)
✅ YAML frontmatter for metadata
✅ Auto-calculated read time
✅ Static generation (build time, not runtime)
✅ SEO-friendly
✅ Works on Vercel


make sure to connect the contents in content/ as the main contents.
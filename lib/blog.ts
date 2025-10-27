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

/**
 * Get all blog post slugs for static generation
 */
export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Content directory not found: ${CONTENT_DIR}`)
    return []
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''))
}

/**
 * Get a single blog post by slug with parsed HTML
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    // Parse markdown to HTML
    const html = await parseMarkdownToHtml(content)

    // Calculate read time (rough estimate: 200 words per minute)
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

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = getBlogPostSlugs()
  const posts: BlogPost[] = []

  for (const slug of slugs) {
    const post = await getBlogPost(slug)
    if (post) {
      posts.push(post)
    }
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get blog post metadata only (without HTML parsing, for listing)
 */
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

/**
 * Get all blog post metadata (for listing without full HTML)
 */
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
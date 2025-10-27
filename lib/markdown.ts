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

// Create the markdown processor that outputs HTML
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
      // solidity: require('highlight.js/lib/languages/solidity'),
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
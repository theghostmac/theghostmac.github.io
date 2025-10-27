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
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) {
    return { title: "Not Found" }
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

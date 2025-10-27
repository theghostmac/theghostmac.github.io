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
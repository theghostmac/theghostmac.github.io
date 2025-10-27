"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const projects = [
  {
    title: "Cross-Chain Bridge Protocol",
    description:
      "Production-grade bridge infrastructure enabling seamless asset transfers across 10+ blockchain networks. Handles $100M+ in cumulative volume with advanced security features including multi-signature validation and circuit breakers.",
    tags: ["Golang", "Cosmos SDK", "IBC", "Smart Contracts"],
    highlights: [
      "Processes 50K+ transactions monthly",
      "99.9% uptime in production",
      "Multi-chain support (Ethereum, Cosmos, Solana)",
      "Advanced monitoring and alerting system",
    ],
    github: "https://github.com/theghostmac",
    demo: null,
    featured: true,
  },
  {
    title: "High-Performance Blockchain Indexer",
    description:
      "Scalable indexing system processing 10M+ blockchain events daily with sub-second query latency. Features efficient batch processing, intelligent caching, and horizontal scaling capabilities.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    highlights: [
      "70% reduction in indexing latency",
      "Handles 10M+ events per day",
      "Sub-second query response times",
      "Automatic chain reorganization handling",
    ],
    github: "https://github.com/theghostmac",
    demo: null,
    featured: true,
  },
  {
    title: "DeFi Protocol Analytics Dashboard",
    description:
      "Real-time analytics platform for DeFi protocols providing insights into TVL, transaction volumes, user metrics, and protocol health. Built with GraphQL APIs and interactive visualizations.",
    tags: ["TypeScript", "Next.js", "GraphQL", "The Graph"],
    highlights: [
      "Real-time protocol metrics",
      "Custom GraphQL subgraphs",
      "Interactive data visualizations",
      "Multi-protocol support",
    ],
    github: "https://github.com/theghostmac",
    demo: "https://demo.example.com",
    featured: true,
  },
  {
    title: "Cosmos SDK Custom Module",
    description:
      "Custom blockchain module for the Cosmos SDK implementing advanced staking mechanics and governance features. Includes comprehensive testing and IBC integration.",
    tags: ["Golang", "Cosmos SDK", "CosmWasm", "IBC"],
    highlights: [
      "Custom keeper implementation",
      "IBC-enabled cross-chain functionality",
      "Comprehensive unit and integration tests",
      "Production deployment on testnet",
    ],
    github: "https://github.com/theghostmac",
    demo: null,
    featured: false,
  },
  {
    title: "Automated Liquidation Bot",
    description:
      "High-frequency trading bot for DeFi lending protocols that monitors positions and executes liquidations. Features gas optimization, MEV protection, and profit maximization strategies.",
    tags: ["Rust", "Solidity", "Ethereum", "MEV"],
    highlights: [
      "Sub-second liquidation execution",
      "Gas-optimized transactions",
      "MEV protection mechanisms",
      "Profitable operation in production",
    ],
    github: "https://github.com/theghostmac",
    demo: null,
    featured: false,
  },
  {
    title: "Multi-Chain Wallet SDK",
    description:
      "Developer SDK for building multi-chain wallet applications. Provides unified API for interacting with Ethereum, Cosmos, and Solana networks with built-in security features.",
    tags: ["TypeScript", "Web3", "Cosmos", "Solana"],
    highlights: [
      "Unified API for multiple chains",
      "Hardware wallet support",
      "Transaction simulation",
      "Comprehensive documentation",
    ],
    github: "https://github.com/theghostmac",
    demo: "https://demo.example.com",
    featured: false,
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              A selection of blockchain infrastructure projects, DeFi protocols, and developer tools I've built. From
              cross-chain bridges to high-performance indexers, each project solves real-world problems at scale.
            </p>
          </div>

          {/* Featured Projects */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
            <div className="grid gap-6">
              {featuredProjects.map((project, index) => (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value="project" className="border-0">
                    <Card className="p-6 hover:border-primary/50 transition-all">
                      <div className="space-y-4">
                        <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                          <div className="flex items-start justify-between gap-4 w-full text-left">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                            </div>
                            <div className="flex gap-2">
                              {project.github && (
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">View on GitHub</span>
                                  </Button>
                                </Link>
                              )}
                              {project.demo && (
                                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">View demo</span>
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="border-t border-border pt-4">
                          <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                            Key Highlights
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {project.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <AccordionContent className="pt-4 pb-0">
                          <div className="space-y-4 text-sm text-muted-foreground border-t border-border pt-4">
                            <div>
                              <p className="font-semibold text-foreground mb-2">Technical Details:</p>
                              <ul className="space-y-2 ml-4">
                                {index === 0 && (
                                  <>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>
                                        Implemented IBC light client verification for trustless cross-chain transfers
                                      </span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Built custom relayer with automatic retry logic and gas optimization</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>
                                        Integrated with 10+ chains including Ethereum, Cosmos Hub, and Osmosis
                                      </span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Comprehensive monitoring with Prometheus and Grafana dashboards</span>
                                    </li>
                                  </>
                                )}
                                {index === 1 && (
                                  <>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>
                                        Parallel event processing with worker pools handling 10M+ events daily
                                      </span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Redis caching layer reducing database queries by 80%</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>PostgreSQL with TimescaleDB for efficient time-series data storage</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Automatic chain reorganization detection and reindexing</span>
                                    </li>
                                  </>
                                )}
                                {index === 2 && (
                                  <>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Custom GraphQL subgraphs indexing protocol events in real-time</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Interactive charts built with Recharts and D3.js</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>WebSocket connections for live data updates</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Support for Uniswap, Aave, Compound, and custom protocols</span>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground mb-2">Challenges Solved:</p>
                              <ul className="space-y-2 ml-4">
                                {index === 0 && (
                                  <>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Handling chain-specific transaction finality requirements</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Implementing circuit breakers for security incidents</span>
                                    </li>
                                  </>
                                )}
                                {index === 1 && (
                                  <>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Managing memory efficiently for high-volume event processing</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Ensuring data consistency during chain reorganizations</span>
                                    </li>
                                  </>
                                )}
                                {index === 2 && (
                                  <>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Optimizing query performance for large datasets</span>
                                    </li>
                                    <li className="flex gap-2">
                                      <span className="text-primary">•</span>
                                      <span>Building responsive UI handling real-time data streams</span>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </div>
                    </Card>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </section>

          {/* Other Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Other Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="p-6 hover:border-primary/50 transition-all">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <div className="flex gap-2">
                          {project.github && (
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">View on GitHub</span>
                              </Button>
                            </Link>
                          )}
                          {project.demo && (
                            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View demo</span>
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3">
                      <ul className="space-y-1">
                        {project.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-muted-foreground">
                            <ArrowRight className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <Card className="p-8 bg-card/50">
              <h2 className="text-2xl font-bold mb-3">Interested in collaborating?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="mailto:macbobbychibuzor@gmail.com">
                  <Button size="lg" className="gap-2">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://github.com/theghostmac" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Github className="h-4 w-4" />
                    View GitHub
                  </Button>
                </Link>
              </div>
            </Card>
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

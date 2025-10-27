"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Code2, Database, Network } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const skills = [
    "Golang",
    "Rust",
    "Solidity",
    "TypeScript",
    "Python",
    "Docker",
    "Kubernetes",
    "AWS",
    "Go-Ethereum",
    "Cosmos",
    "Solana",
    "CosmWasm",
    "PostgreSQL",
    "GraphQL",
    "The Graph Protocol",
  ]

  const highlights = [
    {
      icon: Code2,
      title: "DeFi Infrastructure",
      description:
        "Building production-grade cross-chain protocols and data pipelines that process high-volume transactions at scale.",
    },
    {
      icon: Database,
      title: "Backend Systems",
      description:
        "Architecting performant backend systems with efficient caching strategies and automated data ingestion.",
    },
    {
      icon: Network,
      title: "Cross-Chain Protocols",
      description:
        "Developing mission-critical services including subgraphs, monitoring bots, and protocol integration systems.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              MacBobby Chibuzor
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light">
              Software Engineer, DeFi Infrastructure
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              I am a software engineer with 6 years of experience building blockchain infrastructure and DeFi solutions.
              I specialize in performant backend systems, cross-chain protocols, and data pipelines that process
              high-volume transactions at scale. I thrive in DeFi infrastructure engineering, from research and
              prototyping to production-grade cloud deployments.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/resume">
                <Button size="lg" className="gap-2">
                  View Resume
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  Read Blog
                </Button>
              </Link>
              <Link href="mailto:macbobbychibuzor@gmail.com">
                <Button size="lg" variant="outline">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-8">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value="item-1" className="border-0">
                    <Card className="p-6 hover:border-primary/50 transition-colors">
                      <Icon className="h-10 w-10 text-primary mb-4" />
                      <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                        <div className="text-left">
                          <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">{highlight.description}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-0">
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p className="font-semibold text-foreground">Key Expertise:</p>
                          <ul className="space-y-2 ml-4">
                            {index === 0 && (
                              <>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Liquid staking protocols and yield optimization</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>AMM mathematics and impermanent loss modeling</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Cross-chain bridge security and verification</span>
                                </li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>High-throughput data ingestion pipelines</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Redis caching strategies for blockchain data</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>PostgreSQL optimization for time-series data</span>
                                </li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>IBC protocol implementation and debugging</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>GraphQL subgraph development with The Graph</span>
                                </li>
                                <li className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Real-time monitoring and alerting systems</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                </Accordion>
              )
            })}
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm font-mono">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience Highlight */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Recent Experience</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="stride" className="border-0">
              <Card className="p-8">
                <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 w-full text-left">
                    <div>
                      <h3 className="text-2xl font-bold">Senior Infrastructure Engineer</h3>
                      <p className="text-lg text-primary">Stride Labs</p>
                    </div>
                    <p className="text-muted-foreground">Oct 2024 - Jul 2025</p>
                  </div>
                </AccordionTrigger>
                <ul className="space-y-3 text-muted-foreground leading-relaxed mb-6">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Led ownership of Stride utilities and Launchpad, overseeing core infrastructure enhancements and
                      developing mission-critical DeFi services
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Architected and built the stBGT Points Program Indexer on Berachain with real-time metrics and
                      user analytics
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Streamlined production operations by consolidating 16 microservices into 8 deployable services
                      (50% reduction)
                    </span>
                  </li>
                </ul>
                <AccordionContent className="pt-4 pb-0">
                  <div className="space-y-4 text-sm text-muted-foreground border-t border-border pt-6">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Additional Achievements:</p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Implemented comprehensive CI/CD workflows with automated testing, reducing deployment time
                            by 60%
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Built automated daily indexing jobs processing 500K+ blockchain events with 99.9% accuracy
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Designed efficient caching strategies reducing API response times from 2s to 200ms
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Mentored junior engineers on Cosmos SDK development and production deployment best practices
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Technical Impact:</p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Reduced infrastructure costs by 35% through service consolidation</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Improved system observability with custom Grafana dashboards and alerts</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Enhanced security through environment-based configuration management</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="outline" className="font-mono">
                    Python
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    FastAPI
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    PostgreSQL
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    Docker
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    Kubernetes
                  </Badge>
                  <Badge variant="outline" className="font-mono">
                    GraphQL
                  </Badge>
                </div>
              </Card>
            </AccordionItem>
          </Accordion>
        </section>
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

"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, GitPullRequest, FileText, Code2, Presentation } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface WorkEntry {
  date: string
  title: string
  description: string
  type: "open-source" | "personal" | "internal" | "research" | "article"
  tags: string[]
  links: {
    label: string
    url: string
  }[]
}

const workLog: WorkEntry[] = [
  {
    date: "2025-01-15",
    title: "Optimized Berachain Indexer Performance",
    description:
      "Reduced query latency by 40% through database index optimization and query restructuring in the stBGT Points Program Indexer.",
    type: "internal",
    tags: ["PostgreSQL", "Performance", "Berachain"],
    links: [
      {
        label: "Performance Report",
        url: "#",
      },
    ],
  },
  {
    date: "2025-01-12",
    title: "Contributed to CosmWasm DAO Voting Module",
    description:
      "Added active threshold functionality to CW4 voting module and improved test coverage for threshold calculations.",
    type: "open-source",
    tags: ["Rust", "CosmWasm", "DAO"],
    links: [
      {
        label: "PR #234",
        url: "https://github.com/DA0-DA0/dao-contracts/pulls",
      },
      {
        label: "Documentation",
        url: "#",
      },
    ],
  },
  {
    date: "2025-01-10",
    title: "Published: Building High-Performance Blockchain Indexers",
    description:
      "Deep dive into architectural patterns for building scalable blockchain data indexers with real-world examples from production systems.",
    type: "article",
    tags: ["Architecture", "Blockchain", "DeFi"],
    links: [
      {
        label: "Read Article",
        url: "/blog/blockchain-indexers",
      },
    ],
  },
  {
    date: "2025-01-08",
    title: "Solana MEV Bot Experiment",
    description:
      "Built experimental MEV bot using Jito bundles and Raydium DEX integration. Achieved 2.3ms average bundle submission time.",
    type: "personal",
    tags: ["Solana", "Rust", "MEV"],
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/theghostmac",
      },
      {
        label: "Technical Writeup",
        url: "#",
      },
    ],
  },
  {
    date: "2025-01-05",
    title: "Research: Cross-Chain Message Verification",
    description:
      "Analyzed security models for cross-chain message passing in IBC vs. LayerZero. Published findings on verification mechanisms and trust assumptions.",
    type: "research",
    tags: ["IBC", "LayerZero", "Security"],
    links: [
      {
        label: "Research Paper",
        url: "#",
      },
    ],
  },
  {
    date: "2025-01-03",
    title: "Migrated CI/CD Pipeline to GitHub Actions",
    description:
      "Consolidated testing and deployment workflows for 8 microservices. Reduced deployment time from 45min to 12min.",
    type: "internal",
    tags: ["DevOps", "CI/CD", "GitHub Actions"],
    links: [
      {
        label: "Migration Guide",
        url: "#",
      },
    ],
  },
  {
    date: "2024-12-28",
    title: "Contributed to go-ethereum",
    description: "Fixed memory leak in transaction pool management. Reduced memory footprint by ~15% under high load.",
    type: "open-source",
    tags: ["Golang", "Ethereum", "Performance"],
    links: [
      {
        label: "PR #28945",
        url: "https://github.com/ethereum/go-ethereum/pulls",
      },
    ],
  },
  {
    date: "2024-12-20",
    title: "Built Rust-based Token Rug Checker",
    description:
      "Created CLI tool for analyzing Solana tokens for common rug pull indicators. Checks liquidity locks, mint authority, and holder distribution.",
    type: "personal",
    tags: ["Rust", "Solana", "Security"],
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/theghostmac",
      },
      {
        label: "Demo Video",
        url: "#",
      },
    ],
  },
]

const typeConfig = {
  "open-source": {
    icon: GitPullRequest,
    label: "Open Source",
    color: "text-green-500",
  },
  personal: {
    icon: Code2,
    label: "Personal Project",
    color: "text-blue-500",
  },
  internal: {
    icon: FileText,
    label: "Internal Work",
    color: "text-purple-500",
  },
  research: {
    icon: FileText,
    label: "Research",
    color: "text-orange-500",
  },
  article: {
    icon: Presentation,
    label: "Article",
    color: "text-cyan-500",
  },
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Work Log</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A daily log of my contributions to open source, personal projects, internal work, research, and technical
              writing. All entries include verifiable links to PRs, code, or published work.
            </p>
          </div>

          <div className="space-y-6">
            {workLog.map((entry, index) => {
              const config = typeConfig[entry.type]
              const Icon = config.icon

              return (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value="work" className="border-0">
                    <Card className="p-6 hover:border-primary/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`p-3 rounded-lg bg-muted ${config.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="flex-1 space-y-3">
                          <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 w-full text-left">
                              <h3 className="text-xl font-semibold text-balance">{entry.title}</h3>
                              <time className="text-sm text-muted-foreground whitespace-nowrap">
                                {new Date(entry.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </time>
                            </div>
                          </AccordionTrigger>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {config.label}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground leading-relaxed">{entry.description}</p>

                          <AccordionContent className="pt-3 pb-0">
                            <div className="space-y-3 text-sm text-muted-foreground border-t border-border pt-3">
                              <div>
                                <p className="font-semibold text-foreground mb-2">Additional Context:</p>
                                <ul className="space-y-2 ml-4">
                                  {index === 0 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>
                                          Analyzed slow queries using EXPLAIN ANALYZE and added composite indexes
                                        </span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>
                                          Implemented connection pooling reducing database connection overhead
                                        </span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Reduced average query time from 850ms to 510ms across all endpoints</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 1 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Collaborated with DAO-DAO core team on design and implementation</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Added comprehensive unit tests achieving 95% code coverage</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Feature now used by 50+ DAOs in the Cosmos ecosystem</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 2 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Covered batch processing, caching strategies, and error handling</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Included code examples in Python and Golang</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Article received 2.5K views and 150+ shares on Twitter</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 3 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Implemented custom RPC client with retry logic and failover</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Used Jito's bundle API for MEV protection and priority execution</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Achieved 95% bundle inclusion rate during testing</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 4 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Compared light client verification approaches and trust assumptions</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Analyzed gas costs and latency trade-offs for each approach</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Findings shared with cross-chain protocol development teams</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 5 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Unified workflows across Python, TypeScript, and Rust services</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Implemented parallel testing reducing CI time by 65%</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Added automated deployment to staging and production environments</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 6 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Identified and fixed memory leak in transaction eviction logic</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Added benchmarks demonstrating 15% memory reduction under load</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>PR reviewed and merged by go-ethereum core maintainers</span>
                                      </li>
                                    </>
                                  )}
                                  {index === 7 && (
                                    <>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>
                                          Checks for frozen mint authority, LP burn, and top holder concentration
                                        </span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>Uses Solana RPC and on-chain program data for analysis</span>
                                      </li>
                                      <li className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>CLI tool with colored output and risk scoring system</span>
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>

                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs font-mono">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3 pt-2">
                            {entry.links.map((link, linkIndex) => (
                              <Link
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                {link.label}
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AccordionItem>
                </Accordion>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

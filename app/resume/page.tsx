"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, MapPin, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ResumePage() {
  const handleDownloadPDF = () => {
    // Trigger print dialog which can save as PDF
    window.print()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header with Download Button */}
          <div className="flex justify-between items-start mb-8 print:hidden">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Resume</h1>
              <p className="text-muted-foreground">Download or print my resume</p>
            </div>
            <Button onClick={handleDownloadPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {/* Resume Content */}
          <div className="bg-card border border-border rounded-lg p-8 print:border-0 print:p-0" id="resume-content">
            {/* Header Section */}
            <header className="mb-8 pb-6 border-b border-border print:border-gray-300">
              <h1 className="text-4xl font-bold mb-2">MacBobby Chibuzor</h1>
              <p className="text-xl text-primary mb-4">Software Engineer, DeFi Infrastructure</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:macbobbychibuzor@gmail.com" className="hover:text-foreground">
                    macbobbychibuzor@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <a
                    href="https://github.com/theghostmac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    github.com/theghostmac
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  <a
                    href="https://linkedin.com/in/theghostmac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    linkedin.com/in/theghostmac
                  </a>
                </div>
              </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-3">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                Software engineer with 6 years of experience building blockchain infrastructure and DeFi solutions. I
                specialize in performant backend systems, cross-chain protocols, and data pipelines that process
                high-volume transactions at scale. I thrive in DeFi infrastructure engineering, from research and
                prototyping to production-grade cloud deployments.
              </p>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-3">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Golang", "Rust", "Solidity", "TypeScript", "Python"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-mono text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    Blockchain
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Go-Ethereum", "Cosmos", "Solana", "CosmWasm"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-mono text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    Infrastructure
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Kubernetes", "AWS", "Terraform"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-mono text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    Data & APIs
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "GraphQL", "The Graph Protocol", "Redis"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-mono text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
              <Accordion type="single" collapsible className="space-y-6">
                {/* Stride Labs */}
                <AccordionItem value="stride" className="border-0">
                  <div>
                    <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                      <div className="flex justify-between items-start mb-2 w-full text-left">
                        <div>
                          <h3 className="text-xl font-bold">Senior Infrastructure Engineer</h3>
                          <p className="text-primary font-medium">Stride Labs</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Oct 2024 - Jul 2025</p>
                      </div>
                    </AccordionTrigger>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4 mb-3">
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          Led ownership of Stride utilities and Launchpad, overseeing core infrastructure enhancements
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Architected stBGT Points Program Indexer on Berachain with real-time metrics</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Consolidated 16 microservices into 8 deployable services (50% reduction)</span>
                      </li>
                    </ul>
                    <AccordionContent className="pt-3 pb-0">
                      <div className="space-y-3 text-sm text-muted-foreground ml-4 border-t border-border pt-3">
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Implemented comprehensive CI/CD workflows reducing deployment time by 60% and improving
                            reliability
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Built automated daily indexing jobs processing 500K+ events with PostgreSQL optimization
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Reduced API response times from 2s to 200ms through efficient caching strategies</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Mentored 3 junior engineers on Cosmos SDK and production deployment practices</span>
                        </li>
                      </div>
                    </AccordionContent>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        Python
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        FastAPI
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        PostgreSQL
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        Docker
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        Kubernetes
                      </Badge>
                    </div>
                  </div>
                </AccordionItem>

                {/* Axelar Network */}
                <AccordionItem value="axelar" className="border-0">
                  <div>
                    <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                      <div className="flex justify-between items-start mb-2 w-full text-left">
                        <div>
                          <h3 className="text-xl font-bold">Backend Engineer</h3>
                          <p className="text-primary font-medium">Axelar Network</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Jan 2023 - Sep 2024</p>
                      </div>
                    </AccordionTrigger>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4 mb-3">
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Built cross-chain infrastructure supporting 50+ blockchain integrations</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Developed indexers processing 1M+ transactions daily with 99.9% uptime</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Reduced API response times by 60% and database load by 40%</span>
                      </li>
                    </ul>
                    <AccordionContent className="pt-3 pb-0">
                      <div className="space-y-3 text-sm text-muted-foreground ml-4 border-t border-border pt-3">
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Designed and implemented GraphQL APIs serving 10K+ requests per minute with sub-100ms
                            latency
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Built real-time monitoring dashboards tracking cross-chain message flow and validator
                            performance
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Implemented automated alerting system detecting anomalies in cross-chain transactions
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Contributed to open-source Cosmos SDK modules and IBC protocol improvements</span>
                        </li>
                      </div>
                    </AccordionContent>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        Golang
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        Cosmos SDK
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        GraphQL
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        The Graph
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        AWS
                      </Badge>
                    </div>
                  </div>
                </AccordionItem>

                {/* Previous Role */}
                <AccordionItem value="defi" className="border-0">
                  <div>
                    <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
                      <div className="flex justify-between items-start mb-2 w-full text-left">
                        <div>
                          <h3 className="text-xl font-bold">Blockchain Developer</h3>
                          <p className="text-primary font-medium">DeFi Protocol (Stealth)</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Mar 2021 - Dec 2022</p>
                      </div>
                    </AccordionTrigger>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4 mb-3">
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Developed smart contracts for DeFi lending protocol handling $50M+ TVL</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Built backend services for protocol monitoring and liquidation bots</span>
                      </li>
                    </ul>
                    <AccordionContent className="pt-3 pb-0">
                      <div className="space-y-3 text-sm text-muted-foreground ml-4 border-t border-border pt-3">
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Implemented gas-optimized smart contracts reducing transaction costs by 30% for users
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Built automated liquidation bot executing 1000+ liquidations with 99.5% success rate
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Conducted security audits and implemented fixes for critical vulnerabilities</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Established comprehensive testing framework with 95%+ code coverage</span>
                        </li>
                      </div>
                    </AccordionContent>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        Solidity
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        Hardhat
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        Node.js
                      </Badge>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
                    <p className="text-primary font-medium">University of Technology</p>
                  </div>
                  <p className="text-sm text-muted-foreground">2015 - 2019</p>
                </div>
                <p className="text-sm text-muted-foreground">Focus: Distributed Systems and Cryptography</p>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Notable Projects</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Cross-Chain Bridge Infrastructure</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Built production-grade bridge supporting asset transfers across 10+ chains with $100M+ in cumulative
                    volume
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Golang
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Cosmos SDK
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      IBC
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">High-Performance Blockchain Indexer</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Developed indexer processing 10M+ events daily with sub-second query latency and horizontal scaling
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      PostgreSQL
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Redis
                    </Badge>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 mt-24 print:hidden">
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

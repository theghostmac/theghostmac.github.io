import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { MathBlock } from "@/components/math-block"

export default function DeFiAMMBlogPost() {
  const goCode = `package amm

import (
    "math"
    "math/big"
)

type LiquidityPosition struct {
    LowerTick int
    UpperTick int
    Liquidity *big.Int
}

// CalculateOptimalRange determines optimal price range
func CalculateOptimalRange(
    currentPrice float64,
    volatility float64,
    targetAPR float64,
) (lowerPrice, upperPrice float64) {
    // Using 2 standard deviations for 95% confidence
    priceStdDev := currentPrice * volatility
    
    lowerPrice = currentPrice - (2 * priceStdDev)
    upperPrice = currentPrice + (2 * priceStdDev)
    
    if lowerPrice < 0 {
        lowerPrice = currentPrice * 0.5
    }
    
    return lowerPrice, upperPrice
}

// CalculateFeeAPR estimates APR from trading fees
func CalculateFeeAPR(
    dailyVolume float64,
    totalLiquidity float64,
    feeRate float64,
) float64 {
    dailyFees := dailyVolume * feeRate
    dailyAPR := dailyFees / totalLiquidity
    annualAPR := dailyAPR * 365
    
    return annualAPR * 100
}

// SimulateImpermanentLoss calculates IL
func SimulateImpermanentLoss(priceRatio float64) float64 {
    if priceRatio <= 0 {
        return 0
    }
    
    sqrtRatio := math.Sqrt(priceRatio)
    il := (2 * sqrtRatio / (1 + priceRatio)) - 1
    
    return il * 100
}`

  const rustCode = `use num_bigint::BigUint;
use num_traits::{Zero, One};

pub struct Pool {
    reserve_a: BigUint,
    reserve_b: BigUint,
    fee_numerator: u32,
    fee_denominator: u32,
}

impl Pool {
    pub fn new(reserve_a: BigUint, reserve_b: BigUint) -> Self {
        Self {
            reserve_a,
            reserve_b,
            fee_numerator: 3,
            fee_denominator: 1000,
        }
    }
    
    pub fn get_amount_out(
        &self,
        amount_in: &BigUint,
        reserve_in: &BigUint,
        reserve_out: &BigUint,
    ) -> Result<BigUint, &'static str> {
        if amount_in.is_zero() {
            return Err("Insufficient input amount");
        }
        
        if reserve_in.is_zero() || reserve_out.is_zero() {
            return Err("Insufficient liquidity");
        }
        
        let fee_complement = self.fee_denominator - self.fee_numerator;
        let amount_in_with_fee = amount_in * fee_complement;
        
        let numerator = &amount_in_with_fee * reserve_out;
        let denominator = (reserve_in * self.fee_denominator) 
            + amount_in_with_fee;
        
        Ok(numerator / denominator)
    }
}`

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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance">
              Understanding AMM Mathematics: A Deep Dive into DeFi Protocols
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime="2025-01-20">January 20, 2025</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>12 min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="font-mono">
                DeFi
              </Badge>
              <Badge variant="secondary" className="font-mono">
                Mathematics
              </Badge>
              <Badge variant="secondary" className="font-mono">
                Go
              </Badge>
              <Badge variant="secondary" className="font-mono">
                Rust
              </Badge>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Automated Market Makers (AMMs) are the backbone of decentralized exchanges. Understanding their
              mathematical foundations is crucial for building secure DeFi protocols and optimizing liquidity provision
              strategies.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">The Constant Product Formula</h2>
            <p className="text-muted-foreground leading-relaxed">
              The most common AMM model, popularized by Uniswap, uses the constant product formula:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <MathBlock latex="x \times y = k" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Where <strong>x</strong> and <strong>y</strong> are the reserves of two tokens, and <strong>k</strong> is
              a constant. This elegant formula ensures that the product of reserves remains constant after each trade.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Price Calculation</h3>
            <p className="text-muted-foreground leading-relaxed">
              The price of token X in terms of token Y is derived from the ratio of reserves:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <MathBlock latex="P_x = \frac{y}{x}" />
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-4">Impermanent Loss</h2>
            <p className="text-muted-foreground leading-relaxed">
              Liquidity providers face impermanent loss when token prices diverge. The loss is calculated as:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <MathBlock latex="IL = \frac{2\sqrt{P}}{1 + P} - 1" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Where <strong>P</strong> is the price ratio change.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">Example Calculation</h3>
            <p className="text-muted-foreground leading-relaxed">If ETH price doubles relative to USDC:</p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <MathBlock latex="IL = \frac{2\sqrt{2}}{1 + 2} - 1 = \frac{2.828}{3} - 1 \approx -0.057" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This represents a <strong>5.7% loss</strong> compared to holding the tokens.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Implementation in Go</h2>
            <p className="text-muted-foreground leading-relaxed">
              Here's a production-ready implementation for calculating optimal liquidity ranges:
            </p>
            <CodeBlock code={goCode} language="go" />

            <h2 className="text-3xl font-bold mt-12 mb-4">Concentrated Liquidity</h2>
            <p className="text-muted-foreground leading-relaxed">
              Uniswap V3 introduced concentrated liquidity, allowing LPs to provide liquidity within specific price
              ranges. The liquidity density is:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <MathBlock latex="L = \frac{\Delta y}{\sqrt{P_b} - \sqrt{P_a}}" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Where <strong>L</strong> is liquidity amount,{" "}
              <strong>
                P<sub>a</sub>
              </strong>{" "}
              is lower price bound,{" "}
              <strong>
                P<sub>b</sub>
              </strong>{" "}
              is upper price bound, and <strong>Δy</strong> is amount of token Y.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Rust Implementation</h2>
            <p className="text-muted-foreground leading-relaxed">
              For high-performance AMM calculations, here's a Rust implementation:
            </p>
            <CodeBlock code={rustCode} language="rust" />

            <h2 className="text-3xl font-bold mt-12 mb-4">Key Takeaways</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span>The constant product formula ensures automated price discovery</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Impermanent loss is a critical consideration for liquidity providers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Concentrated liquidity improves capital efficiency</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Production implementations require careful handling of precision and gas costs</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-4">Further Reading</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://uniswap.org/whitepaper-v3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Uniswap V3 Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="https://curve.fi/files/stableswap-paper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Curve StableSwap Paper
                </a>
              </li>
            </ul>
          </div>
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

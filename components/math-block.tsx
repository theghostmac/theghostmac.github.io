"use client"

interface MathBlockProps {
  latex: string
  display?: boolean
}

export function MathBlock({ latex, display = true }: MathBlockProps) {
  return <div className={display ? "math-display" : "math-inline"}>{`$$${latex}$$`}</div>
}

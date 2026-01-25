"use client"

import { useLanguage } from "@/lib/language-context"

export function Stats() {
  const { t } = useLanguage()

  const stats = [
    { label: t.stats.totalNFTs, value: "10,000" },
    { label: t.stats.redeemed, value: "4,328" },
    { label: t.stats.pool, value: "5,000" },
    { label: t.stats.remaining, value: "5,672" },
  ]

  return (
    <section className="py-8 sm:py-10 md:py-12 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-0.5 sm:mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

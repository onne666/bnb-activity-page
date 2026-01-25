"use client"

import { useLanguage } from "@/lib/language-context"
import { RedemptionCard } from "./redemption-card"

export function RedemptionSection() {
  const { t } = useLanguage()

  return (
    <section id="redeem" className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <span className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            {t.redemption.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 text-balance">
            {t.redemption.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4">
            {t.redemption.subtitle}
          </p>
        </div>

        <RedemptionCard />
      </div>
    </section>
  )
}

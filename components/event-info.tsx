"use client"

import { Shield, Users, Zap, Gift } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function EventInfo() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Gift,
      title: t.eventInfo.features.airdrop.title,
      description: t.eventInfo.features.airdrop.description,
    },
    {
      icon: Zap,
      title: t.eventInfo.features.instant.title,
      description: t.eventInfo.features.instant.description,
    },
    {
      icon: Shield,
      title: t.eventInfo.features.secure.title,
      description: t.eventInfo.features.secure.description,
    },
    {
      icon: Users,
      title: t.eventInfo.features.limited.title,
      description: t.eventInfo.features.limited.description,
    },
  ]

  return (
    <section id="event" className="py-12 sm:py-16 md:py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            {t.eventInfo.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            {t.eventInfo.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
            {t.eventInfo.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-colors"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

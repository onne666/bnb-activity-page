"use client"

import { useLanguage } from "@/lib/language-context"
import { CountdownTimer } from "./countdown-timer"
import { Calendar, Award } from "lucide-react"

interface HeroSectionProps {
  eventEndDate: Date
}

export function HeroSection({ eventEndDate }: HeroSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-primary/25 rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary/30 rounded-full animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary">{t.hero.badge}</span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            {t.hero.title}{" "}
            <span className="text-primary">{t.hero.titleHighlight}</span>
          </h1>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6 text-pretty px-4">
            {t.hero.description}{" "}
            <span className="text-primary font-semibold">{t.hero.descriptionAmount}</span>
            {t.hero.descriptionEnd}
          </p>

          {/* Launch Info Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-card border border-border rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">{t.hero.launchDate}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-card border border-border rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">{t.hero.anniversary}</span>
            </div>
          </div>

          {/* Countdown */}
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 uppercase tracking-wider">
              {t.hero.countdownTitle}
            </p>
            <CountdownTimer targetDate={eventEndDate} />
          </div>
        </div>
      </div>
    </section>
  )
}

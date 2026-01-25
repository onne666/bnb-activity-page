"use client"

import { useLanguage } from "@/lib/language-context"

export function BNBHistory() {
  const { t } = useLanguage()

  const historyStats = [
    { label: t.history.marketCap, value: "$85B+" },
    { label: t.history.holders, value: "200M+" },
    { label: t.history.transactions, value: "5M+" },
    { label: t.history.dapps, value: "5,000+" },
  ]

  return (
    <section id="history" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            {t.history.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            {t.history.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
            {t.history.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-12 sm:mb-16">
          {/* Timeline Line - Hidden on mobile, shown on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-4 sm:left-6 w-0.5 h-full bg-border" />

          <div className="space-y-6 sm:space-y-8">
            {t.history.timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-4 sm:gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Mobile Timeline Dot */}
                <div className="md:hidden absolute left-4 sm:left-6 top-1 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-2 sm:border-4 border-background z-10" />
                
                {/* Desktop Layout */}
                <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                    <span className="text-primary font-bold text-xl">{item.year}</span>
                    <h3 className="font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Desktop Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                <div className="hidden md:block md:w-1/2" />

                {/* Mobile Layout */}
                <div className="md:hidden pl-6 sm:pl-8 flex-1">
                  <div className="bg-card border border-border rounded-xl p-4 sm:p-5 hover:border-primary/50 transition-colors">
                    <span className="text-primary font-bold text-base sm:text-lg">{item.year}</span>
                    <h3 className="font-semibold text-foreground mt-1.5 mb-1.5 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {historyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-0.5 sm:mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

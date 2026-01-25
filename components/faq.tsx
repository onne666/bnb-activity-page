"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "@/lib/language-context"

export function FAQ() {
  const { t } = useLanguage()

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            {t.faq.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            {t.faq.subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
          {t.faq.items.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-4 sm:px-6 bg-card"
            >
              <AccordionTrigger className="text-left hover:no-underline py-3 sm:py-4 text-foreground text-sm sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-3 sm:pb-4 text-xs sm:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

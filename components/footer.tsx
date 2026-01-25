"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-8 sm:py-10 md:py-12 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 126 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path
                  d="M38.52 53.49L63 29.01L87.5 53.51L101.53 39.48L63 0.95L24.49 39.46L38.52 53.49Z"
                  fill="#F0B90B"
                />
                <path
                  d="M11.47 62.99L25.5 48.96L39.53 62.99L25.5 77.02L11.47 62.99Z"
                  fill="#F0B90B"
                />
                <path
                  d="M38.52 72.51L63 97.01L87.5 72.51L101.54 86.52L63 125.05L24.49 86.54L38.52 72.51Z"
                  fill="#F0B90B"
                />
                <path
                  d="M86.47 62.99L100.5 48.96L114.53 62.99L100.5 77.02L86.47 62.99Z"
                  fill="#F0B90B"
                />
                <path
                  d="M77.04 62.98L63 48.95L52.51 59.43L51.3 60.64L48.97 62.97L63 77.01L77.05 62.97L77.04 62.98Z"
                  fill="#F0B90B"
                />
              </svg>
              <span className="font-semibold text-foreground text-sm sm:text-base">{t.footer.eventName}</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.support}
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
          </div>

          {/* Warning */}
          <div className="pt-6 sm:pt-8 border-t border-border">
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
              {t.footer.warning}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

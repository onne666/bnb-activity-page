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
              <img 
                src="/icon.svg" 
                alt="BNB Rewards Logo" 
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
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

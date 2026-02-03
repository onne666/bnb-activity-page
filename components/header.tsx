"use client"

import Link from "next/link"
import { Globe, Menu, X, Wallet, Loader2 } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { languages, type Language } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSyncContext } from '@/lib/sync-context'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSyncing } = useSyncContext()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/icon.svg" 
              alt="BNB Rewards Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent">BNB Rewards</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="#event" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.nav.event}
            </Link>
            <Link href="#redeem" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.nav.redeem}
            </Link>
            <Link href="#history" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.nav.history}
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.nav.faq}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Connect Wallet Button */}
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading'
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated')

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button
                            onClick={openConnectModal}
                            size="sm"
                            variant="outline"
                            disabled={isSyncing}
                            className="border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground font-medium transition-all disabled:opacity-60"
                          >
                            {isSyncing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 text-primary animate-spin" />
                                <span className="hidden sm:inline">同步中...</span>
                                <span className="sm:hidden">同步中</span>
                              </>
                            ) : (
                              <>
                                <Wallet className="h-4 w-4 mr-2 text-primary" />
                                <span className="hidden sm:inline">{t.nav.connectWallet}</span>
                                <span className="sm:hidden">Connect</span>
                              </>
                            )}
                          </Button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <Button
                            onClick={openChainModal}
                            size="sm"
                            variant="destructive"
                          >
                            Wrong network
                          </Button>
                        )
                      }

                      return (
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={openChainModal}
                            size="sm"
                            variant="outline"
                            className="hidden sm:flex items-center gap-2 border-primary/20 hover:border-primary"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 16,
                                  height: 16,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 16, height: 16 }}
                                  />
                                )}
                              </div>
                            )}
                            <span className="text-xs">{chain.name}</span>
                          </Button>

                          <Button
                            onClick={openAccountModal}
                            size="sm"
                            className="bg-primary hover:opacity-90 text-primary-foreground font-semibold"
                          >
                            <span className="hidden sm:inline">{account.displayName}</span>
                            <span className="sm:hidden">{account.displayName.slice(0, 6)}...</span>
                          </Button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 px-2 sm:px-3">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">{languages[language]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
                {Object.entries(languages).map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={language === code ? "bg-primary/10 text-primary" : ""}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Event Status */}
            <span className="hidden xl:inline-flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-[#0ECB81] animate-pulse" />
              <span className="text-muted-foreground">{t.nav.eventActive}</span>
            </span>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden px-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link
                href="#event"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.event}
              </Link>
              <Link
                href="#redeem"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.redeem}
              </Link>
              <Link
                href="#history"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.history}
              </Link>
              <Link
                href="#faq"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.faq}
              </Link>
              <div className="flex items-center gap-2 py-2">
                <span className="h-2 w-2 rounded-full bg-[#0ECB81] animate-pulse" />
                <span className="text-muted-foreground text-sm">{t.nav.eventActive}</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

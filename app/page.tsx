"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RedemptionSection } from "@/components/redemption-section"
import { Stats } from "@/components/stats"
import { EventInfo } from "@/components/event-info"
import { BNBHistory } from "@/components/bnb-history"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  // Event ends in 7 days from now
  const eventEndDate = new Date()
  eventEndDate.setDate(eventEndDate.getDate() + 7)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Event Intro and Countdown */}
      <HeroSection eventEndDate={eventEndDate} />

      {/* Redemption Section - Directly after countdown */}
      <RedemptionSection />

      {/* Stats Section */}
      <Stats />

      {/* Event Info Section */}
      <EventInfo />

      {/* BNB History Section */}
      <BNBHistory />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  )
}

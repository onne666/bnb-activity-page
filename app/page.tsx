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
  // Event countdown starts from 16 days
  const eventEndDate = new Date()
  eventEndDate.setDate(eventEndDate.getDate() + 16)
  eventEndDate.setHours(23, 59, 59, 999) // Set to end of 16th day

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Event Intro and Countdown */}
      <HeroSection eventEndDate={eventEndDate} />

      {/* Swap Section - Directly after countdown */}
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

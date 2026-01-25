"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const labelKeys = ["Days", "Hours", "Minutes", "Seconds"] as const

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const { language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  // Localized labels
  const labels: Record<string, string[]> = {
    en: ["Days", "Hours", "Minutes", "Seconds"],
    zh: ["天", "时", "分", "秒"],
    ja: ["日", "時間", "分", "秒"],
    ko: ["일", "시간", "분", "초"],
    es: ["Días", "Horas", "Minutos", "Segundos"],
    fr: ["Jours", "Heures", "Minutes", "Secondes"],
    de: ["Tage", "Stunden", "Minuten", "Sekunden"],
    ru: ["Дней", "Часов", "Минут", "Секунд"],
    pt: ["Dias", "Horas", "Minutos", "Segundos"],
    tr: ["Gün", "Saat", "Dakika", "Saniye"],
    vi: ["Ngày", "Giờ", "Phút", "Giây"],
    ar: ["أيام", "ساعات", "دقائق", "ثواني"],
  }

  const currentLabels = labels[language] || labels.en

  useEffect(() => {
    setMounted(true)
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {currentLabels.map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="bg-card border border-border rounded-lg p-2 sm:p-3 md:p-4 min-w-[50px] sm:min-w-[70px] md:min-w-[90px]">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary">00</span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2">{label}</span>
          </div>
        ))}
      </div>
    )
  }

  const timeUnits = [
    { label: currentLabels[0], value: timeLeft.days },
    { label: currentLabels[1], value: timeLeft.hours },
    { label: currentLabels[2], value: timeLeft.minutes },
    { label: currentLabels[3], value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-card border border-primary/30 rounded-lg p-2 sm:p-3 md:p-4 min-w-[50px] sm:min-w-[70px] md:min-w-[90px] shadow-[0_0_20px_rgba(240,185,11,0.15)]">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary tabular-nums">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-xl sm:text-2xl md:text-4xl text-primary font-bold mb-4 sm:mb-5 md:mb-6">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

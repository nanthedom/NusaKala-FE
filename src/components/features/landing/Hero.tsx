'use client'

import {Sparkles } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'

export function Hero() {
  const { tSync } = useTranslation()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero SVG Background - Full Screen */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero.svg"
          alt="Indonesian Cultural Heritage"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-yellow-900/20"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 flex items-start justify-center min-h-screen pt-32 md:pt-40 lg:pt-44">
        <div className="text-center max-w-6xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full border border-orange-200 shadow-2xl">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-800">
              {tSync('hero.badge', 'Cultural Discovery Platform')}
            </span>
          </div>

          {/* Main Title with enhanced contrast */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] block stroke-text">
                {tSync('hero.title', 'Discover the Magic of')}
              </span>
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] block filter contrast-125 brightness-110">
                {tSync('hero.subtitle', 'Indonesian Culture')}
              </span>
            </h1>

            <div className="bg-black/10 backdrop-blur-sm rounded-2xl px-8 py-6 mx-auto max-w-4xl border border-white/10">
              <p className="text-lg md:text-xl text-white font-semibold leading-relaxed drop-shadow-lg">
                {tSync('hero.description', 'The leading platform connecting travelers with the rich cultural heritage of the archipelago.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
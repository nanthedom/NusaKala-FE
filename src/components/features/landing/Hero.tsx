'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link';

export function Hero() {
  const { tSync } = useTranslation()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-accent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(205,127,50,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,69,19,0.1),transparent_50%)]"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
        <div className="w-full h-full rounded-full border-4 border-nusa-gold animate-pulse-slow"></div>
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 opacity-20">
        <div className="w-full h-full bg-nusa-bronze rounded-lg rotate-45 animate-float"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-nusa-gold/30 shadow-nusa-gold">
              <Sparkles className="w-4 h-4 text-nusa-gold" />
              <span className="text-sm font-medium text-nusa-dark-brown">
                {tSync('hero.badge', 'Cultural Discovery Platform')}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="text-nusa-dark-brown">
                  {tSync('hero.title', 'Discover the Magic of')}
                </span>
                <br />
                <span className="text-gradient-hero">
                  {tSync('hero.subtitle', 'Indonesian Culture')}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-nusa-dark-brown max-w-2xl leading-relaxed">
                {tSync('hero.description', 'The leading platform connecting travelers with the rich cultural heritage of the archipelago. Explore, learn, and experience authentic Indonesia.')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:bg-gradient-secondary text-white shadow-nusa-gold hover:shadow-nusa-bronze transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <Link href="/nusa-discovery">
                  {tSync('hero.cta', 'Start Exploring')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-nusa-gold text-nusa-dark-brown hover:bg-nusa-gold/10 backdrop-blur-sm transition-all duration-300 group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {tSync('hero.watchVideo', 'Watch Video')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-nusa-gold/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-nusa-dark-brown">34</div>
                <div className="text-sm text-nusa-brown font-medium">{tSync('hero.stats.provinces', 'Provinces')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-nusa-dark-brown">1000+</div>
                <div className="text-sm text-nusa-brown font-medium">{tSync('hero.stats.cultures', 'Cultures')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-nusa-dark-brown">50k+</div>
                <div className="text-sm text-nusa-brown font-medium">{tSync('hero.stats.users', 'Users')}</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              <div className="w-full h-[600px] bg-white/90 backdrop-blur-sm rounded-3xl border border-nusa-gold/20 shadow-2xl overflow-hidden">
                {/* Background pattern inside the card */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.3),transparent_70%)]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(205,127,50,0.3),transparent_70%)]"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 animate-float p-8">
                    <div className="w-80 h-48 mx-auto relative">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        {/* Indonesia archipelago illustration */}
                        <path
                          d="M50,100 Q100,80 150,90 Q200,100 250,95 Q300,85 350,90 Q320,110 270,115 Q220,120 170,115 Q120,110 70,115 Z"
                          fill="#228b22"
                          className="drop-shadow-lg"
                        />
                        <path
                          d="M80,130 Q130,120 180,125 Q230,130 280,125 Q330,120 380,125 Q350,145 300,150 Q250,155 200,150 Q150,145 100,150 Z"
                          fill="#16a34a"
                          className="drop-shadow-lg"
                        />
                        <path
                          d="M30,150 Q80,140 130,145 Q180,150 230,145 Q280,140 330,145 Q300,165 250,170 Q200,175 150,170 Q100,165 50,170 Z"
                          fill="#15803d"
                          className="drop-shadow-lg"
                        />
                        {/* Cultural markers */}
                        <circle cx="120" cy="95" r="4" fill="#d4af37" className="animate-pulse" />
                        <circle cx="200" cy="100" r="4" fill="#d4af37" className="animate-pulse" />
                        <circle cx="280" cy="90" r="4" fill="#d4af37" className="animate-pulse" />
                        <circle cx="160" cy="135" r="4" fill="#cd7f32" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <circle cx="240" cy="130" r="4" fill="#cd7f32" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        <circle cx="180" cy="155" r="4" fill="#8b4513" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-nusa-dark-brown">
                        {tSync('hero.illustration.title', 'Nusantara')}
                      </h3>
                      <p className="text-nusa-brown font-medium">
                        {tSync('hero.illustration.subtitle', '17,508 Islands • 300+ Tribes • 700+ Languages')}
                      </p>
                    </div>

                    {/* Cultural elements */}
                    <div className="flex justify-center gap-4 pt-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-nusa-gold">
                        <span className="text-white text-xl">🎭</span>
                      </div>
                      <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center shadow-nusa-bronze">
                        <span className="text-white text-xl">🏛️</span>
                      </div>
                      <div className="w-12 h-12 bg-nusa-green rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">🎨</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-2xl shadow-nusa-gold animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-secondary rounded-xl shadow-nusa-bronze animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-2 w-8 h-8 bg-nusa-gold rounded-full shadow-lg animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-nusa-gold transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-nusa-dark-brown rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-nusa-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-10 h-10 text-nusa-gold" />
                  </div>
                  <h3 className="text-xl font-bold">{tSync('hero.video.title', 'NusaKala Introduction Video')}</h3>
                  <p className="text-gray-300">{tSync('hero.video.description', 'Discover the beauty of Indonesian culture')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-nusa-gold rounded-full flex justify-center backdrop-blur-sm bg-white/20">
          <div className="w-1 h-3 bg-nusa-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
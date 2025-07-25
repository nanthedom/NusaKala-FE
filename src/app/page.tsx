'use client'

import { LandingHeader } from '@/components/layout/LandingHeader'
import { Hero } from '@/components/features/landing/Hero'
import { InteractiveMap } from '@/components/features/landing/InteractiveMap'
import { Features } from '@/components/features/landing/Features'  
import { FAQ } from '@/components/features/landing/FAQ'
import { Footer } from '@/components/features/landing/Footer'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'

export default function LandingPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-nusa-cream via-white to-nusa-beige"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-nusa-dark-brown-darker/20 via-nusa-brown/5 to-transparent"></div>
        </div>

        <LandingHeader />
        
        <main className="relative">
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-nusa-cream/95 via-nusa-beige/85 to-nusa-cream/95 -z-10"></div>
            <Hero />
          </section>

          <div className="relative h-24 overflow-hidden -mt-1">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroToMap" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5f1e8" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.97" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.98" />
                </linearGradient>
              </defs>
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="url(#heroToMap)"
              />
            </svg>
          </div>

          <section id="discovery" className="relative -mt-1">
            <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-nusa-cream/92 to-white/95 -z-10"></div>
            <InteractiveMap />
          </section>

          <div className="relative h-20 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mapToFeatures" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#f5f1e8" stopOpacity="0.93" />
                </linearGradient>
              </defs>
              <path
                d="M1200,120V73.71c-47.79-22.2-103.59-32.17-158-28-70.36,5.37-136.33,33.31-206.8,37.5C761.36,87.57,687.66,66.33,617,47.95,547.73,29.95,478.7,23.07,407.6,34.87c-36.15,6-69.85,17.84-104.45,29.34C210.51,95,86.71,134.29,0,67.53V120Z"
                fill="url(#mapToFeatures)"
              />
            </svg>
          </div>
          
          <section id="features" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-nusa-cream/93 via-white/90 to-nusa-cream-dark/88 -z-10"></div>
            <Features />
          </section>

          <div className="relative h-28 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="featuresToFaq" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5f1e8" stopOpacity="0.88" />
                  <stop offset="30%" stopColor="#e8dcc0" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#ddd0b0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a0521a" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="url(#featuresToFaq)"
              />
            </svg>
          </div>
          
          <section id="faq" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-nusa-brown-light/30 via-nusa-beige-dark/85 to-nusa-brown-light/40 -z-10"></div>
            <FAQ />
          </section>

          <div className="relative h-32 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="faqToFooter" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(160, 82, 26, 0.4)" />
                  <stop offset="25%" stopColor="rgba(139, 69, 19, 0.6)" />
                  <stop offset="50%" stopColor="rgba(101, 67, 33, 0.8)" />
                  <stop offset="75%" stopColor="rgba(74, 47, 24, 0.9)" />
                  <stop offset="100%" stopColor="#4a2f18" />
                </linearGradient>
              </defs>
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="url(#faqToFooter)"
              />
            </svg>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
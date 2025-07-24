'use client'

import { LandingHeader } from '@/components/layout/LandingHeader'
import { Hero } from '@/components/features/landing/Hero'
import { InteractiveMap } from '@/components/features/landing/InteractiveMap'
import { Features } from '@/components/features/landing/Features'  
import { FAQ } from '@/components/features/landing/FAQ'
import { Footer } from '@/components/features/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Main background gradient */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-yellow-50"></div>
      </div>

      <LandingHeader />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative">
          <Hero />
        </section>

        {/* Smooth transition from Hero to Map */}
        <div className="relative h-32 overflow-hidden -mt-1">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroToMap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.3)" stopOpacity="0.8" />
                <stop offset="30%" stopColor="rgba(251,146,60,0.2)" stopOpacity="0.6" />
                <stop offset="70%" stopColor="rgba(254,243,199,0.8)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fef7ed" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="url(#heroToMap)"
            />
          </svg>
        </div>

        {/* Interactive Map Section */}
        <section id="discovery" className="relative -mt-1">
          <InteractiveMap />
        </section>

        {/* Transition from Map to Features */}
        <div className="relative h-24 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mapToFeatures" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef7ed" stopOpacity="1" />
                <stop offset="30%" stopColor="rgba(254,243,199,0.9)" stopOpacity="0.9" />
                <stop offset="70%" stopColor="rgba(255,251,235,0.95)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f5f1e8" stopOpacity="0.98" />
              </linearGradient>
            </defs>
            <path
              d="M1200,120V73.71c-47.79-22.2-103.59-32.17-158-28-70.36,5.37-136.33,33.31-206.8,37.5C761.36,87.57,687.66,66.33,617,47.95,547.73,29.95,478.7,23.07,407.6,34.87c-36.15,6-69.85,17.84-104.45,29.34C210.51,95,86.71,134.29,0,67.53V120Z"
              fill="url(#mapToFeatures)"
            />
          </svg>
        </div>
        
        {/* Features Section */}
        <section id="features" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-25 via-white/90 to-yellow-25 -z-10"></div>
          <Features />
        </section>

        {/* Transition from Features to FAQ */}
        <div className="relative h-28 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="featuresToFaq" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5f1e8" stopOpacity="0.9" />
                <stop offset="30%" stopColor="rgba(251,146,60,0.2)" stopOpacity="0.7" />
                <stop offset="70%" stopColor="rgba(234,88,12,0.3)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgba(154,52,18,0.4)" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="url(#featuresToFaq)"
            />
          </svg>
        </div>
        
        {/* FAQ Section */}
        <section id="faq" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-100/40 via-orange-50/80 to-orange-100/60 -z-10"></div>
          <FAQ />
        </section>

        {/* Transition from FAQ to Footer */}
        <div className="relative h-32 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="faqToFooter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(154,52,18,0.4)" />
                <stop offset="25%" stopColor="rgba(124,45,18,0.6)" />
                <stop offset="50%" stopColor="rgba(92,38,16,0.8)" />
                <stop offset="75%" stopColor="rgba(69,26,12,0.9)" />
                <stop offset="100%" stopColor="#451a0c" />
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
  )
}
import { LandingHeader } from '@/components/layout/LandingHeader'
import { EventsSection } from '@/components/features/events/EventsSection'
import { Footer } from '@/components/features/landing/Footer'

export default function EventsPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-nusa-cream via-white to-nusa-beige"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-nusa-dark-brown-darker/20 via-nusa-brown/5 to-transparent"></div>
      </div>
      
      <main className="relative">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-nusa-cream/95 via-nusa-beige/85 to-nusa-cream/95 -z-10"></div>
          <EventsSection />
        </section>
      </main>
    </div>
  )
} 
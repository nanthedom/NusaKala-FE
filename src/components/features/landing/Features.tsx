'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import Image from 'next/image'

export function Features() {
  const { tSync } = useTranslation()

  const features = [
    {
      image: '/nusa-discovery.svg',
      title: tSync('features.discovery.title', 'Nusa Discovery'),
      description: tSync('features.discovery.description', 'Explore Indonesia\'s interactive map and discover the unique culture of each province with in-depth and engaging information.'),
      gradient: 'from-nusa-gold to-nusa-bronze',
      href: '/nusa-discovery',
      badge: tSync('features.discovery.badge', 'Interactive Map')
    },
    {
      image: '/cultural-events.svg',
      title: tSync('features.events.title', 'Cultural Events'),
      description: tSync('features.events.description', 'Find and join festivals, workshops, and real-time cultural events throughout Indonesia.'),
      gradient: 'from-nusa-green to-nusa-green-dark',
      href: '/events',
      badge: tSync('features.events.badge', 'Live Events')
    },
    {
      image: '/nusa-native.svg',
      title: tSync('features.native.title', 'Nusa Native'),
      description: tSync('features.native.description', 'AI assistant and translator that helps you communicate perfectly in regional languages.'),
      gradient: 'from-nusa-bronze to-nusa-brown',
      href: '/nusa-native',
      badge: tSync('features.native.badge', 'AI Powered')
    },
    {
      image: '/community-hub.svg',
      title: tSync('features.community.title', 'Community Hub'),
      description: tSync('features.community.description', 'Join the cultural enthusiast community, share your work, and connect with traditional art practitioners.'),
      gradient: 'from-nusa-red to-nusa-red-dark',
      href: '/community-hub',
      badge: tSync('features.community.badge', 'Social Platform')
    },
    {
      image: '/nusa-cam.svg',
      title: tSync('features.cam.title', 'Nusa Cam'),
      description: tSync('features.cam.description', 'AI technology to recognize cultural objects, batik, monuments, and provide instant educational information.'),
      gradient: 'from-nusa-gold-light to-nusa-gold',
      href: '/nusa-cam',
      badge: tSync('features.cam.badge', 'AI Recognition')
    },
    {
      image: '/daily-trivia.svg',
      title: tSync('features.trivia.title', 'Daily Trivia'),
      description: tSync('features.trivia.description', 'Learn Indonesian culture in a fun way through daily quizzes and earn points on the leaderboard.'),
      gradient: 'from-nusa-bronze-light to-nusa-bronze',
      href: '/trivia',
      badge: tSync('features.trivia.badge', 'Gamified Learning')
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-nusa-cream-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(205,127,50,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-nusa-gold/10 backdrop-blur-sm rounded-full mb-6 border border-nusa-gold/20">
            <Sparkles className="w-4 h-4 text-nusa-gold" />
            <span className="text-sm font-medium text-nusa-dark-brown">
              {tSync('features.badge', 'Platform Features')}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-nusa-dark-brown mb-6 tracking-tight">
            <span className="text-gradient-primary">
              {tSync('features.title', 'Outstanding Features')}
            </span>
          </h2>
          <p className="text-lg text-nusa-brown max-w-3xl mx-auto leading-relaxed">
            {tSync('features.subtitle', 'Connecting You with Indonesian Culture')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm hover:transform hover:scale-105 overflow-hidden"
            >
              <CardContent className="p-0 relative">
                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90`}></div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  
                  {/* Badge on image */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className="bg-white/90 backdrop-blur-sm text-nusa-dark-brown border-0 shadow-lg"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-nusa-dark-brown mb-3 group-hover:text-nusa-gold transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-nusa-brown leading-relaxed mb-6 text-sm">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-3xl p-12 backdrop-blur-sm border border-nusa-gold/20 animate-fade-in-up relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_70%)]"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {tSync('features.cta.title', 'Ready to Explore Indonesian Culture?')}
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {tSync('features.cta.description', 'Join thousands of users who have experienced the extraordinary journey of exploring the cultural richness of the archipelago.')}
            </p>
            <Button 
              size="lg"
              className="bg-white text-nusa-dark-brown hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium px-8"
              asChild
            >
              <Link href="/nusa-discovery" className="flex items-center">
                {tSync('features.cta.button', 'Get Started')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-nusa-dark-brown mb-2">6</div>
            <div className="text-sm text-nusa-brown font-medium">
              {tSync('features.stats.features', 'Core Features')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-nusa-dark-brown mb-2">34</div>
            <div className="text-sm text-nusa-brown font-medium">
              {tSync('features.stats.provinces', 'Provinces')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-nusa-dark-brown mb-2">1000+</div>
            <div className="text-sm text-nusa-brown font-medium">
              {tSync('features.stats.cultures', 'Cultural Items')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
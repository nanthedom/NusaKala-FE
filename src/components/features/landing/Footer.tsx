'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Heart,
  Send
} from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { tSync } = useTranslation()

  // const productLinks = [
  //   { name: tSync('footer.product.discovery', 'Nusa Discovery'), href: '/nusa-discovery' },
  //   { name: tSync('footer.product.events', 'Cultural Events'), href: '/events' },
  //   { name: tSync('footer.product.native', 'Nusa Native'), href: '/nusa-native' },
  //   { name: tSync('footer.product.cam', 'Nusa Cam'), href: '/nusa-cam' },
  //   { name: tSync('footer.product.community', 'Community Hub'), href: '/community-hub' },
  //   { name: tSync('footer.product.trivia', 'Daily Trivia'), href: '/trivia' }
  // ]

  // const supportLinks = [
  //   { name: tSync('footer.support.help', 'Help Center'), href: '/help' },
  //   { name: tSync('footer.support.contact', 'Contact Us'), href: '/contact' },
  //   { name: tSync('footer.support.faq', 'FAQ'), href: '/faq' },
  //   { name: tSync('footer.support.guide', 'User Guide'), href: '/guide' }
  // ]

  // const legalLinks = [
  //   { name: tSync('footer.legal.privacy', 'Privacy Policy'), href: '/privacy' },
  //   { name: tSync('footer.legal.terms', 'Terms of Service'), href: '/terms' },
  //   { name: tSync('footer.legal.cookies', 'Cookie Policy'), href: '/cookies' },
  //   { name: tSync('footer.legal.license', 'Licenses'), href: '/licenses' }
  // ]

  // const socialLinks = [
  //   { icon: Facebook, href: 'https://facebook.com/nusākāla', label: 'Facebook' },
  //   { icon: Twitter, href: 'https://twitter.com/nusākāla', label: 'Twitter' },
  //   { icon: Instagram, href: 'https://instagram.com/nusākāla', label: 'Instagram' },
  //   { icon: Youtube, href: 'https://youtube.com/@nusākāla', label: 'YouTube' }
  // ]

  return (
    <footer className="bg-nusa-dark-brown-darker text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(205,127,50,0.15),transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10">
        {/* Newsletter section */}
        <div className="border-b border-nusa-gold/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-white">
                {tSync('footer.newsletter.title', 'Get Latest Indonesian Culture Updates')}
              </h3>
              <p className="text-nusa-cream mb-8 max-w-2xl mx-auto leading-relaxed">
                {tSync('footer.newsletter.description', 'Subscribe to our newsletter to get the latest information about cultural events, festivals, and NusaKala feature updates.')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={tSync('footer.newsletter.placeholder', 'Enter your email')}
                  className="bg-white/20 border-nusa-gold/50 text-white placeholder:text-nusa-cream/70 focus:border-nusa-gold focus:ring-nusa-gold/30 backdrop-blur-sm"
                />
                <Button className="bg-gradient-primary hover:bg-gradient-secondary text-white font-medium whitespace-nowrap shadow-nusa-gold hover:shadow-nusa-bronze transition-all duration-300 hover:scale-105 group">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  {tSync('footer.newsletter.subscribe', 'Subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-nusa-gold/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-nusa-beige">
                <span>© 2024 NusaKala. {tSync('footer.copyright', 'All rights reserved.')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-nusa-beige">
                <span>{tSync('footer.madeWith', 'Made with')}</span>
                <Heart className="w-4 h-4 text-nusa-red-light fill-current animate-pulse" />
                <span>{tSync('footer.madeIn', 'in Indonesia')}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-nusa-beige">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-nusa-green-light rounded-full animate-pulse"></div>
                  <span>{tSync('footer.status', 'All systems operational')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
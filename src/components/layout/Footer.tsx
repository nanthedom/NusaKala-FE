'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-nusa-gold flex items-center justify-center">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <span className="text-xl font-bold text-nusa-darkBrown">NusaKala</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Menghubungkan dunia dengan kekayaan budaya Indonesia
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/nusa-discovery" className="hover:text-nusa-gold">Nusa Discovery</Link></li>
              <li><Link href="/events" className="hover:text-nusa-gold">Events</Link></li>
              <li><Link href="/nusa-cam" className="hover:text-nusa-gold">Nusa Cam</Link></li>
              <li><Link href="/community-hub" className="hover:text-nusa-gold">Community</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-nusa-gold">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-nusa-gold">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-nusa-gold">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-nusa-gold">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-nusa-gold">Terms</Link></li>
              <li><Link href="/cookies" className="hover:text-nusa-gold">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 NusaKala. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
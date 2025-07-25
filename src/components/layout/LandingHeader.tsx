// LandingHeader.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function LandingHeader() {
  const { tSync } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: tSync('nav.discovery', 'Discovery'), href: '#discovery' },
    { name: tSync('nav.events', 'Events'), href: '/events' },
    { name: tSync('nav.features', 'Features'), href: '#features' },
    { name: tSync('nav.faq', 'FAQ'), href: '#faq' },
    { name: tSync('nav.contact', 'Contact'), href: '#contact' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-orange-200' 
        : 'bg-black/30 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group py-2">
            <div className="w-36 h-auto">
              <img
                src="/nusakala.svg"
                alt="NusaKala Logo"
                className={`w-full h-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'brightness-100' : 'brightness-0 invert'
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-300 font-semibold relative group text-lg ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-orange-600' 
                    : 'text-white hover:text-orange-300'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-orange-600' : 'bg-orange-300'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              className={`transition-all duration-300 font-medium ${
                isScrolled
                  ? 'border-gray-300 bg-white text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600'
                  : 'border-white/60 bg-white/90 text-gray-800 hover:bg-white hover:border-white'
              }`}
            >
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{tSync('lang.current', 'EN')}</span>
            </Button>
            
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="ghost" 
                asChild
                className={`transition-all duration-300 font-semibold ${
                  isScrolled
                    ? 'text-gray-800 hover:text-orange-600 hover:bg-orange-50'
                    : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}
              >
                <Link href="/auth/login">{tSync('auth.login', 'Login')}</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-6"
                asChild
              >
                <Link href="/auth/register">{tSync('common.getStarted', 'Get Started')}</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-800 hover:text-orange-600 hover:bg-orange-50'
                  : 'text-white hover:text-orange-300 hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-orange-200 py-4 shadow-lg animate-fade-in-up rounded-b-lg">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 hover:text-orange-600 transition-colors duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-orange-200">
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full border-gray-300 text-gray-800 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 font-semibold"
                >
                  <Link href="/auth/login">{tSync('auth.login', 'Login')}</Link>
                </Button>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                  asChild
                >
                  <Link href="/auth/register">{tSync('common.getStarted', 'Get Started')}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
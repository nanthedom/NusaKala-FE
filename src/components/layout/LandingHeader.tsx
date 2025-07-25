'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, User, LogOut } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuth } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LandingHeader() {
  const { tSync } = useTranslation()
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navigation = [
    { name: tSync('nav.discovery', 'Discovery'), href: '#discovery' },
    { name: tSync('nav.events', 'Events'), href: '/events' },
    { name: tSync('nav.features', 'Features'), href: '#features' },
    { name: tSync('nav.faq', 'FAQ'), href: '#faq' },
    { name: tSync('nav.contact', 'Contact'), href: '#contact' }
  ]

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'tourist':
        return 'Tourist'
      case 'organizer':
        return 'Event Organizer'
      case 'creator':
        return 'Cultural Creator'
      default:
        return role
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-nusa-gold/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-32 h-auto">
                <img
                src="/nusakala.svg"
                alt="NusaKala Logo"
                className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-nusa-dark-brown hover:text-nusa-gold transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              className="border-nusa-gold/50 hover:bg-nusa-gold/10 hover:border-nusa-gold backdrop-blur-sm text-nusa-dark-brown hover:text-nusa-gold transition-all duration-300"
            >
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{tSync('lang.current', 'EN')}</span>
            </Button>
            
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-nusa-gold/50 hover:bg-nusa-gold/10 hover:border-nusa-gold text-nusa-dark-brown hover:text-nusa-gold transition-all duration-300"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {user?.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {getRoleDisplayName(user?.role || '')}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {isLoading ? 'Signing out...' : 'Sign out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    asChild
                    className="text-nusa-dark-brown hover:text-nusa-gold hover:bg-nusa-gold/10 transition-all duration-300"
                  >
                    <Link href="/auth/login">{tSync('auth.login', 'Login')}</Link>
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:bg-gradient-secondary text-white shadow-nusa-gold hover:shadow-nusa-bronze transition-all duration-300 hover:scale-105" 
                    asChild
                  >
                    <Link href="/auth/register">{tSync('common.getStarted', 'Get Started')}</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-nusa-dark-brown hover:text-nusa-gold hover:bg-nusa-gold/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-nusa-gold/30 py-4 shadow-lg animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-nusa-dark-brown hover:text-nusa-gold transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-nusa-gold/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-nusa-gold/30">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm text-nusa-brown">
                      <p className="font-medium">{user?.email}</p>
                      <p className="text-xs">{getRoleDisplayName(user?.role || '')}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-nusa-gold/50 text-nusa-dark-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold transition-all duration-300"
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-nusa-gold/50 text-nusa-dark-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold transition-all duration-300"
                    >
                      <Link href="/profile">Profile</Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {isLoading ? 'Signing out...' : 'Sign out'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-nusa-gold/50 text-nusa-dark-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold transition-all duration-300"
                    >
                      <Link href="/auth/login">{tSync('auth.login', 'Login')}</Link>
                    </Button>
                    <Button 
                      className="bg-gradient-primary hover:bg-gradient-secondary text-white w-full shadow-nusa-gold hover:shadow-nusa-bronze transition-all duration-300 hover:scale-105" 
                      asChild
                    >
                      <Link href="/auth/register">{tSync('common.getStarted', 'Get Started')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
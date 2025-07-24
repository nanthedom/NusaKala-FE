'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MapPin, User, LogOut, Settings, Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-nusa-gold flex items-center justify-center">
            <span className="text-white font-bold text-sm">NK</span>
          </div>
          <span className="text-xl font-bold text-nusa-darkBrown">NusaKala</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="transition-colors hover:text-nusa-gold"
          >
            Dashboard
          </Link>
          <Link 
            href="/nusa-discovery" 
            className="transition-colors hover:text-nusa-gold"
          >
            Nusa Discovery
          </Link>
          <Link 
            href="/events" 
            className="transition-colors hover:text-nusa-gold"
          >
            Events
          </Link>
          <Link 
            href="/nusa-native" 
            className="transition-colors hover:text-nusa-gold"
          >
            Nusa Native
          </Link>
          <Link 
            href="/community-hub" 
            className="transition-colors hover:text-nusa-gold"
          >
            Community Hub
          </Link>
          <Link 
            href="/nusa-cam" 
            className="transition-colors hover:text-nusa-gold"
          >
            Nusa Cam
          </Link>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profile.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.username}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/dashboard" className="py-2 hover:text-nusa-gold">
              Dashboard
            </Link>
            <Link href="/nusa-discovery" className="py-2 hover:text-nusa-gold">
              Nusa Discovery
            </Link>
            <Link href="/events" className="py-2 hover:text-nusa-gold">
              Events
            </Link>
            <Link href="/nusa-native" className="py-2 hover:text-nusa-gold">
              Nusa Native
            </Link>
            <Link href="/community-hub" className="py-2 hover:text-nusa-gold">
              Community Hub
            </Link>
            <Link href="/nusa-cam" className="py-2 hover:text-nusa-gold">
              Nusa Cam
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
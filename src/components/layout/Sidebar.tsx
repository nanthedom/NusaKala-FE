// 'use client'
"use client"

import Link from 'next/link'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MapPin,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  MessageCircle,
  Users,
  Camera,
  Trophy
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const navigationItems = [
    { name: 'Nusa Discovery', href: '/nusa-discovery', icon: Home },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Nusa Native', href: '/nusa-native', icon: MessageCircle },
    { name: 'Community Hub', href: '/community-hub', icon: Users },
    { name: 'Nusa Cam', href: '/nusa-cam', icon: Camera },
  ]

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white border-r border-nusa-gold/20 transition-all duration-300 ease-in-out flex flex-col",
          "md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isOpen ? "w-64" : "md:w-16"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-nusa-gold/20">
          <Link 
            href="/nusa-discovery" 
            className={cn(
                "flex items-center space-x-3 transition-opacity duration-200",
                !isOpen && !isMobile ? "opacity-0" : "opacity-100"
            )}
            onClick={closeSidebar}
          >
            <div className="h-8 w-auto max-w-[120px] flex items-center">
              <Image
                src="/nusakala.svg"
                alt="NusaKala Logo"
                width={100}
                height={32}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Toggle buttons */}
          <div className="flex items-center gap-2">
            {/* Desktop toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex h-8 w-8 p-0 hover:bg-nusa-gold/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <ChevronLeft className="h-4 w-4 text-nusa-gold" />
              ) : (
                <ChevronRight className="h-4 w-4 text-nusa-gold" />
              )}
            </Button>

            {/* Mobile close */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-8 w-8 p-0 hover:bg-nusa-gold/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4 text-nusa-gold" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  "text-nusa-dark-brown hover:bg-nusa-gold/10 hover:text-nusa-gold",
                  "group relative"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {(isOpen || isMobile) && (
                  <span className="truncate">{item.name}</span>
                )}
                {!isOpen && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-nusa-dark-brown text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Profile & Logout */}
        <div className="p-4 border-t border-nusa-gold/20 space-y-4">
          <Link
            href="/profile"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-nusa-dark-brown hover:bg-nusa-gold/10 hover:text-nusa-gold transition-all duration-200"
            onClick={closeSidebar}
          >
            <User className="h-5 w-5 flex-shrink-0" />
            {(isOpen || isMobile) && <span className="truncate">Profile</span>}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start px-3 py-2 text-sm text-nusa-brown hover:text-nusa-gold hover:bg-nusa-gold/10 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            {(isOpen || isMobile) && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}

export function MobileHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="md:hidden sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/nusa-discovery" className="flex items-center space-x-2">
          <div className="h-6 w-auto flex items-center">
            <Image
              src="/nusakala.svg"
              alt="NusaKala Logo"
              width={90}
              height={24}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="w-8" />
      </div>
    </header>
  )
}
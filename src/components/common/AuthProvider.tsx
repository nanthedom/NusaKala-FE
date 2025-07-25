'use client'

import { useEffect, useState } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nusa-dark-brown mx-auto"></div>
          <p className="mt-2 text-nusa-brown">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 
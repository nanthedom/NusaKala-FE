'use client'

import { Sidebar, MobileHeader } from '@/components/layout/Sidebar'
import { useState } from 'react'

export default function NusaDiscoveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Header + Main Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-16'}`}>
        {/* Mobile Header */}
        <MobileHeader onToggleSidebar={() => setSidebarOpen(true)} />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  )
}
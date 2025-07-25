'use client'

import { Sidebar, MobileHeader } from '@/components/layout/Sidebar'
import { useState } from 'react'

export default function NusaCamLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <MobileHeader onToggleSidebar={() => setSidebarOpen(true)} />

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-6 bg-gray-50/50">
                    {children}
                </main>
            </div>
        </div>
    )
}
'use client'

import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, Shield, Calendar, Settings, Bell, Trash2 } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-nusa-cream via-nusa-beige to-nusa-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img src="/nusakala.svg" alt="NusaKala" className="h-12" />
              </div>
              <h1 className="text-4xl font-bold text-nusa-dark-brown mb-2">
                Profile Settings
              </h1>
              <p className="text-nusa-brown text-lg">
                Manage your account information and preferences
              </p>
            </div>

            {/* Profile Information */}
            <Card className="mb-8 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-nusa-dark-brown text-2xl">
                  <User className="h-6 w-6" />
                  Account Information
                </CardTitle>
                <CardDescription className="text-nusa-brown text-base">
                  Your basic account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-nusa-dark-brown flex items-center gap-2 font-medium">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-nusa-cream/50 border-nusa-gold/30 text-nusa-dark-brown"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-nusa-dark-brown flex items-center gap-2 font-medium">
                      <Shield className="h-4 w-4" />
                      Account Type
                    </Label>
                    <Input
                      id="role"
                      value={getRoleDisplayName(user?.role || '')}
                      disabled
                      className="bg-nusa-cream/50 border-nusa-gold/30 text-nusa-dark-brown"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="created" className="text-nusa-dark-brown flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </Label>
                  <Input
                    id="created"
                    value={formatDate(user?.createdAt)}
                    disabled
                    className="bg-nusa-cream/50 border-nusa-gold/30 text-nusa-dark-brown"
                  />
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-nusa-gold/20">
                  <div className="text-center p-4 bg-nusa-cream/30 rounded-lg">
                    <div className="text-2xl font-bold text-nusa-dark-brown">{user?.streak || 0}</div>
                    <div className="text-sm text-nusa-brown">Day Streak</div>
                  </div>
                  <div className="text-center p-4 bg-nusa-cream/30 rounded-lg">
                    <div className="text-2xl font-bold text-nusa-dark-brown">{user?.points || 0}</div>
                    <div className="text-sm text-nusa-brown">Points Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-nusa-dark-brown text-2xl">
                  Account Actions
                </CardTitle>
                <CardDescription className="text-nusa-brown text-base">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    className="w-full border-nusa-gold/50 text-nusa-dark-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold transition-all duration-300 h-12"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-nusa-gold/50 text-nusa-dark-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold transition-all duration-300 h-12"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </div>
                
                <div className="pt-6 border-t border-nusa-gold/20">
                  <Button 
                    variant="destructive"
                    className="w-full h-12 bg-red-600 hover:bg-red-700 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                  <p className="text-xs text-nusa-brown mt-3 text-center">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Button 
                variant="ghost" 
                className="text-nusa-brown hover:text-nusa-dark-brown hover:bg-nusa-gold/10 transition-all duration-300"
                onClick={() => window.history.back()}
              >
                ← Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Check, Loader2 } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function LanguageSwitcher() {
  const { language, supportedLanguages, isLoading, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  const getCurrentLanguageName = () => {
    const currentLang = supportedLanguages.find(lang => lang.code === language)
    return currentLang?.name || language.toUpperCase()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-nusa-gold/30 hover:bg-nusa-gold/10 hover:border-nusa-gold backdrop-blur-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Globe className="w-4 h-4 mr-2" />
          )}
          <span className="hidden sm:inline">{getCurrentLanguageName()}</span>
          <span className="sm:hidden uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-64 overflow-y-auto">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{lang.name}</span>
            {language === lang.code && <Check className="w-4 h-4 text-nusa-gold" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
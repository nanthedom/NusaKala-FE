'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translationService } from '@/services/translation.service'
import { useEffect, useState } from 'react'

interface TranslationState {
  language: string
  supportedLanguages: Array<{code: string, name: string}>
  isLoading: boolean
  setLanguage: (lang: string) => void
  fetchSupportedLanguages: () => Promise<void>
}

export const useTranslationStore = create<TranslationState>()(
  persist(
    (set) => ({
      language: 'id',
      supportedLanguages: [],
      isLoading: false,
      
      setLanguage: (lang: string) => set({ language: lang }),
      
      fetchSupportedLanguages: async () => {
        set({ isLoading: true })
        try {
          const languages = await translationService.getSupportedLanguages()
          set({ supportedLanguages: languages, isLoading: false })
        } catch (error) {
          console.error('Error fetching languages:', error)
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'nusākāla-translation',
    }
  )
)

// Hook for dynamic translation
export function useTranslation() {
  const { language, supportedLanguages, isLoading, setLanguage, fetchSupportedLanguages } = useTranslationStore()
  const [translationCache, setTranslationCache] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (supportedLanguages.length === 0) {
      fetchSupportedLanguages()
    }
  }, [supportedLanguages.length, fetchSupportedLanguages])

  const t = async (key: string, defaultText?: string): Promise<string> => {
    const text = defaultText || key
    const cacheKey = `${text}-${language}`

    // Check cache first
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey]
    }

    // If Indonesian, return as is
    if (language === 'id') {
      return text
    }

    try {
      const translated = await translationService.translateText(text, language, 'id')
      
      // Update cache
      setTranslationCache(prev => ({
        ...prev,
        [cacheKey]: translated
      }))
      
      return translated
    } catch (error) {
      console.error('Translation error:', error)
      return text
    }
  }

  // Synchronous translation for immediate use (uses cache)
  const tSync = (key: string, defaultText?: string): string => {
    const text = defaultText || key
    const cacheKey = `${text}-${language}`
    
    return translationCache[cacheKey] || text
  }

  return {
    language,
    supportedLanguages,
    isLoading,
    setLanguage,
    t,
    tSync,
    fetchSupportedLanguages
  }
}
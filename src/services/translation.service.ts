/* eslint-disable @typescript-eslint/no-explicit-any */
interface TranslationCache {
  [key: string]: {
    [lang: string]: string
  }
}

interface GoogleTranslateResponse {
  data: {
    translations: Array<{
      translatedText: string
      detectedSourceLanguage?: string
    }>
  }
}

class TranslationService {
  private cache: TranslationCache = {}
  private apiKey: string
  private baseUrl = 'https://translation.googleapis.com/language/translate/v2'

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ''
  }

  // Translate text using Google Translate API
  async translateText(text: string, targetLang: string, sourceLang: string = 'id'): Promise<string> {
    // Check cache first
    const cacheKey = `${text}-${sourceLang}-${targetLang}`
    if (this.cache[cacheKey]?.[targetLang]) {
      return this.cache[cacheKey][targetLang]
    }

    // If same language, return original
    if (sourceLang === targetLang) {
      return text
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        })
      })

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`)
      }

      const data: GoogleTranslateResponse = await response.json()
      const translatedText = data.data.translations[0].translatedText

      // Cache the result
      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = {}
      }
      this.cache[cacheKey][targetLang] = translatedText

      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      // Fallback to original text
      return text
    }
  }

  // Batch translate multiple texts
  async translateBatch(texts: string[], targetLang: string, sourceLang: string = 'id'): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: texts,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        })
      })

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`)
      }

      const data: GoogleTranslateResponse = await response.json()
      return data.data.translations.map(t => t.translatedText)
    } catch (error) {
      console.error('Batch translation error:', error)
      return texts // Fallback to original texts
    }
  }

  // Get supported languages
  async getSupportedLanguages(): Promise<Array<{code: string, name: string}>> {
    try {
      const response = await fetch(`${this.baseUrl}/languages?key=${this.apiKey}&target=en`)
      const data = await response.json()
      
      return data.data.languages.map((lang: any) => ({
        code: lang.language,
        name: lang.name
      }))
    } catch (error) {
      console.error('Error fetching supported languages:', error)
      // Return default languages as fallback
      return [
        { code: 'id', name: 'Indonesian' },
        { code: 'en', name: 'English' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'ar', name: 'Arabic' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'es', name: 'Spanish' },
        { code: 'pt', name: 'Portuguese' },
      ]
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache = {}
  }
}

export const translationService = new TranslationService()
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { Mic, Volume2 } from 'lucide-react'

export default function NusaNativePage() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('javanese')

  const handleTranslate = async () => {
    // Simulasi translate
    setTranslatedText(`[${language}] ${inputText}`)
  }

  const handleVoiceInput = () => {
    // Simulasi AI voice input (native)
    setIsListening(true)
    setTimeout(() => {
      setInputText('Simulasi suara pengguna')
      setIsListening(false)
    }, 2000)
  }

  const handleSpeakOutput = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText)
    utterance.lang = 'id-ID'
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-nusa-darkBrown mb-6">Nusa Native Translator 🗣️</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <label className="block text-nusa-brown font-semibold">Input Text</label>
          <Textarea
            rows={5}
            placeholder="Type your sentence here or use voice..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <Button onClick={handleVoiceInput} variant="secondary" className="flex items-center gap-2">
              <Mic className="w-4 h-4" /> {isListening ? 'Listening...' : 'Speak'}
            </Button>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                Translate to: {language}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javanese">Javanese (Jawa)</SelectItem>
                <SelectItem value="sundanese">Sundanese (Sunda)</SelectItem>
                <SelectItem value="minang">Minangkabau</SelectItem>
                <SelectItem value="buginese">Buginese (Bugis)</SelectItem>
                <SelectItem value="balinese">Balinese (Bali)</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleTranslate}>Translate</Button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <label className="block text-nusa-brown font-semibold">Translated Text</label>
          <Textarea rows={5} value={translatedText} readOnly />
          <Button onClick={handleSpeakOutput} variant="outline" className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" /> Play Voice
          </Button>
        </div>
      </div>
    </div>
  )
}
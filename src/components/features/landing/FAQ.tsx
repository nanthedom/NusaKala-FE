'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FAQ() {
  const { tSync } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqItems = [
    {
      question: tSync('faq.q1.question', 'What is NusaKala?'),
      answer: tSync('faq.q1.answer', 'NusaKala is a digital platform that connects travelers with Indonesia\'s cultural richness through modern technology and AI, offering authentic cultural experiences and educational content.')
    },
    {
      question: tSync('faq.q2.question', 'Is NusaKala free to use?'),
      answer: tSync('faq.q2.answer', 'Yes, NusaKala\'s core features are free to use. Some premium features are available with a subscription for a more comprehensive experience and advanced tools.')
    },
    {
      question: tSync('faq.q3.question', 'How do I join the community?'),
      answer: tSync('faq.q3.answer', 'Simply create a free account, complete your profile, and start interacting with fellow Indonesian culture enthusiasts. Share your experiences, join discussions, and connect with local artists.')
    },
    {
      question: tSync('faq.q4.question', 'Is it available in other languages?'),
      answer: tSync('faq.q4.answer', 'Yes, NusaKala supports 10+ languages to help international travelers explore Indonesian culture more easily, including English, Mandarin, Japanese, and major European languages.')
    },
    {
      question: tSync('faq.q5.question', 'How does the AI translator work?'),
      answer: tSync('faq.q5.answer', 'Our Nusa Native AI translator uses advanced language models to provide accurate translations for regional Indonesian languages, helping you communicate with locals and understand cultural contexts.')
    },
    {
      question: tSync('faq.q6.question', 'Can I contribute cultural content?'),
      answer: tSync('faq.q6.answer', 'Absolutely! We encourage users to share their cultural knowledge, upload photos, write reviews, and contribute to our growing database of Indonesian cultural heritage.')
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-nusa-cream-dark to-nusa-beige relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(212,175,55,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(205,127,50,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(139,69,19,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-nusa-gold/30 shadow-nusa-gold">
              <HelpCircle className="w-4 h-4 text-nusa-gold" />
              <span className="text-sm font-medium text-nusa-dark-brown">
                {tSync('faq.badge', 'FAQ')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-nusa-dark-brown mb-6 tracking-tight">
              <span className="text-gradient-primary">
                {tSync('faq.title', 'Frequently Asked Questions')}
              </span>
            </h2>
            <p className="text-lg text-nusa-brown max-w-2xl mx-auto leading-relaxed">
              {tSync('faq.subtitle', 'Find answers to common questions about the NusaKala platform and discover how to make the most of your cultural journey.')}
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {faqItems.map((item, index) => (
              <Card 
                key={index}
                className="border-nusa-gold/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm group"
              >
                <CardContent className="p-0">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 transition-all duration-300 group-hover:bg-nusa-gold/5"
                    style={{
                      outline: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-nusa-dark-brown pr-4 group-hover:text-nusa-gold transition-colors tracking-tight">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          openIndex === index 
                            ? 'bg-nusa-gold text-white shadow-nusa-gold' 
                            : 'bg-nusa-gold/10 text-nusa-gold group-hover:bg-nusa-gold/20'
                        }`}>
                          {openIndex === index ? (
                            <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                          ) : (
                            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-6 animate-fade-in-up">
                      <div className="border-t border-nusa-gold/20 pt-4">
                        <p className="text-nusa-brown leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support Section */}
          <div className="text-center bg-gradient-accent rounded-3xl p-8 border border-nusa-gold/20 shadow-lg animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-nusa-gold">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-nusa-dark-brown mb-3 tracking-tight">
              {tSync('faq.support.title', 'Still Have Questions?')}
            </h3>
            
            <p className="text-nusa-brown mb-6 max-w-md mx-auto leading-relaxed">
              {tSync('faq.support.description', 'Our support team is here to help you with any questions or issues you might have.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-primary hover:bg-gradient-secondary text-white shadow-nusa-gold hover:shadow-nusa-bronze transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/contact">
                  {tSync('faq.support.contact', 'Contact Support')}
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-nusa-gold text-nusa-dark-brown hover:bg-nusa-gold/10 transition-all duration-300"
                asChild
              >
                <Link href="/help">
                  {tSync('faq.support.help', 'Help Center')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
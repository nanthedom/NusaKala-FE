'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function TriviaPopup({ question, onAnswer }: { question: string, onAnswer: (correct: boolean) => void }) {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <h3 className="text-lg font-bold mb-4">✨ Daily Trivia</h3>
        <p className="mb-4 text-nusa-dark-brown">{question}</p>
        <div className="flex gap-2">
          <Button onClick={() => { onAnswer(true); setOpen(false); }}>Correct Answer</Button>
          <Button variant="outline" onClick={() => { onAnswer(false); setOpen(false); }}>Wrong Answer</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>Skip</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

export function UpcomingEventCard({ event }: { event: { id: string, title: string, date: string, description: string } }) {
  return (
    <Card className="border-nusa-gold/20 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-nusa-gold" />
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-nusa-brown mb-2">{event.date}</p>
        <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
      </CardContent>
    </Card>
  )
}
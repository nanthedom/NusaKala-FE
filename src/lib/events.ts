export interface EventItem {
  id: string
  title: string
  date: string
  location: string
  description: string
}

export async function fetchUpcomingEvents(): Promise<EventItem[]> {
  return [
    {
      id: '1',
      title: 'Festival Batik Nusantara',
      date: '2025-08-12',
      location: 'Yogyakarta',
      description: 'A celebration of traditional batik from across the archipelago.'
    },
    {
      id: '2',
      title: 'Bali Kite Festival',
      date: '2025-08-20',
      location: 'Bali',
      description: 'Annual festival showcasing giant traditional kites.'
    },
    {
      id: '3',
      title: 'Toraja Culture Week',
      date: '2025-09-05',
      location: 'Sulawesi Selatan',
      description: 'Explore the rituals and arts of the Toraja people.'
    },
    {
      id: '4',
      title: 'Festival Danau Toba',
      date: '2025-09-15',
      location: 'Sumatera Utara',
      description: 'A multi-day event with music, food, and culture around Lake Toba.'
    },
    {
      id: '5',
      title: 'Karapan Sapi Race',
      date: '2025-10-01',
      location: 'Madura',
      description: 'Exciting bull races held annually in Madura.'
    }
  ]
}
import axios from 'axios'

export interface Province {
  id: string
  name: string
  nameEn: string
  capital: string
  coordinates: [number, number] // [lat, lng]
  bounds: [[number, number], [number, number]] // [[sw_lat, sw_lng], [ne_lat, ne_lng]]
  culturalHighlights: string[]
  eventsCount: number
  sitesCount: number
  population: number
  area: number
  description: string
  image: string
  geoJsonUrl?: string
}

export interface CulturalSite {
  id: string
  name: string
  type: 'temple' | 'museum' | 'heritage' | 'monument' | 'traditional_house'
  coordinates: [number, number]
  province: string
  description: string
  images: string[]
  rating: number
  visitCount: number
}

class MapService {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

  // Fetch all provinces data
  async getProvinces(): Promise<Province[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/provinces`)
      return response.data
    } catch (error) {
      console.error('Error fetching provinces:', error)
      // Return fallback data
      return this.getFallbackProvinces()
    }
  }

  // Fetch province details
  async getProvinceById(id: string): Promise<Province | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/provinces/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching province:', error)
      return null
    }
  }

  // Fetch cultural sites by province
  async getCulturalSites(provinceId?: string): Promise<CulturalSite[]> {
    try {
      const url = provinceId 
        ? `${this.apiUrl}/cultural-sites?province=${provinceId}`
        : `${this.apiUrl}/cultural-sites`
      
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching cultural sites:', error)
      return []
    }
  }

  // Fetch GeoJSON data for province boundaries
  async getProvinceGeoJSON(provinceId: string): Promise<any> {
    try {
      // You can use public GeoJSON data or your own
      const response = await axios.get(`/data/geojson/provinces/${provinceId}.json`)
      return response.data
    } catch (error) {
      console.error('Error fetching GeoJSON:', error)
      return null
    }
  }

  // Search provinces and sites
  async searchPlaces(query: string): Promise<{provinces: Province[], sites: CulturalSite[]}> {
    try {
      const response = await axios.get(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      console.error('Error searching places:', error)
      return { provinces: [], sites: [] }
    }
  }

  // Fallback data when API is not available
  private getFallbackProvinces(): Province[] {
    return [
      {
        id: 'jakarta',
        name: 'DKI Jakarta',
        nameEn: 'Jakarta',
        capital: 'Jakarta',
        coordinates: [-6.2088, 106.8456],
        bounds: [[-6.3676, 106.6920], [-6.0900, 106.9920]],
        culturalHighlights: ['Betawi Culture', 'National Monument', 'Old Town'],
        eventsCount: 45,
        sitesCount: 65,
        population: 10374235,
        area: 664,
        description: 'Ibu kota Indonesia dengan kekayaan budaya Betawi dan arsitektur kolonial.',
        image: '/images/provinces/jakarta.jpg'
      },
      {
        id: 'jogja',
        name: 'DI Yogyakarta',
        nameEn: 'Yogyakarta',
        capital: 'Yogyakarta',
        coordinates: [-7.7956, 110.3695],
        bounds: [[-8.1430, 110.0265], [-7.4486, 110.7125]],
        culturalHighlights: ['Sultan Palace', 'Borobudur Temple', 'Batik Art'],
        eventsCount: 38,
        sitesCount: 45,
        population: 3762167,
        area: 3133,
        description: 'Kota budaya dengan warisan kerajaan dan seni tradisional Jawa.',
        image: '/images/provinces/yogyakarta.jpg'
      },
      {
        id: 'bali',
        name: 'Bali',
        nameEn: 'Bali',
        capital: 'Denpasar',
        coordinates: [-8.3405, 115.0920],
        bounds: [[-8.8443, 114.4221], [-7.9372, 115.7111]],
        culturalHighlights: ['Hindu Temples', 'Traditional Dance', 'Art Villages'],
        eventsCount: 56,
        sitesCount: 89,
        population: 4317404,
        area: 5780,
        description: 'Pulau dewata dengan budaya Hindu yang kaya dan seni tradisional.',
        image: '/images/provinces/bali.jpg'
      },
      // Add more provinces...
    ]
  }
}

export const mapService = new MapService()
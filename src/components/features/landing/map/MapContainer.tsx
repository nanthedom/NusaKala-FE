/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MapContainer as LeafletMapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Province } from '@/services/map.service'

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

interface MapContainerProps {
  provinces: Province[]
  center: [number, number]
  zoom: number
  selectedProvince: Province | null
  onProvinceClick: (province: Province) => void
}

// Component to handle map updates
function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  
  return null
}

// Custom marker icon
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}

export default function MapContainer({ 
  provinces, 
  center, 
  zoom, 
  selectedProvince, 
  onProvinceClick 
}: MapContainerProps) {
  const [geoJsonData] = useState<any>(null)

  // Style for GeoJSON layers
  const geoJsonStyle = (feature: any) => {
    const isSelected = selectedProvince?.id === feature.properties.id
    return {
      fillColor: isSelected ? '#D4AF37' : '#228B22',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: isSelected ? 0.9 : 0.7
    }
  }

  // Handle feature click
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        const province = provinces.find(p => p.id === feature.properties.id)
        if (province) {
          onProvinceClick(province)
        }
      },
      mouseover: (e: any) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#D4AF37',
          dashArray: '',
          fillOpacity: 0.9
        })
      },
      mouseout: (e: any) => {
        const layer = e.target
        layer.setStyle(geoJsonStyle(feature))
      }
    })
  }

  return (
    <LeafletMapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <MapUpdater center={center} zoom={zoom} />
      
      {/* Base tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Province markers */}
      {provinces.map((province) => (
        <Marker
          key={province.id}
          position={province.coordinates}
          icon={createCustomIcon(
            selectedProvince?.id === province.id ? '#D4AF37' : '#C41E3A'
          )}
          eventHandlers={{
            click: () => onProvinceClick(province)
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-nusa-darkBrown">{province.name}</h3>
              <p className="text-sm text-nusa-brown">{province.capital}</p>
              <div className="mt-2 text-xs">
                <p>{province.eventsCount} Events • {province.sitesCount} Sites</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* GeoJSON layer for province boundaries */}
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </LeafletMapContainer>
  )
}
import React, { createContext, useContext, useState, useEffect } from 'react'

interface LocationContextType {
  coordinates: { lat: number; lon: number } | null
  location: string
  setCoordinates: (coords: { lat: number; lon: number }) => void
  setLocation: (location: string) => void
  requestLocation: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({ lat: 17.385, lon: 78.486 })
  const [location, setLocation] = useState('Hyderabad, India (Default)')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestLocation = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser')
      }
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        })
      })
      
      const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      
      setCoordinates(coords)
      
      // In a real app, use a reverse geocoding service here.
      // For now, we'll just display "Your Current Location".
      setLocation('Your Current Location')

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location'
      setError(errorMessage)
      // We keep the default location on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LocationContext.Provider value={{
      coordinates,
      location,
      setCoordinates,
      setLocation,
      requestLocation,
      isLoading,
      error
    }}>
      {children}
    </LocationContext.Provider>
  )
}

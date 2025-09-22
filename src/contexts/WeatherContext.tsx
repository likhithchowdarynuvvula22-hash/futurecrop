import React, { createContext, useContext, useState, useEffect } from 'react'
import { WeatherData } from '../types'
import { fetchWeather } from '../lib/api'
import { useLocation } from './LocationContext'

interface WeatherContextType {
  weather: WeatherData | null
  isLoading: boolean
  error: string | null
  refreshWeather: () => Promise<void>
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function useWeather() {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { coordinates } = useLocation()

  const refreshWeather = async () => {
    if (!coordinates) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await fetchWeather(coordinates.lat, coordinates.lon)
      setWeather(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (coordinates) {
      refreshWeather()
    }
  }, [coordinates])

  return (
    <WeatherContext.Provider value={{
      weather,
      isLoading,
      error,
      refreshWeather
    }}>
      {children}
    </WeatherContext.Provider>
  )
}

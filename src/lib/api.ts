import { WeatherData, CropRecommendation, FarmInput } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

// Weather API calls
export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_BASE}/api/weather?lat=${lat}&lon=${lon}`)
    if (!response.ok) throw new Error('Weather fetch failed')
    return await response.json()
  } catch (error) {
    console.error('Weather API error:', error)
    // Return mock data for development
    return mockWeatherData()
  }
}

// Crop recommendation API calls
export async function getCropRecommendations(farmInput: FarmInput): Promise<CropRecommendation[]> {
  try {
    const response = await fetch(`${API_BASE}/api/crop/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(farmInput)
    })
    if (!response.ok) throw new Error('Crop recommendation failed')
    return await response.json()
  } catch (error) {
    console.error('Crop API error:', error)
    // Return mock data for development
    return mockCropRecommendations(farmInput)
  }
}

// Store user interaction
export async function storeUserResponse(data: any): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/store-response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: Date.now(),
        ...data
      })
    })
    return response.ok
  } catch (error) {
    console.error('Store response error:', error)
    return false
  }
}

// Mock data for development
function mockWeatherData(): WeatherData {
  const now = new Date()
  const hours = Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000)
    return time.toISOString()
  })
  
  return {
    current: {
      temperature_2m: 28.5,
      wind_speed_10m: 12.3,
      relative_humidity_2m: 65,
      weather_code: 0
    },
    hourly: {
      time: hours,
      temperature_2m: Array.from({ length: 24 }, (_, i) => 25 + Math.sin(i / 4) * 8),
      relative_humidity_2m: Array.from({ length: 24 }, (_, i) => 60 + Math.sin(i / 3) * 15),
      wind_speed_10m: Array.from({ length: 24 }, (_, i) => 10 + Math.sin(i / 5) * 5)
    }
  }
}

function mockCropRecommendations(input: FarmInput): CropRecommendation[] {
  const recommendations = [
    {
      crop: 'Tomato',
      confidence: 85,
      rationale: 'High market demand, suitable soil type, adequate water availability',
      plantingWindow: 'October - November',
      waterRequirement: 'Medium' as const,
      expectedYield: '25-30 tons/hectare',
      marketPrice: 45
    },
    {
      crop: 'Cotton',
      confidence: 72,
      rationale: 'Traditional crop for region, good soil match, irrigation support needed',
      plantingWindow: 'May - June',
      waterRequirement: 'High' as const,
      expectedYield: '15-18 quintals/hectare',
      marketPrice: 6200
    },
    {
      crop: 'Groundnut',
      confidence: 78,
      rationale: 'Drought resistant, improves soil nitrogen, stable market price',
      plantingWindow: 'June - July',
      waterRequirement: 'Low' as const,
      expectedYield: '12-15 quintals/hectare',
      marketPrice: 5800
    }
  ]
  
  return recommendations.filter(r => r.crop !== input.lastCrop).slice(0, 2)
}

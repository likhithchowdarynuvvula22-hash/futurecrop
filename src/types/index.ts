export interface WeatherData {
  current: {
    temperature_2m: number
    wind_speed_10m: number
    relative_humidity_2m: number
    weather_code: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
  }
}

export interface CropRecommendation {
  crop: string
  confidence: number
  rationale: string
  plantingWindow: string
  waterRequirement: 'Low' | 'Medium' | 'High'
  expectedYield: string
  marketPrice: number
}

export interface FarmInput {
  lastCrop: string
  soilType: 'Clay' | 'Sandy' | 'Loamy' | 'Mixed'
  irrigationAvailable: boolean
  fieldSize: number
  region: string
  coordinates: {
    lat: number
    lon: number
  }
}

export interface Alert {
  id: string
  type: 'pest' | 'drought' | 'weather' | 'market'
  severity: 'low' | 'medium' | 'high'
  title: string
  message: string
  actionRequired: boolean
  timestamp: Date
}

import React from 'react'
import { Cloud, Thermometer, Wind, Droplets, RefreshCw } from 'lucide-react'
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { useWeather } from '../contexts/WeatherContext'
import { useLocation } from '../contexts/LocationContext'

const WeatherCard: React.FC = () => {
  const { weather, isLoading, refreshWeather } = useWeather()
  const { location } = useLocation()

  if (!weather) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-6 weather-gradient text-white h-[380px]"
      >
        <div className="animate-pulse h-full flex flex-col justify-between">
          <div>
            <div className="h-4 bg-white/20 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-1/3"></div>
          </div>
          <div className="h-12 bg-white/20 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 bg-white/20 rounded"></div>
            <div className="h-8 bg-white/20 rounded"></div>
            <div className="h-8 bg-white/20 rounded"></div>
          </div>
          <div className="h-24 bg-white/20 rounded"></div>
        </div>
      </motion.div>
    )
  }

  const hourlyData = weather.hourly.time.slice(0, 12).map((time, index) => ({
    time: new Date(time).getHours() + ':00',
    temp: Math.round(weather.hourly.temperature_2m[index]),
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 weather-gradient text-white relative overflow-hidden h-[380px] flex flex-col"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/5"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-1">Current Weather</h3>
            <p className="text-white/90 text-sm">{location}</p>
          </div>
          <button
            onClick={refreshWeather}
            disabled={isLoading}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold">
              {Math.round(weather.current.temperature_2m)}°C
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Cloud className="w-5 h-5" />
              <span className="text-sm">Clear Sky</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Wind className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-semibold">{weather.current.wind_speed_10m}</div>
            <div className="text-xs text-white/70">km/h</div>
          </div>
          <div className="text-center">
            <Droplets className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-semibold">{weather.current.relative_humidity_2m}</div>
            <div className="text-xs text-white/70">humidity</div>
          </div>
          <div className="text-center">
            <Thermometer className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-semibold">Good</div>
            <div className="text-xs text-white/70">conditions</div>
          </div>
        </div>

        <div className="flex-grow flex flex-col h-24">
          <h4 className="text-sm font-medium text-white/80 mb-2">Next 12 Hours</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.7)' }}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="rgba(255,255,255,0.8)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-white/90">
            ✅ <strong>Good day for farming:</strong> Optimal temperature and low wind conditions.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard

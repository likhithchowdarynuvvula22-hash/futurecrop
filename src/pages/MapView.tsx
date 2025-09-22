import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Satellite, Layers, Zap, Droplets, RefreshCw } from 'lucide-react'
import { useLocation } from '../contexts/LocationContext'

const MapView: React.FC = () => {
  const { coordinates, location } = useLocation()
  const [selectedLayer, setSelectedLayer] = useState('satellite')
  const [isLoading, setIsLoading] = useState(true)

  const layers = [
    { id: 'satellite', name: 'Satellite View', icon: Satellite },
    { id: 'moisture', name: 'Soil Moisture', icon: Droplets },
    { id: 'ndvi', name: 'Crop Health', icon: Zap },
    { id: 'weather', name: 'Weather', icon: Layers }
  ]

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [selectedLayer])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900">Satellite Map View</h1>
        <p className="text-gray-600">Monitor your fields with real-time satellite data for {location}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Map Layers</h3>
          <button className="p-2 rounded-lg bg-forest-100 hover:bg-forest-200 transition-colors">
            <RefreshCw className="w-4 h-4 text-forest-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {layers.map((layer) => {
            const Icon = layer.icon
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                  selectedLayer === layer.id
                    ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{layer.name}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-xl overflow-hidden"
        >
          <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-forest-300 border-t-forest-600 rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-600">Loading {selectedLayer} layer...</p>
                </div>
              </div>
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Satellite className="w-20 h-20 text-forest-600/50 mx-auto" />
                <div className="text-gray-700">
                  <p className="font-semibold">Interactive Map View</p>
                  <p className="text-sm">Showing {selectedLayer} layer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Area</span>
                <span className="font-semibold text-gray-900">2.5 hectares</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Soil Moisture</span>
                <span className="font-semibold text-blue-600">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Crop Health</span>
                <span className="font-semibold text-green-600">Good</span>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full farmer-button text-sm">Download Report</button>
              <button className="w-full bg-white border-2 border-forest-300 text-forest-700 hover:bg-forest-50 font-medium px-4 py-2 rounded-lg transition-colors">Share with Advisor</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MapView

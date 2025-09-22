import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin, Droplets, Mountain } from 'lucide-react'
import { useLocation as useRouterLocation } from 'react-router-dom'
import { FarmInput, CropRecommendation } from '../types'
import { getCropRecommendations } from '../lib/api'
import { useLocation } from '../contexts/LocationContext'
import CropCard from '../components/CropCard'

const CropAdvisor: React.FC = () => {
  const routerLocation = useRouterLocation()
  const { coordinates } = useLocation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FarmInput>({
    lastCrop: routerLocation.state?.lastCrop || '',
    soilType: 'Loamy',
    irrigationAvailable: true,
    fieldSize: 1,
    region: '',
    coordinates: coordinates || { lat: 17.385, lon: 78.486 }
  })
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const crops = ['Rice', 'Maize', 'Cotton', 'Groundnut', 'Tomato', 'Chili', 'Onion', 'Potato', 'Sugarcane', 'Soybean']
  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Mixed']
  const regions = ['North India', 'South India', 'Central India', 'East India', 'West India']

  useEffect(() => {
    if (coordinates) {
      setFormData(prev => ({ ...prev, coordinates }))
    }
  }, [coordinates])

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const results = await getCropRecommendations(formData)
      setRecommendations(results)
      setStep(4)
    } catch (error) {
      console.error('Failed to get recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">What did you grow last season?</h2>
              <p className="text-gray-600">This helps us recommend complementary crops</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setFormData(prev => ({ ...prev, lastCrop: crop }))}
                  className={`p-4 rounded-xl text-left transition-all duration-200 ${
                    formData.lastCrop === crop
                      ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{crop}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Tell us about your land</h2>
              <p className="text-gray-600">Soil type and field size matter for recommendations</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Mountain className="w-4 h-4 inline mr-2" />
                  Soil Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {soilTypes.map((soil) => (
                    <button
                      key={soil}
                      onClick={() => setFormData(prev => ({ ...prev, soilType: soil as any }))}
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        formData.soilType === soil
                          ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {soil}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Field Size (hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.fieldSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, fieldSize: parseFloat(e.target.value) || 1 }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-forest-300 focus:outline-none"
                  placeholder="Enter field size"
                />
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Water & Location</h2>
              <p className="text-gray-600">Final details for accurate recommendations</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Droplets className="w-4 h-4 inline mr-2" />
                  Irrigation Available?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, irrigationAvailable: true }))}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      formData.irrigationAvailable
                        ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Yes, I have irrigation
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, irrigationAvailable: false }))}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      !formData.irrigationAvailable
                        ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    No, rainfed only
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Region
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setFormData(prev => ({ ...prev, region }))}
                      className={`p-3 rounded-lg text-left transition-all duration-200 ${
                        formData.region === region
                          ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Your Crop Recommendations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Based on your {formData.fieldSize} hectare {formData.soilType.toLowerCase()} field in {formData.region}, 
                here are our AI-powered recommendations:
              </p>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((rec, index) => (
                  <CropCard key={index} recommendation={rec} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Generating recommendations...
                </h3>
                <div className="animate-pulse text-gray-600">
                  Analyzing your farm data and market conditions
                </div>
              </div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-forest-500 to-forest-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl p-8">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {step < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={() => {
                if (step === 3) {
                  handleSubmit()
                } else {
                  setStep(step + 1)
                }
              }}
              disabled={
                (step === 1 && !formData.lastCrop) ||
                (step === 2 && (!formData.soilType || !formData.fieldSize)) ||
                (step === 3 && !formData.region) ||
                isLoading
              }
              className="farmer-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{step === 3 ? (isLoading ? 'Analyzing...' : 'Get Recommendations') : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CropAdvisor

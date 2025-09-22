import React from 'react'
import { TrendingUp, Droplets, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { CropRecommendation } from '../types'

interface CropCardProps {
  recommendation: CropRecommendation
  onSelect?: () => void
  isSelected?: boolean
}

const CropCard: React.FC<CropCardProps> = ({ 
  recommendation, 
  onSelect, 
  isSelected = false 
}) => {
  const confidenceColor = recommendation.confidence >= 80 
    ? 'text-green-600 bg-green-50'
    : recommendation.confidence >= 60
    ? 'text-yellow-600 bg-yellow-50'
    : 'text-red-600 bg-red-50'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-forest-500 bg-forest-50/50' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {recommendation.crop}
          </h3>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${confidenceColor}`}>
            {recommendation.confidence}% confidence
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-forest-600">
            ₹{recommendation.marketPrice}
          </div>
          <div className="text-xs text-gray-500">per quintal</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-sm font-medium text-gray-700">Water Need</div>
            <div className="text-sm text-gray-600">{recommendation.waterRequirement}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-sm font-medium text-gray-700">Expected Yield</div>
            <div className="text-sm text-gray-600">{recommendation.expectedYield}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-4 h-4 text-purple-500" />
        <div>
          <div className="text-sm font-medium text-gray-700">Planting Time</div>
          <div className="text-sm text-gray-600">{recommendation.plantingWindow}</div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Why this crop?</div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {recommendation.rationale}
        </p>
      </div>

      {onSelect && (
        <div className="mt-4">
          <button className="w-full farmer-button text-sm">
            {isSelected ? 'Selected ✓' : 'Select This Crop'}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default CropCard

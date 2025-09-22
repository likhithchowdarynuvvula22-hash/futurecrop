import React, { useState } from 'react'
import { ChevronRight, Sprout } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const QuickCropSelector: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('')
  const navigate = useNavigate()

  const commonCrops = [
    '🌾 Rice', '🌽 Maize', '🥜 Groundnut', '☁️ Cotton', 
    '🍅 Tomato', '🌶️ Chili', '🧄 Onion', '🥔 Potato'
  ]

  const handleProceed = () => {
    if (selectedCrop) {
      navigate('/crop-advisor', { state: { lastCrop: selectedCrop.split(' ')[1] } })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-2xl p-6 h-[380px] flex flex-col"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Quick Start</h3>
          <p className="text-sm text-gray-600">What did you plant last season?</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
        {commonCrops.map((crop) => (
          <motion.button
            key={crop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCrop(crop)}
            className={`p-3 rounded-lg text-left transition-all duration-200 text-sm font-medium ${
              selectedCrop === crop
                ? 'bg-forest-100 border-2 border-forest-300 text-forest-700'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            {crop}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedCrop && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <button
              onClick={handleProceed}
              className="w-full farmer-button flex items-center justify-center space-x-2"
            >
              <span>Get Recommendations</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default QuickCropSelector

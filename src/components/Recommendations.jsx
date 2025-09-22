import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Droplets, Leaf, Shield, MapPin, AlertTriangle, ArrowLeft, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Recommendations = ({ data, farmerData, onViewMap, onViewEmergency, onBack }) => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState(null);

  const CropCard = ({ crop, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{crop.crop_name}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{crop.area_pct}%</div>
          <div className="text-sm text-gray-500">{t('areaAllocation')}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <div className="text-lg font-semibold text-gray-900">{crop.expected_yield_t_per_ha}t</div>
          <div className="text-sm text-gray-600">{t('expectedYield')}</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <span className="text-2xl">₹</span>
          <div className="text-lg font-semibold text-gray-900">{crop.expected_profit_per_ha.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Profit/ha</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          <span className="text-sm text-gray-600">{t('confidence')}: {crop.confidence_pct}%</span>
        </div>
        <button
          onClick={() => setSelectedCrop(selectedCrop === crop ? null : crop)}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          {selectedCrop === crop ? 'Hide' : t('viewDetails')}
        </button>
      </div>

      {selectedCrop === crop && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t pt-4 space-y-3"
        >
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-700">{t('waterRequirement')}</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">{crop.water_requirement_mm_per_week_or_note}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-700">{t('fertilizer')}</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">{crop.fertilizer_recommendation}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-gray-700">{t('pestControl')}</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">{crop.pest_control_recommendation}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{data.display_text.title}</h2>
          <p className="text-gray-600 mt-2">{data.display_text.summary}</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={onViewMap}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <MapPin className="w-4 h-4" />
            <span>{t('viewSatellite')}</span>
          </button>
          <button
            onClick={onViewEmergency}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t('emergencyPlan')}</span>
          </button>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">₹{data.overall_expected_profit.toLocaleString()}</div>
            <div className="text-green-100">{t('overallProfit')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{data.overall_confidence_pct}%</div>
            <div className="text-green-100">{t('confidence')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{farmerData.area_hectares}</div>
            <div className="text-green-100">{t('area')}</div>
          </div>
        </div>
      </div>

      {/* Recommended Crops */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('recommendedCrop')}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.recommended_crops.map((crop, index) => (
            <CropCard key={crop.crop_name} crop={crop} index={index} />
          ))}
        </div>
      </div>

      {/* Water Summary */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <Droplets className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Water Availability</h3>
        </div>
        <p className="text-gray-700">{data.satellite_water_summary}</p>
      </div>

      {/* Explanation */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{t('explanation')}</h3>
        <p className="text-gray-700">{data.explainability}</p>
      </div>
    </div>
  );
};

export default Recommendations;

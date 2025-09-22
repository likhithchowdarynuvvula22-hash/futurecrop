import React, { useState } from 'react';
import { MapPin, User, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const FarmerForm = ({ onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    farmer_id: '',
    location: { lat: 17.385, lng: 78.486 }, // Default to Hyderabad
    last_crops: [],
    soil_type: '',
    area_hectares: '',
    irrigation_type: '',
    risk_profile: 'medium',
    language: 'EN'
  });

  const cropOptions = [
    'Rice', 'Maize', 'Wheat', 'Cotton', 'Groundnut', 'Sugarcane', 
    'Soybean', 'Jowar', 'Bajra', 'Turmeric', 'Chili', 'Tomato'
  ];

  const soilTypes = [
    { value: 'sandy', label: 'Sandy' },
    { value: 'loamy', label: 'Loamy' },
    { value: 'clay', label: 'Clay' },
    { value: 'mixed', label: 'Mixed' },
    { value: 'other', label: 'Other' }
  ];

  const irrigationTypes = [
    { value: 'none', label: 'None' },
    { value: 'rainfed', label: 'Rainfed' },
    { value: 'canal', label: 'Canal' },
    { value: 'tube_well', label: 'Tube Well' },
    { value: 'drip', label: 'Drip Irrigation' }
  ];

  const riskProfiles = [
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock satellite and weather data
    const submissionData = {
      ...formData,
      satellite_water_index: 0.6,
      weather_forecast: {
        rain_next_30d_mm: 45,
        temp_avg_c: 28
      },
      market_prices: {
        'Maize': 1800,
        'Groundnut': 5200,
        'Rice': 2100
      }
    };
    
    onSubmit(submissionData);
  };

  const handleCropChange = (crop, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        last_crops: [...prev.last_crops, crop]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        last_crops: prev.last_crops.filter(c => c !== crop)
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('welcome')}
          </h2>
          <p className="text-gray-600">
            Please provide your farming details to get personalized crop recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farmer ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Farmer ID
            </label>
            <input
              type="text"
              value={formData.farmer_id}
              onChange={(e) => setFormData(prev => ({ ...prev, farmer_id: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your farmer ID"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              {t('location')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                step="any"
                value={formData.location.lat}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, lat: parseFloat(e.target.value) }
                }))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Latitude"
                required
              />
              <input
                type="number"
                step="any"
                value={formData.location.lng}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, lng: parseFloat(e.target.value) }
                }))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Longitude"
                required
              />
            </div>
          </div>

          {/* Last Crops */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('askLastCrop')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cropOptions.map(crop => (
                <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.last_crops.includes(crop)}
                    onChange={(e) => handleCropChange(crop, e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{crop}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('soilType')}
            </label>
            <select
              value={formData.soil_type}
              onChange={(e) => setFormData(prev => ({ ...prev, soil_type: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select soil type</option>
              {soilTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('area')}
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.area_hectares}
              onChange={(e) => setFormData(prev => ({ ...prev, area_hectares: parseFloat(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter area in hectares"
              required
            />
          </div>

          {/* Irrigation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="w-4 h-4 inline mr-2" />
              {t('irrigationType')}
            </label>
            <select
              value={formData.irrigation_type}
              onChange={(e) => setFormData(prev => ({ ...prev, irrigation_type: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select irrigation type</option>
              {irrigationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Risk Profile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('riskProfile')}
            </label>
            <select
              value={formData.risk_profile}
              onChange={(e) => setFormData(prev => ({ ...prev, risk_profile: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {riskProfiles.map(profile => (
                <option key={profile.value} value={profile.value}>{profile.label}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            {t('getRecommendation')}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default FarmerForm;

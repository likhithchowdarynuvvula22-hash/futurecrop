import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Satellite, Droplets, Map } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SatelliteMap = ({ farmerData, onBack }) => {
  const { t } = useLanguage();
  const mapRef = useRef(null);
  const [waterIndex, setWaterIndex] = useState(0.6);

  useEffect(() => {
    // Simulate loading Google Maps
    // In a real implementation, you would load the Google Maps API here
    const timer = setTimeout(() => {
      // Mock satellite data
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const waterIndexColor = (index) => {
    if (index >= 0.7) return 'text-blue-600';
    if (index >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const waterIndexText = (index) => {
    if (index >= 0.7) return 'High Water Availability';
    if (index >= 0.4) return 'Moderate Water Availability';
    return 'Low Water Availability';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>
        
        <h2 className="text-3xl font-bold text-gray-900">Satellite Water Map</h2>
        
        <div className="flex items-center space-x-2 text-blue-600">
          <Satellite className="w-5 h-5" />
          <span className="font-medium">Live Data</span>
        </div>
      </div>

      {/* Water Index Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Droplets className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Water Availability Index</h3>
          </div>
          <div className={`text-2xl font-bold ${waterIndexColor(waterIndex)}`}>
            {(waterIndex * 100).toFixed(0)}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${waterIndex * 100}%` }}
          ></div>
        </div>
        
        <p className={`font-medium ${waterIndexColor(waterIndex)}`}>
          {waterIndexText(waterIndex)}
        </p>
        <p className="text-gray-600 mt-2">
          Based on satellite imagery and weather data for your location
        </p>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Map className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Field Location</h3>
          </div>
          <p className="text-gray-600 mt-1">
            Lat: {farmerData.location.lat}, Lng: {farmerData.location.lng}
          </p>
        </div>
        
        <div 
          ref={mapRef}
          className="h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative"
        >
          {/* Mock Map Display */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Map className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-600 mb-2">Interactive Satellite Map</p>
            <p className="text-sm text-gray-500">
              In production, this would show Google Maps with satellite overlay
            </p>
          </div>
          
          {/* Mock Field Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="text-xs bg-white px-2 py-1 rounded shadow-lg mt-1 whitespace-nowrap">
              Your Field ({farmerData.area_hectares} ha)
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Water Index Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <div>
              <div className="font-medium text-blue-600">High (70-100%)</div>
              <div className="text-sm text-gray-600">Optimal water availability</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-600 rounded"></div>
            <div>
              <div className="font-medium text-yellow-600">Medium (40-69%)</div>
              <div className="text-sm text-gray-600">Moderate water stress</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <div>
              <div className="font-medium text-red-600">Low (0-39%)</div>
              <div className="text-sm text-gray-600">High water stress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Irrigation Recommendations */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Irrigation Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-gray-700">
              Current water index suggests moderate irrigation requirements
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-gray-700">
              Recommended to increase irrigation frequency by 15% for optimal yield
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-gray-700">
              Monitor soil moisture levels weekly using available tools
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SatelliteMap;

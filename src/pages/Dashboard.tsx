import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Calendar, Target } from 'lucide-react'
import WeatherCard from '../components/WeatherCard'
import QuickCropSelector from '../components/QuickCropSelector'
import { useLocation } from '../contexts/LocationContext'

const Dashboard: React.FC = () => {
  const { location, error } = useLocation()

  const statsCards = [
    {
      icon: TrendingUp,
      title: 'Expected Yield',
      value: '+25%',
      subtitle: 'vs last season',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Target,
      title: 'Optimal Planting',
      value: '15 days',
      subtitle: 'until window',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Calendar,
      title: 'Market Price',
      value: '₹2,400',
      subtitle: 'per quintal',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: AlertTriangle,
      title: 'Active Alerts',
      value: '2',
      subtitle: 'require attention',
      color: 'text-orange-600 bg-orange-50'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-forest-600 to-forest-800 bg-clip-text text-transparent">
          Hello, Farmer! 🌱
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI-powered crop recommendations, real-time weather insights, and smart farming alerts for your land.
        </p>
        <p className="text-sm text-forest-600">
          Showing data for: <strong>{location}</strong>
        </p>
        {error && <p className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-md inline-block">Could not get your precise location: {error}</p>}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.title}</div>
                <div className="text-xs text-gray-500">{stat.subtitle}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WeatherCard />
        </div>
        <div className="lg:col-span-1">
          <QuickCropSelector />
        </div>
      </div>

      {/* Recent Activity & Tips */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Weather Alert', detail: 'Heavy rain expected in 2 days', time: '2 hours ago', type: 'warning' },
              { action: 'Crop Recommendation', detail: 'Tomato planting window opens', time: '1 day ago', type: 'success' },
              { action: 'Market Update', detail: 'Cotton prices increased by 8%', time: '2 days ago', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'warning' ? 'bg-orange-500' :
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.detail}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Farming Tips</h3>
          <div className="space-y-4">
            {[
              { tip: 'Check soil moisture levels before irrigation', icon: '💧' },
              { tip: 'Monitor for pest activity in early morning', icon: '🐛' },
              { tip: 'Prepare for seed sowing in 2 weeks', icon: '🌱' },
              { tip: 'Current weather ideal for fertilizer application', icon: '🌿' }
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-forest-50 to-earth-50 rounded-lg">
                <span className="text-lg">{tip.icon}</span>
                <div className="text-sm text-gray-700 leading-relaxed">{tip.tip}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

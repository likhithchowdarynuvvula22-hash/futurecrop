import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Bell, 
  Filter,
  Bug,
  CloudRain,
  TrendingDown
} from 'lucide-react'
import { Alert } from '../types'

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  useEffect(() => {
    const mockAlerts: Alert[] = [
      { id: '1', type: 'pest', severity: 'high', title: 'Pest Activity Detected', message: 'High aphid activity detected in tomato field. Immediate action recommended.', actionRequired: true, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { id: '2', type: 'weather', severity: 'medium', title: 'Heavy Rain Forecast', message: 'Heavy rainfall expected in 48 hours. Consider harvesting mature crops.', actionRequired: true, timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) },
      { id: '3', type: 'market', severity: 'low', title: 'Price Drop Alert', message: 'Cotton prices have dropped by 8% in the last week.', actionRequired: false, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      { id: '4', type: 'drought', severity: 'medium', title: 'Soil Moisture Low', message: 'Soil moisture levels below optimal range. Consider increasing irrigation.', actionRequired: true, timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) }
    ]
    setAlerts(mockAlerts)
  }, [])

  const filteredAlerts = alerts.filter(alert => filter === 'all' || alert.severity === filter)

  const getAlertIcon = (type: Alert['type']) => ({ pest: Bug, weather: CloudRain, drought: CloudRain, market: TrendingDown }[type] || AlertTriangle)
  const getSeverityColor = (severity: Alert['severity']) => ({ high: 'text-red-600 bg-red-50', medium: 'text-orange-600 bg-orange-50', low: 'text-yellow-600 bg-yellow-50' }[severity] || 'text-gray-600 bg-gray-50')

  const markAsResolved = (alertId: string) => setAlerts(prev => prev.filter(alert => alert.id !== alertId))

  const formatTimeAgo = (timestamp: Date) => {
    const diffInHours = Math.floor((Date.now() - timestamp.getTime()) / 3600000)
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Farm Alerts & Notifications</h1>
        <p className="text-gray-600">Stay informed about important events affecting your crops</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            {['all', 'high', 'medium', 'low'].map((level) => (
              <button key={level} onClick={() => setFilter(level as any)} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filter === level ? 'bg-forest-100 text-forest-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <button className="farmer-button text-sm"><Bell className="w-4 h-4 mr-2" />Settings</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
        <AnimatePresence>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0, padding: 0, margin: 0 }} transition={{ delay: index * 0.05 }} className={`glass-card rounded-xl p-6 border-l-4 ${alert.severity === 'high' ? 'border-l-red-500' : alert.severity === 'medium' ? 'border-l-orange-500' : 'border-l-yellow-500'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}><Icon className="w-5 h-5" /></div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3"><h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3><span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>{alert.severity}</span></div>
                        <p className="text-gray-700">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500"><div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{formatTimeAgo(alert.timestamp)}</span></div></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {alert.actionRequired && <button className="farmer-button text-sm">Take Action</button>}
                      <button onClick={() => markAsResolved(alert.id)} className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1 inline" />Resolved</button>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 glass-card rounded-xl">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
              <p className="text-gray-600">No active alerts matching your filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Alerts

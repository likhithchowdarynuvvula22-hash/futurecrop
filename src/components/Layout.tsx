import React from 'react'
import { Link, useLocation as useRouteLocation } from 'react-router-dom'
import { Sprout, Home, Map, AlertTriangle, MapPin, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocation } from '../contexts/LocationContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const routeLocation = useRouteLocation()
  const { location, requestLocation, isLoading } = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/crop-advisor', icon: Sprout, label: 'Crop Advisor' },
    { path: '/map', icon: Map, label: 'Map View' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-forest-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-forest-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center shadow-md">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-forest-900">Dualite</h1>
                <p className="text-xs text-forest-600">Smart Farming Assistant</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-forest-600" />
                <span className="font-medium">{location}</span>
                <button 
                  onClick={requestLocation} 
                  disabled={isLoading}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                  title="Update location"
                >
                  <RefreshCw className={`w-4 h-4 text-forest-700 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = routeLocation.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-forest-100 text-forest-700 font-medium' 
                          : 'text-gray-600 hover:bg-forest-50 hover:text-forest-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          key={routeLocation.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = routeLocation.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-colors w-16 ${
                  isActive ? 'text-forest-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Layout

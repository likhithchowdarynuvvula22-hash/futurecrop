import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CropAdvisor from './pages/CropAdvisor'
import MapView from './pages/MapView'
import Alerts from './pages/Alerts'
import { LocationProvider } from './contexts/LocationContext'
import { WeatherProvider } from './contexts/WeatherContext'

function App() {
  return (
    <LocationProvider>
      <WeatherProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crop-advisor" element={<CropAdvisor />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </Layout>
      </WeatherProvider>
    </LocationProvider>
  )
}

export default App

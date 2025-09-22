# 🌱 Dualite - Smart Farming Weather & Crop Advisor

A comprehensive React application that provides AI-powered crop recommendations, real-time weather data, and satellite monitoring for farmers.

## ✨ Features

### 🎯 **Core Functionality**
- **Real-time Weather Dashboard** - Current conditions, hourly forecasts, and farming-specific insights
- **AI Crop Recommendations** - Smart suggestions based on soil type, previous crops, and local conditions
- **Satellite Map Integration** - Monitor field conditions with multiple data layers (moisture, crop health, weather)
- **Smart Alerts System** - Proactive notifications for pest activity, weather events, and market changes

### 🎨 **User Experience**
- **Farmer-Friendly Design** - Large buttons, clear typography, and intuitive navigation
- **Multi-device Responsive** - Optimized for mobile, tablet, and desktop
- **Accessible Interface** - High contrast colors and screen reader friendly
- **Smooth Animations** - Delightful micro-interactions using Framer Motion

### 🔧 **Technical Stack**
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom farmer-friendly color palette
- **State Management**: React Context + Hooks
- **Charts**: Recharts for weather visualization
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone and install dependencies:**
```bash
# Install dependencies
npm install
# or
yarn install
```

2. **Set up environment variables:**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your API keys (see Environment Setup below)
```

3. **Start development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
Navigate to `http://localhost:5173` (or the port specified by Vite)

## 🔐 Environment Setup

### Frontend Environment Variables
Create a `.env` file in the root directory:

```bash
# Frontend API Base URL
VITE_API_BASE_URL=http://localhost:4000
```

### Backend API Keys (for your backend server)
Your backend server will need these environment variables:

```bash
# MapMyCrop API for satellite data
MAPMYCROP_API_KEY=your_actual_mapmycrop_key_here

# Database API key for storing user data
DB_API_KEY=your_actual_database_key_here
```

### 🔑 How to Safely Set API Keys

**Linux/macOS:**
```bash
export MAPMYCROP_API_KEY="your_actual_key_here"
export DB_API_KEY="your_actual_db_key_here"
```

**Windows (PowerShell):**
```powershell
setx MAPMYCROP_API_KEY "your_actual_key_here"
setx DB_API_KEY "your_actual_db_key_here"
```

## 📡 API Integration

### Weather API (Open-Meteo)
The app integrates with Open-Meteo API for weather data:
```javascript
// Example: Fetch current weather
const response = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
)
```

### MapMyCrop API Integration
For satellite and field monitoring (backend integration needed):
```javascript
// Example backend call to MapMyCrop
const response = await fetch('https://mapmycrop.com/api-crop-monitoring/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MAPMYCROP_API_KEY}`,
    'x-api-key': process.env.MAPMYCROP_API_KEY // fallback header
  },
  body: JSON.stringify(farmData)
})
```

## 🎨 Design System

### Color Palette
- **Forest Green**: Primary actions and nature elements
- **Earth Tones**: Warm, natural feel for backgrounds
- **Gold Accents**: Highlights and important information

### Typography
- **Display Font**: Poppins (headings and hero text)
- **Body Font**: Inter (readable text and UI elements)

## 🧪 Development

### Project Structure
```
src/
├── components/      # Reusable UI components
├── pages/          # Main application pages
├── contexts/       # React Context providers
├── lib/            # Utilities and API calls
└── types/          # TypeScript type definitions
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Mock Data
During development, the app uses realistic mock data when APIs are unavailable. This allows for full functionality testing without backend dependencies.

## 🚀 Production Deployment

### Security Checklist
- [ ] Move all API keys to environment variables
- [ ] Enable HTTPS for all API endpoints
- [ ] Implement CORS restrictions
- [ ] Add rate limiting to API proxy endpoints

### Build Steps
1. **Set production environment variables**
2. **Build the application:** `npm run build`
3. **Deploy static files to your hosting platform**

---

**Made with ❤️ for farmers and sustainable agriculture**

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FarmerForm from './components/FarmerForm';
import Recommendations from './components/Recommendations';
import SatelliteMap from './components/SatelliteMap';
import EmergencyPlan from './components/EmergencyPlan';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [farmerData, setFarmerData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [currentView, setCurrentView] = useState('form');

  const handleFormSubmit = async (data) => {
    setFarmerData(data);
    
    // Simulate API call for crop recommendations
    const mockRecommendations = {
      recommended_crops: [
        {
          crop_name: "Maize",
          area_pct: 60,
          expected_yield_t_per_ha: 5.2,
          expected_profit_per_ha: 4500,
          confidence_pct: 78,
          water_requirement_mm_per_week_or_note: "40-50 mm/week",
          fertilizer_recommendation: "Urea 50kg/ha + DAP 100kg/ha at planting; split N at 30 & 60 days",
          pest_control_recommendation: "Monitor for stem borer; apply recommended pesticide per label if infestation >10%"
        },
        {
          crop_name: "Groundnut",
          area_pct: 40,
          expected_yield_t_per_ha: 2.4,
          expected_profit_per_ha: 3800,
          confidence_pct: 70,
          water_requirement_mm_per_week_or_note: "25-35 mm/week",
          fertilizer_recommendation: "Rhizobium bio-inoculant + 50kg P2O5/ha",
          pest_control_recommendation: "Use pheromone traps; apply recommended insecticide if leaf damage >15%"
        }
      ],
      overall_expected_profit: 5100,
      overall_confidence_pct: 75,
      contingency_plan: {
        event: "pest",
        immediate_actions: ["Isolate affected strips", "Apply targeted pesticide as guided", "Contact extension officer"],
        mid_term_actions: ["Rotate to less-susceptible crop next season", "Improve field sanitation"],
        contacts: { extension_officer: "Mr. Rao, 98765XXXXX", helpline_number: "+91-XXXXXXXXXX" }
      },
      satellite_water_summary: "Moderate water availability (index 0.6). Recommend reduce water allocation to drought-sensitive crops by 10%.",
      short_sms_templates: {
        pest_alert: "Alert: pests detected in your field. Apply recommended pesticide or call helpline.",
        nutrient_alert: "Alert: nutrient deficiency detected. Apply NPK as instructed.",
        disaster_alert: "Alert: Flood risk detected near your field. Move stored inputs & call helpline."
      },
      display_text: {
        language: data.language,
        title: "Recommendation: Maize + Groundnut (60% / 40%)",
        summary: "Split area between maize (60%) and groundnut (40%) to maximize profit with moderate risk.",
        detailed_steps: "1) Follow fertilizer schedule... 2) Irrigate 40mm/week for maize..."
      },
      explainability: "Recommendation uses historical yields, current market prices, soil suitability score and satellite water index; maize gives higher profit under tube-well irrigation; groundnut reduces risk and improves soil N."
    };

    setRecommendations(mockRecommendations);
    setCurrentView('recommendations');
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            {currentView === 'form' && (
              <FarmerForm onSubmit={handleFormSubmit} />
            )}
            
            {currentView === 'recommendations' && recommendations && (
              <div className="space-y-8">
                <Recommendations 
                  data={recommendations} 
                  farmerData={farmerData}
                  onViewMap={() => setCurrentView('map')}
                  onViewEmergency={() => setCurrentView('emergency')}
                  onBack={() => setCurrentView('form')}
                />
              </div>
            )}
            
            {currentView === 'map' && (
              <SatelliteMap 
                farmerData={farmerData}
                onBack={() => setCurrentView('recommendations')}
              />
            )}
            
            {currentView === 'emergency' && recommendations && (
              <EmergencyPlan 
                contingencyPlan={recommendations.contingency_plan}
                smsTemplates={recommendations.short_sms_templates}
                onBack={() => setCurrentView('recommendations')}
              />
            )}
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

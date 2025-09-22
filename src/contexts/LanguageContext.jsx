import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  EN: {
    appTitle: "Smart Crop Advisor",
    askLastCrop: "What did you plant last season?",
    soilType: "Soil type",
    area: "Area (hectares)",
    irrigationType: "Irrigation type",
    getRecommendation: "Get Recommendation",
    viewSatellite: "View satellite water map",
    recommendedCrop: "Recommended crop",
    areaAllocation: "Area allocation (%)",
    expectedYield: "Expected yield",
    confidence: "Confidence (%)",
    emergencyPlan: "Emergency plan",
    switchLanguage: "Switch language",
    welcome: "Welcome",
    location: "Location",
    riskProfile: "Risk Profile",
    language: "Language",
    submit: "Submit",
    back: "Back",
    loading: "Loading...",
    overallProfit: "Overall Expected Profit",
    waterRequirement: "Water Requirement",
    fertilizer: "Fertilizer",
    pestControl: "Pest Control",
    viewDetails: "View Details",
    immediateActions: "Immediate Actions",
    midTermActions: "Mid-term Actions",
    contacts: "Emergency Contacts",
    extensionOfficer: "Extension Officer",
    helplineNumber: "Helpline Number",
    smsAlerts: "SMS Alert Templates",
    pestAlert: "Pest Alert",
    nutrientAlert: "Nutrient Alert",
    disasterAlert: "Disaster Alert",
    explanation: "How this recommendation was calculated"
  },
  TE: {
    appTitle: "స్మార్ట్ క్రాప్ సలహాదారు",
    askLastCrop: "మీరు గత సీజన్లో ఏ పంట నాటారు?",
    soilType: "మట్టి రకం",
    area: "విస్తీర్ణం (హెక్టార్లు)",
    irrigationType: "నీరుబావి రకం",
    getRecommendation: "సిఫార్సు పొందండి",
    viewSatellite: "ఉపగ్రహ నీటి మ్యాప్ చూడండి",
    recommendedCrop: "సిఫార్సు చేసిన పంట",
    areaAllocation: "భూభాగ పంపిణీ (%)",
    expectedYield: "అంచనా దిగుబడి",
    confidence: "నమ్మక స్థాయి (%)",
    emergencyPlan: "అత్యవసర యోజన",
    switchLanguage: "భాష మార్చండి",
    welcome: "స్వాగతం",
    location: "స్థానం",
    riskProfile: "రిస్క్ ప్రొఫైల్",
    language: "భాష",
    submit: "సమర్పించండి",
    back: "వెనుకకు",
    loading: "లోడ్ అవుతోంది...",
    overallProfit: "మొత్తం అంచనా లాభం",
    waterRequirement: "నీటి అవసరం",
    fertilizer: "ఎరువులు",
    pestControl: "కీటక నియంత్రణ",
    viewDetails: "వివరాలు చూడండి",
    immediateActions: "తక్షణ చర్యలు",
    midTermActions: "మధ్యకాలిక చర్యలు",
    contacts: "అత్యవసర సంప్రదింపులు",
    extensionOfficer: "విస్తరణ అధికారి",
    helplineNumber: "హెల్ప్‌లైన్ నంబర్",
    smsAlerts: "SMS అలర్ట్ టెంప్లేట్‌లు",
    pestAlert: "కీటక హెచ్చరిక",
    nutrientAlert: "పోషక హెచ్చరిక",
    disasterAlert: "విపత్తు హెచ్చరిక",
    explanation: "ఈ సిఫార్సు ఎలా లెక్కించబడింది"
  },
  HI: {
    appTitle: "स्मार्ट फसल सलाहकार",
    askLastCrop: "आपने पिछले सीजन में कौन सी फसल लगाई थी?",
    soilType: "मिट्टी का प्रकार",
    area: "क्षेत्र (हेक्टेयर)",
    irrigationType: "सिंचाई प्रकार",
    getRecommendation: "सिफारिश प्राप्त करें",
    viewSatellite: "उपग्रह जल मानचित्र देखें",
    recommendedCrop: "अनुशंसित फसल",
    areaAllocation: "भूमि आवंटन (%)",
    expectedYield: "अनुमानित उपज",
    confidence: "विश्वास स्तर (%)",
    emergencyPlan: "आपातकालीन योजना",
    switchLanguage: "भाषा बदलें",
    welcome: "स्वागत",
    location: "स्थान",
    riskProfile: "जोखिम प्रोफ़ाइल",
    language: "भाषा",
    submit: "जमा करें",
    back: "वापस",
    loading: "लोड हो रहा है...",
    overallProfit: "कुल अनुमानित लाभ",
    waterRequirement: "पानी की आवश्यकता",
    fertilizer: "उर्वरक",
    pestControl: "कीट नियंत्रण",
    viewDetails: "विवरण देखें",
    immediateActions: "तत्काल कार्य",
    midTermActions: "मध्यकालिक कार्य",
    contacts: "आपातकालीन संपर्क",
    extensionOfficer: "विस्तार अधिकारी",
    helplineNumber: "हेल्पलाइन नंबर",
    smsAlerts: "SMS अलर्ट टेम्प्लेट",
    pestAlert: "कीट चेतावनी",
    nutrientAlert: "पोषक तत्व चेतावनी",
    disasterAlert: "आपदा चेतावनी",
    explanation: "यह सिफारिश कैसे की गई"
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      switchLanguage, 
      t,
      availableLanguages: ['EN', 'TE', 'HI']
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

import React from 'react';
import { Leaf, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { currentLanguage, switchLanguage, t, availableLanguages } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('appTitle')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <select
              value={currentLanguage}
              onChange={(e) => switchLanguage(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'EN' ? 'English' : lang === 'TE' ? 'తెలుగు' : 'हिन्दी'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

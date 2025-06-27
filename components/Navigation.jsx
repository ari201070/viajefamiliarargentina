import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

const Navigation = ({ currentView, setCurrentView }) => {
  const { t, isRTL } = useTranslation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setCurrentView('home')}
            className={`text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors ${isRTL ? 'flex-row-reverse' : ''} flex items-center`}
          >
            <span className={isRTL ? 'ml-2' : 'mr-2'}>🇦🇷</span>
            {t('appTitle')}
          </button>
          
          <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {currentView !== 'home' && (
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('backToItinerary')}
              </button>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
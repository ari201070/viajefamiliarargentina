import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, isRTL } = useTranslation();

  return (
    <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded transition-colors ${
          currentLanguage === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('he')}
        className={`px-3 py-1 rounded transition-colors ${
          currentLanguage === 'he'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        עב
      </button>
    </div>
  );
};

export default LanguageSelector;
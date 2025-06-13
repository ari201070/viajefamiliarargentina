import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded ${
          currentLanguage === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } transition-colors`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('he')}
        className={`px-3 py-1 rounded ${
          currentLanguage === 'he'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } transition-colors`}
      >
        עב
      </button>
    </div>
  );
};

export default LanguageSelector;

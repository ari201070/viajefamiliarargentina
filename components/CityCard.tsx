import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const CityCard = ({ city, onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48">
        <img
          src={city.image}
          alt={t(city.name)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{t(city.name)}</h3>
          <p className="text-sm opacity-90">{t(city.region)}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3">
          {t(city.shortDescription)}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">📅 {city.duration}</span>
            <span>🏨 {city.accommodationType}</span>
          </div>
          
          <div className="flex items-center text-blue-600">
            <span className="text-sm font-medium">{t('viewDetails')}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {city.highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {t(highlight)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityCard;

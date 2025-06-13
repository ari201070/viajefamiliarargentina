import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const CityPage = ({ city, onBack }) => {
  const { t } = useTranslation();

  if (!city) return null;

  const sections = [
    {
      id: 'overview',
      title: 'overview',
      icon: '🏛️',
      content: city.overview
    },
    {
      id: 'activities',
      title: 'familyActivities',
      icon: '👨‍👩‍👧‍👦',
      content: city.activities
    },
    {
      id: 'gastronomy',
      title: 'gastronomy',
      icon: '🍽️',
      content: city.gastronomy
    },
    {
      id: 'accommodation',
      title: 'accommodation',
      icon: '🏨',
      content: city.accommodation
    },
    {
      id: 'events',
      title: 'events',
      icon: '🎭',
      content: city.events
    },
    {
      id: 'attractions',
      title: 'attractions',
      icon: '📍',
      content: city.attractions
    },
    {
      id: 'budget',
      title: 'budget',
      icon: '💰',
      content: city.budget
    },
    {
      id: 'tips',
      title: 'familyTips',
      icon: '💡',
      content: city.tips
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96">
        <img
          src={city.image}
          alt={t(city.name)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t(city.name)}</h1>
            <p className="text-xl md:text-2xl opacity-90">{t(city.region)}</p>
            <div className="mt-4 flex justify-center items-center space-x-6 text-sm">
              <span>📅 {city.duration}</span>
              <span>🏨 {city.accommodationType}</span>
              <span>💰 {city.budgetRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToItinerary')}
        </button>

        {/* Quick Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('quickInfo')}</h2>
          <p className="text-gray-700 leading-relaxed">{t(city.shortDescription)}</p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-1">🌡️</div>
              <div className="text-sm font-medium">{t('climate')}</div>
              <div className="text-xs text-gray-600">{city.climate}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
              <div className="text-sm font-medium">{t('familyFriendly')}</div>
              <div className="text-xs text-gray-600">{city.familyRating}/5</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-1">🚗</div>
              <div className="text-sm font-medium">{t('accessibility')}</div>
              <div className="text-xs text-gray-600">{t(city.accessibility)}</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-1">🏥</div>
              <div className="text-sm font-medium">{t('healthFriendly')}</div>
              <div className="text-xs text-gray-600">{t(city.healthOptions)}</div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('highlights')}</h2>
          <div className="flex flex-wrap gap-3">
            {city.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium"
              >
                {t(highlight)}
              </span>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-3">{section.icon}</span>
                {t(section.title)}
              </h2>
              
              <div className="space-y-4">
                {Array.isArray(section.content) ? (
                  <ul className="space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                ) : typeof section.content === 'object' ? (
                  <div className="space-y-3">
                    {Object.entries(section.content).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-gray-800 capitalize">{t(key)}:</h4>
                        <p className="text-gray-700 ml-4">{t(value)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{t(section.content)}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Info */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">🚨</span>
            {t('emergencyInfo')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-red-700">{t('emergency')}:</strong>
              <p>911</p>
            </div>
            <div>
              <strong className="text-red-700">{t('police')}:</strong>
              <p>101</p>
            </div>
            <div>
              <strong className="text-red-700">{t('medical')}:</strong>
              <p>107</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import Navigation from '../components/Navigation';
import CityCard from '../components/CityCard';
import CurrencyConverter from '../components/CurrencyConverter';
import PackingList from '../components/PackingList';
import AIConsultant from '../components/AIConsultant';

// Mock city data - this would normally come from constants.ts
const CITIES = [
  {
    id: 'buenosaires',
    name: 'buenosaires',
    region: 'region_capital',
    shortDescription: 'buenosaires_short',
    duration: '5 días',
    accommodationType: 'Hotel',
    budgetRange: '$50-120',
    climate: 'Templado',
    familyRating: 5,
    accessibility: 'excellent',
    healthOptions: 'excellent',
    highlights: ['Tango', 'Gastronomía', 'Museos', 'Parques'],
    image: '/docs/imagenes/buenosaires/buenosaires.jpg'
  },
  {
    id: 'rosario',
    name: 'rosario',
    region: 'region_pampeana',
    shortDescription: 'rosario_short',
    duration: '4 días',
    accommodationType: 'Hotel',
    budgetRange: '$40-100',
    climate: 'Templado',
    familyRating: 4,
    accessibility: 'good',
    healthOptions: 'good',
    highlights: ['Monumento a la Bandera', 'Costanera', 'Parques'],
    image: '/docs/imagenes/rosario/Monumento-a-la-Bandera-1024x768.jpg'
  },
  {
    id: 'bariloche',
    name: 'bariloche',
    region: 'region_patagonia',
    shortDescription: 'bariloche_short',
    duration: '5 días',
    accommodationType: 'Lodge',
    budgetRange: '$70-180',
    climate: 'Frío',
    familyRating: 5,
    accessibility: 'good',
    healthOptions: 'good',
    highlights: ['Lagos', 'Montañas', 'Chocolate', 'Esquí'],
    image: '/docs/imagenes/bariloche/delfina-iacub-zsgJdHDP4IE-unsplash.jpg'
  }
];

const HomePage = () => {
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('home');

  const handleCityClick = (city) => {
    navigate(`/city/${city.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {t('appTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre Argentina en familia con nuestro itinerario completo de 30 días
          </p>
        </div>

        {/* Cities Grid */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold text-gray-800 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            Destinos Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CITIES.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                onClick={() => handleCityClick(city)}
              />
            ))}
          </div>
        </section>

        {/* Interactive Tools */}
        <section className="space-y-16">
          {/* Currency Converter */}
          <div>
            <h2 className={`text-3xl font-bold text-gray-800 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('currencyConverter')}
            </h2>
            <CurrencyConverter />
          </div>

          {/* Packing List */}
          <div>
            <h2 className={`text-3xl font-bold text-gray-800 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('packingList')}
            </h2>
            <PackingList />
          </div>

          {/* AI Consultant */}
          <div>
            <h2 className={`text-3xl font-bold text-gray-800 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('aiConsultant')}
            </h2>
            <AIConsultant />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
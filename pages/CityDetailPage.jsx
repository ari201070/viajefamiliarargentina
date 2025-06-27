import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import Navigation from '../components/Navigation';
import CityPage from '../components/CityPage';

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
    image: '/docs/imagenes/buenosaires/buenosaires.jpg',
    overview: 'Buenos Aires es la capital cosmopolita de Argentina...',
    activities: ['Visitar el Caminito', 'Show de tango', 'Paseo por Palermo'],
    gastronomy: 'Famosa por sus parrillas y empanadas...',
    accommodation: 'Amplia variedad de hoteles y apartamentos...',
    events: 'Festival de Tango, Noche de los Museos...',
    attractions: ['Obelisco', 'Teatro Colón', 'Puerto Madero'],
    budget: 'Presupuesto medio: $100-150 USD por día...',
    tips: 'Usar transporte público, llevar efectivo...'
  }
];

const CityDetailPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const city = CITIES.find(c => c.id === cityId);

  const handleBack = () => {
    navigate('/');
  };

  if (!city) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation currentView="city" setCurrentView={() => navigate('/')} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Ciudad no encontrada
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('backToItinerary')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView="city" setCurrentView={() => navigate('/')} />
      <CityPage city={city} onBack={handleBack} />
    </div>
  );
};

export default CityDetailPage;
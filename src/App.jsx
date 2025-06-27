import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from '../hooks/useTranslation';
import Navigation from '../components/Navigation';
import HomePage from '../pages/HomePage';
import CityDetailPage from '../pages/CityDetailPage';
import './App.css';

function App() {
  return (
    <TranslationProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:cityId" element={<CityDetailPage />} />
          </Routes>
        </div>
      </Router>
    </TranslationProvider>
  );
}

export default App;
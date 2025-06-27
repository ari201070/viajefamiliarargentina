import { useState, useEffect, createContext, useContext } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  // Load translations for a specific language
  const loadTranslations = async (language) => {
    try {
      setLoading(true);
      const response = await fetch(`/locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to empty translations
      setTranslations({});
    } finally {
      setLoading(false);
    }
  };

  // Initialize language from localStorage or default to Spanish
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
    updateDocumentDirection(savedLanguage);
  }, []);

  // Update document direction for RTL support
  const updateDocumentDirection = (language) => {
    const isRTL = language === 'he';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  // Change language function
  const changeLanguage = async (language) => {
    if (language === currentLanguage) return;
    
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    updateDocumentDirection(language);
    await loadTranslations(language);
  };

  // Translation function
  const t = (key, fallback = key) => {
    if (loading) return fallback;
    return translations[key] || fallback;
  };

  // Check if current language is RTL
  const isRTL = currentLanguage === 'he';

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    isRTL,
    loading,
    translations
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
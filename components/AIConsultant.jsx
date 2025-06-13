import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AIConsultant = () => {
  const { t, currentLanguage } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add welcome message on component mount
    const welcomeMessage = {
      id: Date.now(),
      text: t('aiWelcomeMessage'),
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [currentLanguage, t]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response (in real implementation, this would call an AI service)
      const response = await simulateAIResponse(inputMessage, currentLanguage);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Consultant error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: t('aiErrorMessage'),
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const simulateAIResponse = async (question, language) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple response generation based on keywords
    const responses = {
      es: {
        restaurant: 'Para opciones gastronómicas aptas para diabéticos en Argentina, te recomiendo buscar restaurantes que ofrezcan carnes a la parrilla, ensaladas frescas y verduras. Muchos lugares pueden preparar platos sin salsas azucaradas. En Buenos Aires, Puerto Madero tiene excelentes opciones saludables.',
        activities: 'Para familias con niños, recomiendo visitar el Parque de la Costa en Tigre, el Jardín Zoológico de Buenos Aires, y hacer paseos en barco por el Delta del Tigre. En Bariloche, el cerro Catedral ofrece actividades para toda la familia.',
        transport: 'El transporte público en Buenos Aires incluye subte (metro), colectivos (autobuses) y taxis. Para familias, recomiendo usar Uber o taxis oficiales. Entre ciudades, los autobuses de larga distancia son cómodos y seguros.',
        weather: 'El clima en Argentina varía según la región. Buenos Aires tiene clima templado, Bariloche es más frío (especialmente en invierno), y el norte como Jujuy es más cálido. Recomiendo ropa en capas.',
        budget: 'El presupuesto diario recomendado para una familia de 4 personas es de aproximadamente $100-150 USD, incluyendo alojamiento, comidas y actividades. Los precios pueden variar según la ciudad.',
        default: 'Como experto en viajes familiares por Argentina, estoy aquí para ayudarte. Puedo aconsejarte sobre restaurantes aptos para diabéticos, actividades familiares, transporte, clima y presupuesto. ¿En qué específicamente te gustaría que te ayude?'
      },
      he: {
        restaurant: 'למסעדות המתאימות לסוכרתיים בארגנטינה, אני ממליץ לחפש מקומות המציעים בשר צלוי, סלטים טריים וירקות. מקומות רבים יכולים להכין מנות ללא רטבים מתוקים. בבואנוס איירס, פוארטו מדרו מציע אפשרויות בריאות מעולות.',
        activities: 'למשפחות עם ילדים, אני ממליץ לבקר בפארק דה לה קוסטה בטיגרה, גן החיות של בואנוס איירס, וטיולי סירה בדלתא טיגרה. בברילוצ\'ה, סרו קתדרל מציע פעילויות לכל המשפחה.',
        transport: 'התחבורה הציבורית בבואנוס איירס כוללת רכבת תחתית, אוטובוסים ומוניות. למשפחות, אני ממליץ להשתמש באובר או מוניות רשמיות. בין ערים, אוטובוסים למרחקים ארוכים נוחים ובטוחים.',
        weather: 'האקלים בארגנטינה משתנה לפי האזור. בבואנוס איירס אקלים ממוזג, ברילוצ\'ה קר יותר (במיוחד בחורף), והצפון כמו חוחוי חם יותר. ממליץ על בגדים בשכבות.',
        budget: 'התקציב היומי המומלץ למשפחה של 4 נפשות הוא כ-100-150 דולר ארה"ב, כולל לינה, ארוחות ופעילויות. המחירים יכולים להשתנות לפי העיר.',
        default: 'כמומחה לטיולי משפחות בארגנטינה, אני כאן לעזור לך. אני יכול לייעץ לך על מסעדות מתאימות לסוכרתיים, פעילויות משפחתיות, תחבורה, מזג אויר ותקציב. במה בדיוק תרצה שאעזור לך?'
      }
    };

    const currentResponses = responses[language] || responses.es;
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('restaurant') || lowerQuestion.includes('food') || lowerQuestion.includes('comida') || lowerQuestion.includes('מסעדה') || lowerQuestion.includes('אוכל')) {
      return currentResponses.restaurant;
    } else if (lowerQuestion.includes('activity') || lowerQuestion.includes('actividad') || lowerQuestion.includes('פעילות')) {
      return currentResponses.activities;
    } else if (lowerQuestion.includes('transport') || lowerQuestion.includes('transporte') || lowerQuestion.includes('תחבורה')) {
      return currentResponses.transport;
    } else if (lowerQuestion.includes('weather') || lowerQuestion.includes('clima') || lowerQuestion.includes('מזג אויר')) {
      return currentResponses.weather;
    } else if (lowerQuestion.includes('budget') || lowerQuestion.includes('presupuesto') || lowerQuestion.includes('תקציב')) {
      return currentResponses.budget;
    } else {
      return currentResponses.default;
    }
  };

  const clearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      text: t('aiWelcomeMessage'),
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          🤖 {t('aiConsultant')}
        </h2>
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {t('clearChat')}
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 shadow max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <div className="animate-pulse flex space-x-1">
                  <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                  <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                  <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                </div>
                <span className="ml-2 text-sm">{t('thinking')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          placeholder={t('askQuestion')}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? t('sending') : t('send')}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>{t('aiDisclaimer')}</p>
      </div>
    </div>
  );
};

export default AIConsultant;

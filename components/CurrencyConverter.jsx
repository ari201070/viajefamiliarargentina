import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const CurrencyConverter = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ARS');
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' }
  ];

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, rates]);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate.host/latest?base=USD');
      const data = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Fallback rates for offline functionality
      setRates({
        ARS: 1000,
        USD: 1,
        EUR: 0.92,
        ILS: 3.7
      });
    }
    setLoading(false);
  };

  const convertCurrency = () => {
    if (!rates[fromCurrency] || !rates[toCurrency] || !amount) return;

    // Convert through USD as base
    const usdAmount = amount / rates[fromCurrency];
    const convertedAmount = usdAmount * rates[toCurrency];
    setResult(convertedAmount);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{t('currencyConverter')}</h2>
      
      {loading && (
        <div className="text-center text-blue-600 mb-4">{t('loading')}</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('amount')}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('from')}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('to')}
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            ⇄ {t('swap')}
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">
              {amount} {fromCurrency} =
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
            </div>
          </div>
        </div>

        <button
          onClick={fetchExchangeRates}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          {loading ? t('updating') : t('updateRates')}
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;

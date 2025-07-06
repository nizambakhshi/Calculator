import React, { useState, useEffect } from 'react';
import { ArrowUpDown, DollarSign } from 'lucide-react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    USD: { INR: 83.25, EUR: 0.85, GBP: 0.73, JPY: 110.0, AUD: 1.35, CAD: 1.25 },
    INR: { USD: 0.012, EUR: 0.010, GBP: 0.0088, JPY: 1.32, AUD: 0.016, CAD: 0.015 },
    EUR: { USD: 1.18, INR: 98.5, GBP: 0.86, JPY: 129.5, AUD: 1.59, CAD: 1.47 },
    GBP: { USD: 1.37, INR: 114.2, EUR: 1.16, JPY: 150.8, AUD: 1.85, CAD: 1.71 },
    JPY: { USD: 0.0091, INR: 0.76, EUR: 0.0077, GBP: 0.0066, AUD: 0.012, CAD: 0.011 },
    AUD: { USD: 0.74, INR: 61.7, EUR: 0.63, GBP: 0.54, JPY: 81.5, CAD: 0.93 },
    CAD: { USD: 0.80, INR: 66.6, EUR: 0.68, GBP: 0.58, JPY: 88.0, AUD: 1.08 }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  ];

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setConvertedAmount('');
      setExchangeRate(0);
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      setExchangeRate(1);
      return;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 0;
    const converted = amountNum * rate;
    
    setExchangeRate(rate);
    setConvertedAmount(converted.toFixed(2));
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || '';
  };

  const popularPairs = [
    { from: 'USD', to: 'INR', label: 'USD to INR' },
    { from: 'EUR', to: 'INR', label: 'EUR to INR' },
    { from: 'GBP', to: 'INR', label: 'GBP to INR' },
    { from: 'INR', to: 'USD', label: 'INR to USD' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <DollarSign className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Currency Converter</h1>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Converter */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg text-center"
                placeholder="Enter amount"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg bg-white"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-3 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg bg-white"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result */}
            {convertedAmount && (
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-900 mb-2">
                  {getCurrencySymbol(toCurrency)}{convertedAmount}
                </div>
                <div className="text-green-700">
                  {getCurrencySymbol(fromCurrency)}{amount} {fromCurrency} = {getCurrencySymbol(toCurrency)}{convertedAmount} {toCurrency}
                </div>
                <div className="text-sm text-green-600 mt-2">
                  Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
              </div>
            )}
          </div>

          {/* Popular Currency Pairs */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Currency Pairs</h3>
            <div className="grid grid-cols-2 gap-3">
              {popularPairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromCurrency(pair.from);
                    setToCurrency(pair.to);
                  }}
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-sm font-medium"
                >
                  {pair.label}
                </button>
              ))}
            </div>
          </div>

          {/* Exchange Rates Table */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Current Exchange Rates (1 {fromCurrency})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currencies
                .filter(currency => currency.code !== fromCurrency)
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">{currency.code}</span>
                    <span className="text-blue-800">
                      {(exchangeRates[fromCurrency]?.[currency.code] || 0).toFixed(4)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Disclaimer</h4>
            <p className="text-sm text-yellow-800">
              Exchange rates are for reference only and may not reflect real-time market rates. 
              For actual transactions, please check with your bank or financial institution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
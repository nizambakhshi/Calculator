import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Thermometer } from 'lucide-react';

const TemperatureConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState('0');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');

  const units = {
    celsius: { name: 'Celsius', symbol: '°C' },
    fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
    kelvin: { name: 'Kelvin', symbol: 'K' },
    rankine: { name: 'Rankine', symbol: '°R' },
  };

  const convert = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      case 'rankine':
        return celsius * 9/5 + 491.67;
      default:
        return celsius;
    }
  };

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const result = convert(parseFloat(fromValue), fromUnit, toUnit);
      setToValue(result.toFixed(2));
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const getTemperatureColor = (temp: number, unit: string): string => {
    let celsius = unit === 'celsius' ? temp : convert(temp, unit, 'celsius');
    
    if (celsius < 0) return 'text-blue-600';
    if (celsius < 15) return 'text-cyan-600';
    if (celsius < 25) return 'text-green-600';
    if (celsius < 35) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Thermometer className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Temperature Converter</h1>
        </div>
        
        <div className="space-y-6">
          {/* From Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <div className="flex space-x-3">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter temperature"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {Object.entries(units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
            >
              <ArrowUpDown className="h-5 w-5" />
            </button>
          </div>

          {/* To Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={toValue}
                readOnly
                className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold ${
                  toValue ? getTemperatureColor(parseFloat(toValue), toUnit) : ''
                }`}
                placeholder="Result"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {Object.entries(units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conversion Formula */}
          {fromValue && toValue && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Conversion Result</h3>
              <p className="text-orange-800 text-lg">
                {fromValue}{units[fromUnit as keyof typeof units].symbol} = {toValue}{units[toUnit as keyof typeof units].symbol}
              </p>
            </div>
          )}

          {/* Temperature Scale Reference */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Common Temperature References</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>Water Freezing:</span>
                <span className="text-blue-600">0°C / 32°F</span>
              </div>
              <div className="flex justify-between">
                <span>Room Temperature:</span>
                <span className="text-green-600">20°C / 68°F</span>
              </div>
              <div className="flex justify-between">
                <span>Body Temperature:</span>
                <span className="text-yellow-600">37°C / 98.6°F</span>
              </div>
              <div className="flex justify-between">
                <span>Water Boiling:</span>
                <span className="text-red-600">100°C / 212°F</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
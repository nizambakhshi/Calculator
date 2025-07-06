import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

const WeightConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kilogram');
  const [toUnit, setToUnit] = useState('pound');

  const units = {
    kilogram: { name: 'Kilogram', symbol: 'kg', toKilograms: 1 },
    gram: { name: 'Gram', symbol: 'g', toKilograms: 0.001 },
    pound: { name: 'Pound', symbol: 'lb', toKilograms: 0.453592 },
    ounce: { name: 'Ounce', symbol: 'oz', toKilograms: 0.0283495 },
    stone: { name: 'Stone', symbol: 'st', toKilograms: 6.35029 },
    ton: { name: 'Metric Ton', symbol: 't', toKilograms: 1000 },
  };

  const convert = (value: number, from: string, to: string): number => {
    const fromMultiplier = units[from as keyof typeof units].toKilograms;
    const toMultiplier = units[to as keyof typeof units].toKilograms;
    return (value * fromMultiplier) / toMultiplier;
  };

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const result = convert(parseFloat(fromValue), fromUnit, toUnit);
      setToValue(result.toString());
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Weight Converter</h1>
        
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
                placeholder="Enter value"
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg"
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
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Conversion Formula</h3>
              <p className="text-green-800">
                {fromValue} {units[fromUnit as keyof typeof units].name} = {toValue} {units[toUnit as keyof typeof units].name}
              </p>
              <p className="text-sm text-green-600 mt-1">
                1 {units[fromUnit as keyof typeof units].name} = {convert(1, fromUnit, toUnit)} {units[toUnit as keyof typeof units].name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightConverter;
import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

const LengthConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');

  const units = {
    meter: { name: 'Meter', symbol: 'm', toMeters: 1 },
    kilometer: { name: 'Kilometer', symbol: 'km', toMeters: 1000 },
    centimeter: { name: 'Centimeter', symbol: 'cm', toMeters: 0.01 },
    millimeter: { name: 'Millimeter', symbol: 'mm', toMeters: 0.001 },
    inch: { name: 'Inch', symbol: 'in', toMeters: 0.0254 },
    foot: { name: 'Foot', symbol: 'ft', toMeters: 0.3048 },
    yard: { name: 'Yard', symbol: 'yd', toMeters: 0.9144 },
    mile: { name: 'Mile', symbol: 'mi', toMeters: 1609.344 },
  };

  const convert = (value: number, from: string, to: string): number => {
    const fromMultiplier = units[from as keyof typeof units].toMeters;
    const toMultiplier = units[to as keyof typeof units].toMeters;
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Length Converter</h1>
        
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
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Conversion Formula</h3>
              <p className="text-blue-800">
                {fromValue} {units[fromUnit as keyof typeof units].name} = {toValue} {units[toUnit as keyof typeof units].name}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                1 {units[fromUnit as keyof typeof units].name} = {convert(1, fromUnit, toUnit)} {units[toUnit as keyof typeof units].name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LengthConverter;
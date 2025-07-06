import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

const VolumeConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('liter');
  const [toUnit, setToUnit] = useState('gallon');

  const units = {
    liter: { name: 'Liter', symbol: 'L', toLiters: 1 },
    milliliter: { name: 'Milliliter', symbol: 'mL', toLiters: 0.001 },
    gallon: { name: 'Gallon (US)', symbol: 'gal', toLiters: 3.78541 },
    quart: { name: 'Quart (US)', symbol: 'qt', toLiters: 0.946353 },
    pint: { name: 'Pint (US)', symbol: 'pt', toLiters: 0.473176 },
    cup: { name: 'Cup (US)', symbol: 'cup', toLiters: 0.236588 },
    fluidounce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toLiters: 0.0295735 },
    tablespoon: { name: 'Tablespoon (US)', symbol: 'tbsp', toLiters: 0.0147868 },
    teaspoon: { name: 'Teaspoon (US)', symbol: 'tsp', toLiters: 0.00492892 },
    cubicmeter: { name: 'Cubic Meter', symbol: 'm³', toLiters: 1000 },
  };

  const convert = (value: number, from: string, to: string): number => {
    const fromMultiplier = units[from as keyof typeof units].toLiters;
    const toMultiplier = units[to as keyof typeof units].toLiters;
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Volume Converter</h1>
        
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
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Conversion Formula</h3>
              <p className="text-purple-800">
                {fromValue} {units[fromUnit as keyof typeof units].name} = {toValue} {units[toUnit as keyof typeof units].name}
              </p>
              <p className="text-sm text-purple-600 mt-1">
                1 {units[fromUnit as keyof typeof units].name} = {convert(1, fromUnit, toUnit)} {units[toUnit as keyof typeof units].name}
              </p>
            </div>
          )}

          {/* Common Conversions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Common Volume Conversions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>1 Liter =</span>
                <span>1,000 mL</span>
              </div>
              <div className="flex justify-between">
                <span>1 Gallon =</span>
                <span>3.785 L</span>
              </div>
              <div className="flex justify-between">
                <span>1 Cup =</span>
                <span>8 fl oz</span>
              </div>
              <div className="flex justify-between">
                <span>1 Quart =</span>
                <span>2 Pints</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeConverter;
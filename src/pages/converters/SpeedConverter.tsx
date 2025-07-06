import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Gauge } from 'lucide-react';

const SpeedConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState('60');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [toUnit, setToUnit] = useState('mph');

  const units = {
    kmh: { name: 'Kilometers per hour', symbol: 'km/h', toMps: 1/3.6 },
    mph: { name: 'Miles per hour', symbol: 'mph', toMps: 0.44704 },
    mps: { name: 'Meters per second', symbol: 'm/s', toMps: 1 },
    fps: { name: 'Feet per second', symbol: 'ft/s', toMps: 0.3048 },
    knots: { name: 'Knots', symbol: 'kn', toMps: 0.514444 },
    mach: { name: 'Mach (at sea level)', symbol: 'Ma', toMps: 343 },
  };

  const convert = (value: number, from: string, to: string): number => {
    const fromMultiplier = units[from as keyof typeof units].toMps;
    const toMultiplier = units[to as keyof typeof units].toMps;
    return (value * fromMultiplier) / toMultiplier;
  };

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const result = convert(parseFloat(fromValue), fromUnit, toUnit);
      setToValue(result.toFixed(6));
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const commonSpeeds = [
    { description: 'Walking speed', value: 5, unit: 'kmh' },
    { description: 'Cycling speed', value: 20, unit: 'kmh' },
    { description: 'City driving', value: 50, unit: 'kmh' },
    { description: 'Highway speed', value: 100, unit: 'kmh' },
    { description: 'High-speed train', value: 300, unit: 'kmh' },
    { description: 'Commercial aircraft', value: 900, unit: 'kmh' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Gauge className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">Speed Converter</h1>
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Enter speed"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                {Object.entries(units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold text-red-600"
                placeholder="Result"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                {Object.entries(units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conversion Formula */}
          {fromValue && toValue && (
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Conversion Result</h3>
              <p className="text-red-800">
                {fromValue} {units[fromUnit as keyof typeof units].symbol} = {toValue} {units[toUnit as keyof typeof units].symbol}
              </p>
            </div>
          )}

          {/* Common Speeds Reference */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Common Speed References</h3>
            <div className="space-y-2">
              {commonSpeeds.map((speed, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{speed.description}:</span>
                  <button
                    onClick={() => {
                      setFromValue(speed.value.toString());
                      setFromUnit(speed.unit);
                    }}
                    className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                  >
                    {speed.value} {units[speed.unit as keyof typeof units].symbol}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Conversions */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Quick Conversions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>1 km/h =</span>
                <span className="font-semibold">0.621 mph</span>
              </div>
              <div className="flex justify-between">
                <span>1 mph =</span>
                <span className="font-semibold">1.609 km/h</span>
              </div>
              <div className="flex justify-between">
                <span>1 m/s =</span>
                <span className="font-semibold">3.6 km/h</span>
              </div>
              <div className="flex justify-between">
                <span>1 knot =</span>
                <span className="font-semibold">1.852 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedConverter;
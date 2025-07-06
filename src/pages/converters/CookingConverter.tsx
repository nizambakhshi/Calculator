import React, { useState, useEffect } from 'react';
import { ChefHat, ArrowUpDown } from 'lucide-react';

const CookingConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState('cup');
  const [toUnit, setToUnit] = useState('ml');
  const [result, setResult] = useState('');
  const [category, setCategory] = useState('volume');

  const volumeUnits = {
    cup: { name: 'Cup (US)', toMl: 236.588 },
    tbsp: { name: 'Tablespoon', toMl: 14.787 },
    tsp: { name: 'Teaspoon', toMl: 4.929 },
    ml: { name: 'Milliliter', toMl: 1 },
    liter: { name: 'Liter', toMl: 1000 },
    floz: { name: 'Fluid Ounce (US)', toMl: 29.574 },
    pint: { name: 'Pint (US)', toMl: 473.176 },
    quart: { name: 'Quart (US)', toMl: 946.353 },
    gallon: { name: 'Gallon (US)', toMl: 3785.41 },
  };

  const weightUnits = {
    gram: { name: 'Gram', toGrams: 1 },
    kg: { name: 'Kilogram', toGrams: 1000 },
    oz: { name: 'Ounce', toGrams: 28.35 },
    lb: { name: 'Pound', toGrams: 453.592 },
  };

  const temperatureUnits = {
    celsius: { name: 'Celsius (°C)' },
    fahrenheit: { name: 'Fahrenheit (°F)' },
    kelvin: { name: 'Kelvin (K)' },
    gas: { name: 'Gas Mark' },
  };

  const convert = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      setResult('');
      return;
    }

    let convertedValue = 0;

    if (category === 'volume') {
      const fromMultiplier = volumeUnits[fromUnit as keyof typeof volumeUnits]?.toMl || 1;
      const toMultiplier = volumeUnits[toUnit as keyof typeof volumeUnits]?.toMl || 1;
      convertedValue = (amountNum * fromMultiplier) / toMultiplier;
    } else if (category === 'weight') {
      const fromMultiplier = weightUnits[fromUnit as keyof typeof weightUnits]?.toGrams || 1;
      const toMultiplier = weightUnits[toUnit as keyof typeof weightUnits]?.toGrams || 1;
      convertedValue = (amountNum * fromMultiplier) / toMultiplier;
    } else if (category === 'temperature') {
      convertedValue = convertTemperature(amountNum, fromUnit, toUnit);
    }

    setResult(convertedValue.toFixed(3));
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
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
      case 'gas':
        celsius = (value * 14) + 121; // Approximate gas mark conversion
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      case 'gas':
        return Math.round((celsius - 121) / 14); // Approximate gas mark
      default:
        return celsius;
    }
  };

  useEffect(() => {
    convert();
  }, [amount, fromUnit, toUnit, category]);

  const getCurrentUnits = () => {
    switch (category) {
      case 'volume':
        return volumeUnits;
      case 'weight':
        return weightUnits;
      case 'temperature':
        return temperatureUnits;
      default:
        return volumeUnits;
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setAmount(result);
  };

  const commonConversions = {
    volume: [
      { from: '1 cup', to: '16 tbsp', desc: 'Cup to Tablespoons' },
      { from: '1 tbsp', to: '3 tsp', desc: 'Tablespoon to Teaspoons' },
      { from: '1 cup', to: '240 ml', desc: 'Cup to Milliliters' },
      { from: '1 liter', to: '4.2 cups', desc: 'Liter to Cups' },
    ],
    weight: [
      { from: '1 kg', to: '2.2 lbs', desc: 'Kilogram to Pounds' },
      { from: '1 oz', to: '28 g', desc: 'Ounce to Grams' },
      { from: '1 lb', to: '454 g', desc: 'Pound to Grams' },
    ],
    temperature: [
      { from: '180°C', to: '356°F', desc: 'Moderate oven' },
      { from: '200°C', to: '392°F', desc: 'Hot oven' },
      { from: '100°C', to: '212°F', desc: 'Boiling water' },
    ],
  };

  const ingredientDensities = [
    { ingredient: 'All-purpose flour', density: '120g per cup' },
    { ingredient: 'Sugar (granulated)', density: '200g per cup' },
    { ingredient: 'Brown sugar (packed)', density: '220g per cup' },
    { ingredient: 'Butter', density: '227g per cup' },
    { ingredient: 'Milk', density: '240g per cup' },
    { ingredient: 'Water', density: '240g per cup' },
    { ingredient: 'Honey', density: '340g per cup' },
    { ingredient: 'Rice (uncooked)', density: '185g per cup' },
  ];

  // Extract complex expressions to avoid JSX parsing issues
  const currentUnits = getCurrentUnits();
  const fromUnitName = currentUnits[fromUnit as keyof typeof currentUnits]?.name || '';
  const toUnitName = currentUnits[toUnit as keyof typeof currentUnits]?.name || '';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <ChefHat className="h-8 w-8 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Cooking Converter</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Converter Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Conversion Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['volume', 'weight', 'temperature'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setFromUnit(Object.keys(getCurrentUnits())[0]);
                      setToUnit(Object.keys(getCurrentUnits())[1]);
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors capitalize ${
                      category === cat
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                placeholder="Enter amount"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                >
                  {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={swapUnits}
                  className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                >
                  {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Result</h3>
                <p className="text-orange-800 text-lg">
                  {amount} {fromUnitName} = {result} {toUnitName}
                </p>
              </div>
            )}
          </div>

          {/* Reference Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Common {category} Conversions</h3>
              <div className="space-y-2">
                {commonConversions[category as keyof typeof commonConversions]?.map((conv, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{conv.desc}:</span>
                    <span className="font-semibold">{conv.from} = {conv.to}</span>
                  </div>
                ))}
              </div>
            </div>

            {category === 'volume' && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Ingredient Densities</h3>
                <div className="space-y-2">
                  {ingredientDensities.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-blue-700">{item.ingredient}:</span>
                      <span className="font-semibold text-blue-800">{item.density}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category === 'temperature' && (
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Oven Temperature Guide</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Very slow:</span>
                    <span className="font-semibold">120-140°C (250-275°F)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slow:</span>
                    <span className="font-semibold">150-160°C (300-325°F)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moderate:</span>
                    <span className="font-semibold">180°C (350°F)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hot:</span>
                    <span className="font-semibold">200-220°C (400-425°F)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Very hot:</span>
                    <span className="font-semibold">230-250°C (450-480°F)</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Cooking Tips</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Always level dry ingredients when measuring</li>
                <li>• Use liquid measuring cups for liquids</li>
                <li>• Pack brown sugar unless recipe says otherwise</li>
                <li>• Sift flour if recipe calls for it</li>
                <li>• Room temperature ingredients mix better</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingConverter;
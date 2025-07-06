import React, { useState, useEffect } from 'react';
import { Waves, Droplets } from 'lucide-react';

const SwimmingPoolCalculator: React.FC = () => {
  const [poolShape, setPoolShape] = useState('rectangular');
  const [length, setLength] = useState('25');
  const [width, setWidth] = useState('12');
  const [depth, setDepth] = useState('1.5');
  const [shallowDepth, setShallowDepth] = useState('1');
  const [deepDepth, setDeepDepth] = useState('2');
  const [diameter, setDiameter] = useState('6');
  const [unit, setUnit] = useState('meters');
  
  const [volume, setVolume] = useState(0);
  const [surfaceArea, setSurfaceArea] = useState(0);
  const [chemicals, setChemicals] = useState({
    chlorine: 0,
    shock: 0,
    algaecide: 0,
    clarifier: 0
  });
  const [heatingCost, setHeatingCost] = useState(0);

  const calculatePool = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    const sd = parseFloat(shallowDepth);
    const dd = parseFloat(deepDepth);
    const dia = parseFloat(diameter);

    let vol = 0;
    let area = 0;

    switch (poolShape) {
      case 'rectangular':
        vol = l * w * d;
        area = l * w;
        break;
      case 'circular':
        const radius = dia / 2;
        vol = Math.PI * radius * radius * d;
        area = Math.PI * radius * radius;
        break;
      case 'oval':
        vol = Math.PI * (l / 2) * (w / 2) * d;
        area = Math.PI * (l / 2) * (w / 2);
        break;
      case 'kidney':
        // Approximate kidney shape as 0.85 of oval
        vol = 0.85 * Math.PI * (l / 2) * (w / 2) * d;
        area = 0.85 * Math.PI * (l / 2) * (w / 2);
        break;
      case 'variable':
        // Variable depth pool (average depth)
        const avgDepth = (sd + dd) / 2;
        vol = l * w * avgDepth;
        area = l * w;
        break;
    }

    // Convert to liters if using meters
    if (unit === 'meters') {
      vol = vol * 1000; // cubic meters to liters
    } else {
      vol = vol * 28.317; // cubic feet to liters
      area = area * 0.0929; // sq ft to sq meters
    }

    setVolume(vol);
    setSurfaceArea(area);

    // Calculate chemical requirements (per 10,000 liters)
    const volumeRatio = vol / 10000;
    setChemicals({
      chlorine: Math.round(volumeRatio * 150), // grams
      shock: Math.round(volumeRatio * 500), // grams
      algaecide: Math.round(volumeRatio * 100), // ml
      clarifier: Math.round(volumeRatio * 200) // ml
    });

    // Estimate heating cost (rough calculation)
    const tempRise = 10; // degrees Celsius
    const energyKwh = (vol * tempRise * 1.16) / 1000; // kWh needed
    const costPerKwh = 5; // ₹5 per kWh (approximate)
    setHeatingCost(Math.round(energyKwh * costPerKwh));
  };

  useEffect(() => {
    calculatePool();
  }, [poolShape, length, width, depth, shallowDepth, deepDepth, diameter, unit]);

  const poolShapes = [
    { id: 'rectangular', name: 'Rectangular', icon: '⬜' },
    { id: 'circular', name: 'Circular', icon: '⭕' },
    { id: 'oval', name: 'Oval', icon: '🥚' },
    { id: 'kidney', name: 'Kidney', icon: '🫘' },
    { id: 'variable', name: 'Variable Depth', icon: '📐' },
  ];

  const getShapeInputs = () => {
    switch (poolShape) {
      case 'rectangular':
      case 'kidney':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Length ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool length"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Width ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool width"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Depth ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool depth"
              />
            </div>
          </>
        );
      case 'circular':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Diameter ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool diameter"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Depth ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool depth"
              />
            </div>
          </>
        );
      case 'oval':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Length ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool length"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Width ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool width"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Depth ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool depth"
              />
            </div>
          </>
        );
      case 'variable':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Length ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool length"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Width ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pool width"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Shallow End ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={shallowDepth}
                onChange={(e) => setShallowDepth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Shallow depth"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Deep End ({unit === 'meters' ? 'm' : 'ft'})</label>
              <input
                type="number"
                value={deepDepth}
                onChange={(e) => setDeepDepth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Deep depth"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Waves className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Swimming Pool Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pool Shape</label>
              <div className="grid grid-cols-2 gap-2">
                {poolShapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setPoolShape(shape.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                      poolShape === shape.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-lg">{shape.icon}</span>
                    <span className="font-medium text-sm">{shape.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="meters">Meters</option>
                <option value="feet">Feet</option>
              </select>
            </div>

            {getShapeInputs()}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Pool Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Volume:</span>
                  <span className="font-bold text-blue-900">
                    {volume.toLocaleString(undefined, {maximumFractionDigits: 0})} liters
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Surface Area:</span>
                  <span className="font-bold text-blue-900">
                    {surfaceArea.toFixed(1)} m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Gallons (US):</span>
                  <span className="font-semibold text-blue-800">
                    {(volume * 0.264172).toLocaleString(undefined, {maximumFractionDigits: 0})} gal
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Chemical Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Chlorine (weekly):</span>
                  <span className="font-semibold text-green-800">{chemicals.chlorine}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Shock Treatment:</span>
                  <span className="font-semibold text-green-800">{chemicals.shock}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Algaecide (monthly):</span>
                  <span className="font-semibold text-green-800">{chemicals.algaecide}ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Clarifier:</span>
                  <span className="font-semibold text-green-800">{chemicals.clarifier}ml</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Heating Cost Estimate</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-700">10°C Temperature Rise:</span>
                  <span className="font-bold text-purple-900">₹{heatingCost.toLocaleString()}</span>
                </div>
                <div className="text-sm text-purple-600">
                  *Estimate based on electric heating at ₹5/kWh
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Pool Maintenance Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Test water chemistry 2-3 times per week</li>
                <li>• Maintain pH between 7.2-7.6</li>
                <li>• Keep chlorine levels at 1-3 ppm</li>
                <li>• Brush walls and vacuum weekly</li>
                <li>• Clean skimmer baskets regularly</li>
                <li>• Run filtration system 8-12 hours daily</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Safety Guidelines</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Install proper fencing and gates</li>
                <li>• Ensure adequate lighting</li>
                <li>• Keep rescue equipment nearby</li>
                <li>• Never swim alone</li>
                <li>• Regular safety inspections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimmingPoolCalculator;
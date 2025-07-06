import React, { useState, useEffect } from 'react';
import { Truck, Calculator } from 'lucide-react';

const ConcreteCalculator: React.FC = () => {
  const [shape, setShape] = useState('slab');
  const [unit, setUnit] = useState('feet');
  
  // Slab dimensions
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  
  // Footing dimensions
  const [footingLength, setFootingLength] = useState('');
  const [footingWidth, setFootingWidth] = useState('');
  const [footingDepth, setFootingDepth] = useState('');
  
  // Column dimensions
  const [columnHeight, setColumnHeight] = useState('');
  const [columnDiameter, setColumnDiameter] = useState('');
  const [columnCount, setColumnCount] = useState('1');
  
  // Steps
  const [stepCount, setStepCount] = useState('');
  const [stepLength, setStepLength] = useState('');
  const [stepWidth, setStepWidth] = useState('');
  const [stepHeight, setStepHeight] = useState('');
  
  const [volume, setVolume] = useState(0);
  const [bags, setBags] = useState(0);
  const [cost, setCost] = useState(0);
  const [bagPrice, setBagPrice] = useState('350'); // Price per bag in rupees

  const calculateVolume = () => {
    let calculatedVolume = 0;

    switch (shape) {
      case 'slab':
        const l = parseFloat(length);
        const w = parseFloat(width);
        const t = parseFloat(thickness);
        if (l > 0 && w > 0 && t > 0) {
          if (unit === 'feet') {
            calculatedVolume = l * w * (t / 12); // Convert thickness from inches to feet
          } else {
            calculatedVolume = l * w * (t / 100); // Convert thickness from cm to meters
          }
        }
        break;

      case 'footing':
        const fl = parseFloat(footingLength);
        const fw = parseFloat(footingWidth);
        const fd = parseFloat(footingDepth);
        if (fl > 0 && fw > 0 && fd > 0) {
          calculatedVolume = fl * fw * fd;
        }
        break;

      case 'column':
        const ch = parseFloat(columnHeight);
        const cd = parseFloat(columnDiameter);
        const cc = parseFloat(columnCount);
        if (ch > 0 && cd > 0 && cc > 0) {
          const radius = cd / 2;
          const singleColumnVolume = Math.PI * radius * radius * ch;
          calculatedVolume = singleColumnVolume * cc;
        }
        break;

      case 'steps':
        const sc = parseFloat(stepCount);
        const sl = parseFloat(stepLength);
        const sw = parseFloat(stepWidth);
        const sh = parseFloat(stepHeight);
        if (sc > 0 && sl > 0 && sw > 0 && sh > 0) {
          // Calculate volume for triangular steps
          calculatedVolume = 0.5 * sl * sw * sh * sc;
        }
        break;
    }

    setVolume(calculatedVolume);

    // Calculate bags needed (assuming 1 cubic foot = 1.5 bags of concrete mix)
    let volumeInCubicFeet = calculatedVolume;
    if (unit === 'meters') {
      volumeInCubicFeet = calculatedVolume * 35.314; // Convert cubic meters to cubic feet
    }
    
    const bagsNeeded = Math.ceil(volumeInCubicFeet * 1.5 * 1.1); // Add 10% waste
    setBags(bagsNeeded);
    setCost(bagsNeeded * parseFloat(bagPrice));
  };

  useEffect(() => {
    calculateVolume();
  }, [shape, length, width, thickness, footingLength, footingWidth, footingDepth, 
      columnHeight, columnDiameter, columnCount, stepCount, stepLength, stepWidth, stepHeight, unit, bagPrice]);

  const getVolumeUnit = () => {
    return unit === 'feet' ? 'cubic feet' : 'cubic meters';
  };

  const convertVolume = (vol: number) => {
    if (unit === 'feet') {
      return {
        cubicFeet: vol,
        cubicYards: vol / 27,
        cubicMeters: vol / 35.314
      };
    } else {
      return {
        cubicMeters: vol,
        cubicFeet: vol * 35.314,
        cubicYards: vol * 1.308
      };
    }
  };

  const conversions = convertVolume(volume);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Truck className="h-8 w-8 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Concrete Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
              >
                <option value="slab">Concrete Slab</option>
                <option value="footing">Footing</option>
                <option value="column">Columns</option>
                <option value="steps">Steps</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Measurement Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
              >
                <option value="feet">Feet & Inches</option>
                <option value="meters">Meters & Centimeters</option>
              </select>
            </div>

            {/* Slab Inputs */}
            {shape === 'slab' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Length ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter length"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Width ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter width"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Thickness ({unit === 'feet' ? 'inches' : 'centimeters'})
                  </label>
                  <input
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder={`Enter thickness in ${unit === 'feet' ? 'inches' : 'cm'}`}
                  />
                </div>
              </div>
            )}

            {/* Footing Inputs */}
            {shape === 'footing' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Length ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={footingLength}
                    onChange={(e) => setFootingLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter length"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Width ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={footingWidth}
                    onChange={(e) => setFootingWidth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter width"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Depth ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={footingDepth}
                    onChange={(e) => setFootingDepth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter depth"
                  />
                </div>
              </div>
            )}

            {/* Column Inputs */}
            {shape === 'column' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Height ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={columnHeight}
                    onChange={(e) => setColumnHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter height"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Diameter ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={columnDiameter}
                    onChange={(e) => setColumnDiameter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter diameter"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Number of Columns</label>
                  <input
                    type="number"
                    value={columnCount}
                    onChange={(e) => setColumnCount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter number of columns"
                  />
                </div>
              </div>
            )}

            {/* Steps Inputs */}
            {shape === 'steps' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Number of Steps</label>
                  <input
                    type="number"
                    value={stepCount}
                    onChange={(e) => setStepCount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter number of steps"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Step Length ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={stepLength}
                    onChange={(e) => setStepLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter step length"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Step Width ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={stepWidth}
                    onChange={(e) => setStepWidth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter step width"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Step Height ({unit === 'feet' ? 'feet' : 'meters'})
                  </label>
                  <input
                    type="number"
                    value={stepHeight}
                    onChange={(e) => setStepHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter step height"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Concrete Mix Price per Bag (₹)</label>
              <input
                type="number"
                value={bagPrice}
                onChange={(e) => setBagPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter price per bag"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {volume > 0 && (
              <>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Concrete Volume Required</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {volume.toFixed(2)}
                    </div>
                    <div className="text-lg text-gray-700">
                      {getVolumeUnit()}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Material Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Concrete Mix Bags:</span>
                      <span className="font-bold text-blue-900">{bags} bags</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Estimated Cost:</span>
                      <span className="font-bold text-blue-900">₹{cost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Volume Conversions</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cubic Feet:</span>
                      <span className="font-semibold">{conversions.cubicFeet.toFixed(2)} ft³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cubic Yards:</span>
                      <span className="font-semibold">{conversions.cubicYards.toFixed(2)} yd³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cubic Meters:</span>
                      <span className="font-semibold">{conversions.cubicMeters.toFixed(2)} m³</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Construction Tips</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Order 10% extra concrete to account for waste</li>
                <li>• Standard slab thickness is 4-6 inches</li>
                <li>• Ensure proper reinforcement with rebar</li>
                <li>• Consider weather conditions during pouring</li>
                <li>• Allow proper curing time (28 days for full strength)</li>
              </ul>
            </div>

            {/* Mix Information */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Concrete Mix Information</h3>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Standard Mix Ratio:</strong> 1:2:3 (Cement:Sand:Aggregate)</p>
                <p><strong>Water-Cement Ratio:</strong> 0.4 to 0.6</p>
                <p><strong>Compressive Strength:</strong> M20 grade (20 MPa)</p>
                <p><strong>Bag Weight:</strong> 50 kg per bag</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcreteCalculator;
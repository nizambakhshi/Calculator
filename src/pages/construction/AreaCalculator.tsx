import React, { useState, useEffect } from 'react';
import { Square, Triangle, Circle } from 'lucide-react';

const AreaCalculator: React.FC = () => {
  const [shape, setShape] = useState('rectangle');
  const [unit, setUnit] = useState('meters');
  const [area, setArea] = useState(0);
  
  // Rectangle/Square
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  
  // Circle
  const [radius, setRadius] = useState('');
  const [diameter, setDiameter] = useState('');
  
  // Triangle
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [side1, setSide1] = useState('');
  const [side2, setSide2] = useState('');
  const [side3, setSide3] = useState('');
  const [triangleType, setTriangleType] = useState('base-height');

  const calculateArea = () => {
    let calculatedArea = 0;

    switch (shape) {
      case 'rectangle':
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (l > 0 && w > 0) {
          calculatedArea = l * w;
        }
        break;

      case 'square':
        const side = parseFloat(length);
        if (side > 0) {
          calculatedArea = side * side;
        }
        break;

      case 'circle':
        let r = 0;
        if (radius) {
          r = parseFloat(radius);
        } else if (diameter) {
          r = parseFloat(diameter) / 2;
        }
        if (r > 0) {
          calculatedArea = Math.PI * r * r;
        }
        break;

      case 'triangle':
        if (triangleType === 'base-height') {
          const b = parseFloat(base);
          const h = parseFloat(height);
          if (b > 0 && h > 0) {
            calculatedArea = 0.5 * b * h;
          }
        } else if (triangleType === 'three-sides') {
          const a = parseFloat(side1);
          const b = parseFloat(side2);
          const c = parseFloat(side3);
          if (a > 0 && b > 0 && c > 0) {
            // Heron's formula
            const s = (a + b + c) / 2;
            const areaSquared = s * (s - a) * (s - b) * (s - c);
            if (areaSquared > 0) {
              calculatedArea = Math.sqrt(areaSquared);
            }
          }
        }
        break;

      case 'trapezoid':
        const a = parseFloat(side1); // parallel side 1
        const b = parseFloat(side2); // parallel side 2
        const h = parseFloat(height);
        if (a > 0 && b > 0 && h > 0) {
          calculatedArea = 0.5 * (a + b) * h;
        }
        break;

      case 'parallelogram':
        const baseP = parseFloat(base);
        const heightP = parseFloat(height);
        if (baseP > 0 && heightP > 0) {
          calculatedArea = baseP * heightP;
        }
        break;
    }

    setArea(calculatedArea);
  };

  useEffect(() => {
    calculateArea();
  }, [shape, length, width, radius, diameter, base, height, side1, side2, side3, triangleType]);

  const getUnitSymbol = () => {
    switch (unit) {
      case 'meters': return 'm²';
      case 'feet': return 'ft²';
      case 'inches': return 'in²';
      case 'centimeters': return 'cm²';
      case 'yards': return 'yd²';
      default: return 'm²';
    }
  };

  const convertArea = (areaInBaseUnit: number) => {
    // Assuming base unit is meters
    switch (unit) {
      case 'feet': return areaInBaseUnit * 10.764;
      case 'inches': return areaInBaseUnit * 1550;
      case 'centimeters': return areaInBaseUnit * 10000;
      case 'yards': return areaInBaseUnit * 1.196;
      default: return areaInBaseUnit;
    }
  };

  const shapes = [
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'square', name: 'Square', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'triangle', name: 'Triangle', icon: Triangle },
    { id: 'trapezoid', name: 'Trapezoid', icon: Square },
    { id: 'parallelogram', name: 'Parallelogram', icon: Square },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Square className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Area Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Shape</label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((shapeOption) => (
                  <button
                    key={shapeOption.id}
                    onClick={() => setShape(shapeOption.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                      shape === shapeOption.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <shapeOption.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{shapeOption.name}</span>
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
                <option value="inches">Inches</option>
                <option value="centimeters">Centimeters</option>
                <option value="yards">Yards</option>
              </select>
            </div>

            {/* Shape-specific inputs */}
            {shape === 'rectangle' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Length</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter length"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Width</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter width"
                  />
                </div>
              </div>
            )}

            {shape === 'square' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Side Length</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter side length"
                />
              </div>
            )}

            {shape === 'circle' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Radius</label>
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => {
                      setRadius(e.target.value);
                      if (e.target.value) setDiameter('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter radius"
                  />
                </div>
                <div className="text-center text-gray-500">OR</div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Diameter</label>
                  <input
                    type="number"
                    value={diameter}
                    onChange={(e) => {
                      setDiameter(e.target.value);
                      if (e.target.value) setRadius('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter diameter"
                  />
                </div>
              </div>
            )}

            {shape === 'triangle' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Calculation Method</label>
                  <select
                    value={triangleType}
                    onChange={(e) => setTriangleType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="base-height">Base and Height</option>
                    <option value="three-sides">Three Sides (Heron's Formula)</option>
                  </select>
                </div>

                {triangleType === 'base-height' ? (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Base</label>
                      <input
                        type="number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Height</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter height"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Side A</label>
                      <input
                        type="number"
                        value={side1}
                        onChange={(e) => setSide1(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter side A"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Side B</label>
                      <input
                        type="number"
                        value={side2}
                        onChange={(e) => setSide2(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter side B"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Side C</label>
                      <input
                        type="number"
                        value={side3}
                        onChange={(e) => setSide3(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter side C"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {shape === 'trapezoid' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Parallel Side A</label>
                  <input
                    type="number"
                    value={side1}
                    onChange={(e) => setSide1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parallel side A"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Parallel Side B</label>
                  <input
                    type="number"
                    value={side2}
                    onChange={(e) => setSide2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parallel side B"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter height"
                  />
                </div>
              </div>
            )}

            {shape === 'parallelogram' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Base</label>
                  <input
                    type="number"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter height"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {area > 0 && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Area Result</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    {convertArea(area).toFixed(2)}
                  </div>
                  <div className="text-xl text-blue-700">
                    {getUnitSymbol()}
                  </div>
                </div>
              </div>
            )}

            {/* Formula Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Formula Used</h3>
              <div className="text-sm text-gray-700">
                {shape === 'rectangle' && 'Area = Length × Width'}
                {shape === 'square' && 'Area = Side²'}
                {shape === 'circle' && 'Area = π × Radius²'}
                {shape === 'triangle' && triangleType === 'base-height' && 'Area = ½ × Base × Height'}
                {shape === 'triangle' && triangleType === 'three-sides' && "Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2"}
                {shape === 'trapezoid' && 'Area = ½ × (Parallel Side A + Parallel Side B) × Height'}
                {shape === 'parallelogram' && 'Area = Base × Height'}
              </div>
            </div>

            {/* Common Conversions */}
            {area > 0 && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Common Conversions</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Square Meters:</span>
                    <span className="font-semibold">{area.toFixed(2)} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Square Feet:</span>
                    <span className="font-semibold">{(area * 10.764).toFixed(2)} ft²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Square Inches:</span>
                    <span className="font-semibold">{(area * 1550).toFixed(0)} in²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Square Yards:</span>
                    <span className="font-semibold">{(area * 1.196).toFixed(2)} yd²</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaCalculator;
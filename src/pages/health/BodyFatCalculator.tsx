import React, { useState, useEffect } from 'react';
import { Activity, User } from 'lucide-react';

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [neck, setNeck] = useState('37');
  const [waist, setWaist] = useState('85');
  const [hip, setHip] = useState('95');
  const [unit, setUnit] = useState('metric');
  
  const [bodyFat, setBodyFat] = useState(0);
  const [category, setCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  const calculateBodyFat = () => {
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);
    let neckCm = parseFloat(neck);
    let waistCm = parseFloat(waist);
    let hipCm = parseFloat(hip);

    if (unit === 'imperial') {
      weightKg = weightKg * 0.453592;
      heightCm = heightCm * 2.54;
      neckCm = neckCm * 2.54;
      waistCm = waistCm * 2.54;
      hipCm = hipCm * 2.54;
    }

    if (weightKg > 0 && heightCm > 0 && neckCm > 0 && waistCm > 0) {
      let bodyFatPercentage: number;

      if (gender === 'male') {
        // US Navy formula for men
        bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
      } else {
        // US Navy formula for women
        if (hipCm > 0) {
          bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
        } else {
          bodyFatPercentage = 0;
        }
      }

      setBodyFat(Math.max(0, bodyFatPercentage));

      // Determine category
      if (gender === 'male') {
        if (bodyFatPercentage < 6) {
          setCategory('Essential Fat');
          setCategoryColor('text-red-600 bg-red-50');
        } else if (bodyFatPercentage < 14) {
          setCategory('Athletes');
          setCategoryColor('text-blue-600 bg-blue-50');
        } else if (bodyFatPercentage < 18) {
          setCategory('Fitness');
          setCategoryColor('text-green-600 bg-green-50');
        } else if (bodyFatPercentage < 25) {
          setCategory('Average');
          setCategoryColor('text-yellow-600 bg-yellow-50');
        } else {
          setCategory('Obese');
          setCategoryColor('text-red-600 bg-red-50');
        }
      } else {
        if (bodyFatPercentage < 14) {
          setCategory('Essential Fat');
          setCategoryColor('text-red-600 bg-red-50');
        } else if (bodyFatPercentage < 21) {
          setCategory('Athletes');
          setCategoryColor('text-blue-600 bg-blue-50');
        } else if (bodyFatPercentage < 25) {
          setCategory('Fitness');
          setCategoryColor('text-green-600 bg-green-50');
        } else if (bodyFatPercentage < 32) {
          setCategory('Average');
          setCategoryColor('text-yellow-600 bg-yellow-50');
        } else {
          setCategory('Obese');
          setCategoryColor('text-red-600 bg-red-50');
        }
      }
    } else {
      setBodyFat(0);
      setCategory('');
      setCategoryColor('');
    }
  };

  useEffect(() => {
    calculateBodyFat();
  }, [gender, age, weight, height, neck, waist, hip, unit]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Activity className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Body Fat Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Measurement System</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              >
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, inches)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter weight"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Height ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter height"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Neck ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter neck circumference"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Waist ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter waist circumference"
                />
              </div>
            </div>

            {gender === 'female' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hip ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter hip circumference"
                />
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {bodyFat > 0 && (
              <div className={`rounded-lg p-6 ${categoryColor.split(' ')[1]}`}>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <User className="h-8 w-8" />
                    <h3 className="text-2xl font-bold">Your Body Fat</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {bodyFat.toFixed(1)}%
                  </div>
                  <div className={`text-xl font-semibold px-4 py-2 rounded-lg ${categoryColor}`}>
                    {category}
                  </div>
                </div>
              </div>
            )}

            {/* Body Fat Categories */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Fat Categories</h3>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {gender === 'male' ? 'Men' : 'Women'}:
                </div>
                {gender === 'male' ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-red-100 rounded">
                      <span>Essential Fat</span>
                      <span>2-5%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-100 rounded">
                      <span>Athletes</span>
                      <span>6-13%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-100 rounded">
                      <span>Fitness</span>
                      <span>14-17%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-100 rounded">
                      <span>Average</span>
                      <span>18-24%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-100 rounded">
                      <span>Obese</span>
                      <span>25%+</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-red-100 rounded">
                      <span>Essential Fat</span>
                      <span>10-13%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-100 rounded">
                      <span>Athletes</span>
                      <span>14-20%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-100 rounded">
                      <span>Fitness</span>
                      <span>21-24%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-100 rounded">
                      <span>Average</span>
                      <span>25-31%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-100 rounded">
                      <span>Obese</span>
                      <span>32%+</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Measurement Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Measurement Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Measure neck just below the larynx</li>
                <li>• Measure waist at the narrowest point</li>
                {gender === 'female' && <li>• Measure hips at the widest point</li>}
                <li>• Take measurements in the morning</li>
                <li>• Use a flexible measuring tape</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
              <p className="text-sm text-yellow-800">
                This calculator uses the US Navy method and provides estimates. For accurate body composition analysis, 
                consider professional methods like DEXA scans or consult with healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatCalculator;
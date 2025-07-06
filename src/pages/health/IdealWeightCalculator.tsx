import React, { useState, useEffect } from 'react';
import { Scale, Target } from 'lucide-react';

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('30');
  const [unit, setUnit] = useState('metric');
  const [currentWeight, setCurrentWeight] = useState('70');
  
  const [idealWeights, setIdealWeights] = useState({
    robinson: 0,
    miller: 0,
    devine: 0,
    hamwi: 0,
    healthy_bmi: { min: 0, max: 0 }
  });

  const calculateIdealWeight = () => {
    let heightCm = parseFloat(height);
    let currentWeightKg = parseFloat(currentWeight);

    if (unit === 'imperial') {
      heightCm = heightCm * 2.54;
      currentWeightKg = currentWeightKg * 0.453592;
    }

    const heightM = heightCm / 100;
    const heightInches = heightCm / 2.54;

    if (heightCm > 0) {
      // Robinson Formula (1983)
      let robinson: number;
      if (gender === 'male') {
        robinson = 52 + 1.9 * (heightInches - 60);
      } else {
        robinson = 49 + 1.7 * (heightInches - 60);
      }

      // Miller Formula (1983)
      let miller: number;
      if (gender === 'male') {
        miller = 56.2 + 1.41 * (heightInches - 60);
      } else {
        miller = 53.1 + 1.36 * (heightInches - 60);
      }

      // Devine Formula (1974)
      let devine: number;
      if (gender === 'male') {
        devine = 50 + 2.3 * (heightInches - 60);
      } else {
        devine = 45.5 + 2.3 * (heightInches - 60);
      }

      // Hamwi Formula (1964)
      let hamwi: number;
      if (gender === 'male') {
        hamwi = 48 + 2.7 * (heightInches - 60);
      } else {
        hamwi = 45.5 + 2.2 * (heightInches - 60);
      }

      // Healthy BMI Range (18.5 - 24.9)
      const healthyBMIMin = 18.5 * heightM * heightM;
      const healthyBMIMax = 24.9 * heightM * heightM;

      setIdealWeights({
        robinson: Math.max(0, robinson),
        miller: Math.max(0, miller),
        devine: Math.max(0, devine),
        hamwi: Math.max(0, hamwi),
        healthy_bmi: { min: healthyBMIMin, max: healthyBMIMax }
      });
    }
  };

  useEffect(() => {
    calculateIdealWeight();
  }, [height, gender, age, unit, currentWeight]);

  const convertWeight = (weightKg: number) => {
    if (unit === 'imperial') {
      return (weightKg * 2.20462).toFixed(1);
    }
    return weightKg.toFixed(1);
  };

  const getWeightDifference = (idealWeight: number) => {
    let currentWeightKg = parseFloat(currentWeight);
    if (unit === 'imperial') {
      currentWeightKg = currentWeightKg * 0.453592;
    }
    
    const diff = currentWeightKg - idealWeight;
    const absDiff = Math.abs(diff);
    
    if (Math.abs(diff) < 1) {
      return { text: 'At ideal weight', color: 'text-green-600' };
    } else if (diff > 0) {
      return { 
        text: `${convertWeight(absDiff)} ${unit === 'metric' ? 'kg' : 'lbs'} above ideal`, 
        color: 'text-orange-600' 
      };
    } else {
      return { 
        text: `${convertWeight(absDiff)} ${unit === 'metric' ? 'kg' : 'lbs'} below ideal`, 
        color: 'text-blue-600' 
      };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Target className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Ideal Weight Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Measurement System</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg bg-white"
              >
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, inches)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Weight ({unit === 'metric' ? 'kg' : 'lbs'}) (Optional)
              </label>
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder={`Enter current weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Ideal Weight Calculations</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-700 font-medium">Robinson Formula:</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-900">
                      {convertWeight(idealWeights.robinson)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </span>
                    {currentWeight && (
                      <div className={`text-sm ${getWeightDifference(idealWeights.robinson).color}`}>
                        {getWeightDifference(idealWeights.robinson).text}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-700 font-medium">Miller Formula:</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-900">
                      {convertWeight(idealWeights.miller)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </span>
                    {currentWeight && (
                      <div className={`text-sm ${getWeightDifference(idealWeights.miller).color}`}>
                        {getWeightDifference(idealWeights.miller).text}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-700 font-medium">Devine Formula:</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-900">
                      {convertWeight(idealWeights.devine)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </span>
                    {currentWeight && (
                      <div className={`text-sm ${getWeightDifference(idealWeights.devine).color}`}>
                        {getWeightDifference(idealWeights.devine).text}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-green-700 font-medium">Hamwi Formula:</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-900">
                      {convertWeight(idealWeights.hamwi)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </span>
                    {currentWeight && (
                      <div className={`text-sm ${getWeightDifference(idealWeights.hamwi).color}`}>
                        {getWeightDifference(idealWeights.hamwi).text}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Healthy BMI Range */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Healthy BMI Range</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Minimum Weight:</span>
                  <span className="font-bold text-blue-900">
                    {convertWeight(idealWeights.healthy_bmi.min)} {unit === 'metric' ? 'kg' : 'lbs'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Maximum Weight:</span>
                  <span className="font-bold text-blue-900">
                    {convertWeight(idealWeights.healthy_bmi.max)} {unit === 'metric' ? 'kg' : 'lbs'}
                  </span>
                </div>
                <div className="text-sm text-blue-600 mt-2">
                  BMI Range: 18.5 - 24.9 (Normal weight)
                </div>
              </div>
            </div>

            {/* Formula Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Formulas</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Robinson (1983):</span>
                  <span className="text-gray-600 ml-2">Most commonly used in clinical practice</span>
                </div>
                <div>
                  <span className="font-medium">Miller (1983):</span>
                  <span className="text-gray-600 ml-2">Modified version of Robinson formula</span>
                </div>
                <div>
                  <span className="font-medium">Devine (1974):</span>
                  <span className="text-gray-600 ml-2">Used for drug dosage calculations</span>
                </div>
                <div>
                  <span className="font-medium">Hamwi (1964):</span>
                  <span className="text-gray-600 ml-2">Quick estimation method</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• These formulas are estimates and may not apply to all body types</li>
                <li>• Athletes with high muscle mass may weigh more than "ideal"</li>
                <li>• Age, bone density, and muscle mass affect ideal weight</li>
                <li>• Consult healthcare professionals for personalized advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdealWeightCalculator;
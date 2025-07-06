import React, { useState, useEffect } from 'react';
import { Flame, Activity } from 'lucide-react';

const BMRCalculator: React.FC = () => {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('metric');
  const [formula, setFormula] = useState('mifflin');
  
  const [bmr, setBmr] = useState(0);
  const [activityCalories, setActivityCalories] = useState({
    sedentary: 0,
    light: 0,
    moderate: 0,
    active: 0,
    very_active: 0
  });

  const calculateBMR = () => {
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    if (unit === 'imperial') {
      weightKg = weightKg * 0.453592;
      heightCm = heightCm * 2.54;
    }

    const ageNum = parseFloat(age);

    if (weightKg > 0 && heightCm > 0 && ageNum > 0) {
      let bmrValue: number;

      switch (formula) {
        case 'mifflin':
          // Mifflin-St Jeor Equation (most accurate)
          if (gender === 'male') {
            bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
          } else {
            bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
          }
          break;

        case 'harris':
          // Harris-Benedict Equation (revised)
          if (gender === 'male') {
            bmrValue = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum);
          } else {
            bmrValue = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum);
          }
          break;

        case 'katch':
          // Katch-McArdle Formula (requires body fat percentage - using average)
          const avgBodyFat = gender === 'male' ? 15 : 25; // Average body fat percentages
          const leanMass = weightKg * (1 - avgBodyFat / 100);
          bmrValue = 370 + (21.6 * leanMass);
          break;

        default:
          bmrValue = 0;
      }

      setBmr(bmrValue);

      // Calculate calories for different activity levels
      setActivityCalories({
        sedentary: bmrValue * 1.2,
        light: bmrValue * 1.375,
        moderate: bmrValue * 1.55,
        active: bmrValue * 1.725,
        very_active: bmrValue * 1.9
      });
    } else {
      setBmr(0);
      setActivityCalories({
        sedentary: 0,
        light: 0,
        moderate: 0,
        active: 0,
        very_active: 0
      });
    }
  };

  useEffect(() => {
    calculateBMR();
  }, [age, gender, weight, height, unit, formula]);

  const activityLevels = [
    {
      key: 'sedentary',
      name: 'Sedentary',
      description: 'Little or no exercise',
      multiplier: '1.2'
    },
    {
      key: 'light',
      name: 'Light Activity',
      description: 'Light exercise 1-3 days/week',
      multiplier: '1.375'
    },
    {
      key: 'moderate',
      name: 'Moderate Activity',
      description: 'Moderate exercise 3-5 days/week',
      multiplier: '1.55'
    },
    {
      key: 'active',
      name: 'Active',
      description: 'Hard exercise 6-7 days/week',
      multiplier: '1.725'
    },
    {
      key: 'very_active',
      name: 'Very Active',
      description: 'Very hard exercise, physical job',
      multiplier: '1.9'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Flame className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">BMR Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                  placeholder="Enter age"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg bg-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Measurement System</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                  placeholder="Enter height"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Formula</label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg bg-white"
              >
                <option value="mifflin">Mifflin-St Jeor (Recommended)</option>
                <option value="harris">Harris-Benedict (Revised)</option>
                <option value="katch">Katch-McArdle</option>
              </select>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {bmr > 0 && (
              <>
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Activity className="h-8 w-8 text-red-600" />
                      <h3 className="text-2xl font-bold text-red-900">Your BMR</h3>
                    </div>
                    <div className="text-4xl font-bold text-red-900 mb-2">
                      {Math.round(bmr)} calories/day
                    </div>
                    <p className="text-red-700">
                      Calories needed at complete rest
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Calorie Needs by Activity Level</h3>
                  <div className="space-y-3">
                    {activityLevels.map((level) => (
                      <div key={level.key} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{level.name}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {Math.round(activityCalories[level.key as keyof typeof activityCalories])} cal
                          </div>
                          <div className="text-sm text-gray-500">BMR × {level.multiplier}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Formula Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">About BMR Formulas</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Mifflin-St Jeor:</span>
                  <span className="text-blue-700 ml-2">Most accurate for general population</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Harris-Benedict:</span>
                  <span className="text-blue-700 ml-2">Traditional formula, slightly less accurate</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Katch-McArdle:</span>
                  <span className="text-blue-700 ml-2">Best for lean individuals, uses body composition</span>
                </div>
              </div>
            </div>

            {/* What is BMR */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">What is BMR?</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p>
                  Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions while at rest.
                </p>
                <p>
                  This includes breathing, circulation, cell production, nutrient processing, and protein synthesis.
                </p>
                <p>
                  BMR typically accounts for 60-75% of total daily energy expenditure in sedentary individuals.
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Tips for Healthy Metabolism</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Build muscle mass through strength training</li>
                <li>• Stay hydrated throughout the day</li>
                <li>• Get adequate sleep (7-9 hours)</li>
                <li>• Eat protein with every meal</li>
                <li>• Don't severely restrict calories</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator;
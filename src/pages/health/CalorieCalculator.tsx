import React, { useState, useEffect } from 'react';
import { Flame, Activity } from 'lucide-react';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [unit, setUnit] = useState('metric');
  
  const [bmr, setBmr] = useState(0);
  const [calories, setCalories] = useState(0);
  const [goals, setGoals] = useState({
    maintain: 0,
    lose: 0,
    gain: 0
  });

  const activityLevels = {
    sedentary: { name: 'Sedentary (little/no exercise)', multiplier: 1.2 },
    light: { name: 'Light (light exercise 1-3 days/week)', multiplier: 1.375 },
    moderate: { name: 'Moderate (moderate exercise 3-5 days/week)', multiplier: 1.55 },
    active: { name: 'Active (hard exercise 6-7 days/week)', multiplier: 1.725 },
    very_active: { name: 'Very Active (very hard exercise, physical job)', multiplier: 1.9 }
  };

  const calculateCalories = () => {
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);

    if (unit === 'imperial') {
      weightKg = weightKg * 0.453592;
      heightCm = heightCm * 2.54;
    }

    const ageNum = parseFloat(age);

    if (weightKg > 0 && heightCm > 0 && ageNum > 0) {
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmrValue;
      if (gender === 'male') {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
      } else {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
      }

      // Calculate total daily calories based on activity level
      const multiplier = activityLevels[activityLevel as keyof typeof activityLevels].multiplier;
      const totalCalories = bmrValue * multiplier;

      setBmr(bmrValue);
      setCalories(totalCalories);
      setGoals({
        maintain: totalCalories,
        lose: totalCalories - 500, // 1 lb per week
        gain: totalCalories + 500   // 1 lb per week
      });
    } else {
      setBmr(0);
      setCalories(0);
      setGoals({ maintain: 0, lose: 0, gain: 0 });
    }
  };

  useEffect(() => {
    calculateCalories();
  }, [age, gender, weight, height, activityLevel, unit]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Flame className="h-8 w-8 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Calorie Calculator</h1>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="Enter age"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="Enter height"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg bg-white"
              >
                {Object.entries(activityLevels).map(([key, level]) => (
                  <option key={key} value={key}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {calories > 0 && (
              <>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4">Your Daily Calorie Needs</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-orange-700">BMR (Base Metabolic Rate):</span>
                      <span className="text-xl font-bold text-orange-900">
                        {Math.round(bmr)} calories/day
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-700">Total Daily Energy:</span>
                      <span className="text-2xl font-bold text-orange-900">
                        {Math.round(calories)} calories/day
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Goals</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg">
                      <span className="text-green-700 font-medium">Maintain Weight:</span>
                      <span className="text-lg font-bold text-green-900">
                        {Math.round(goals.maintain)} cal/day
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
                      <span className="text-blue-700 font-medium">Lose 1 lb/week:</span>
                      <span className="text-lg font-bold text-blue-900">
                        {Math.round(goals.lose)} cal/day
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg">
                      <span className="text-purple-700 font-medium">Gain 1 lb/week:</span>
                      <span className="text-lg font-bold text-purple-900">
                        {Math.round(goals.gain)} cal/day
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Macronutrient Breakdown */}
            {calories > 0 && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Recommended Macros</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Carbohydrates (45-65%):</span>
                    <span className="font-semibold text-blue-800">
                      {Math.round(calories * 0.5 / 4)}g ({Math.round(calories * 0.5)} cal)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Protein (10-35%):</span>
                    <span className="font-semibold text-blue-800">
                      {Math.round(calories * 0.25 / 4)}g ({Math.round(calories * 0.25)} cal)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Fat (20-35%):</span>
                    <span className="font-semibold text-blue-800">
                      {Math.round(calories * 0.25 / 9)}g ({Math.round(calories * 0.25)} cal)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Healthy Tips</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Eat nutrient-dense foods over empty calories</li>
                <li>• Stay hydrated - drink plenty of water</li>
                <li>• Include protein in every meal</li>
                <li>• Don't skip meals - eat regularly</li>
                <li>• Listen to your body's hunger cues</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Disclaimer</h4>
              <p className="text-sm text-yellow-800">
                This calculator provides estimates based on general formulas. Individual needs may vary. 
                Consult with healthcare professionals or registered dietitians for personalized nutrition advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
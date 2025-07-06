import React, { useState, useEffect } from 'react';
import { Activity, Scale } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  const calculateBMI = () => {
    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    if (unit === 'imperial') {
      // Convert pounds to kg and inches to meters
      weightKg = weightKg * 0.453592;
      heightM = heightM * 0.0254;
    } else {
      // Convert cm to meters
      heightM = heightM / 100;
    }

    if (weightKg > 0 && heightM > 0) {
      const bmiValue = weightKg / (heightM * heightM);
      setBmi(bmiValue);

      // Determine BMI category
      if (bmiValue < 18.5) {
        setCategory('Underweight');
        setCategoryColor('text-blue-600 bg-blue-50');
      } else if (bmiValue < 25) {
        setCategory('Normal weight');
        setCategoryColor('text-green-600 bg-green-50');
      } else if (bmiValue < 30) {
        setCategory('Overweight');
        setCategoryColor('text-yellow-600 bg-yellow-50');
      } else {
        setCategory('Obese');
        setCategoryColor('text-red-600 bg-red-50');
      }
    } else {
      setBmi(0);
      setCategory('');
      setCategoryColor('');
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height, unit]);

  const getBMIRanges = () => [
    { range: 'Below 18.5', category: 'Underweight', color: 'bg-blue-100' },
    { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-green-100' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-yellow-100' },
    { range: '30.0 and above', category: 'Obese', color: 'bg-red-100' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Activity className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">BMI Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
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
                placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
              />
            </div>

            {/* BMI Scale Visual */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">BMI Scale</h3>
              <div className="space-y-2">
                {getBMIRanges().map((range, index) => (
                  <div key={index} className={`flex justify-between items-center p-2 rounded ${range.color}`}>
                    <span className="font-medium">{range.category}</span>
                    <span className="text-sm">{range.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {bmi > 0 && (
              <div className={`rounded-lg p-6 ${categoryColor.split(' ')[1]}`}>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Scale className="h-8 w-8" />
                    <h3 className="text-2xl font-bold">Your BMI</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {bmi.toFixed(1)}
                  </div>
                  <div className={`text-xl font-semibold px-4 py-2 rounded-lg ${categoryColor}`}>
                    {category}
                  </div>
                </div>
              </div>
            )}

            {/* Health Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Understanding BMI</h3>
              <div className="space-y-3 text-blue-800">
                <p className="text-sm">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. 
                  It's a useful screening tool but doesn't directly measure body fat.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold">BMI Categories:</h4>
                  <ul className="text-sm space-y-1 pl-4">
                    <li>• <strong>Underweight:</strong> BMI less than 18.5</li>
                    <li>• <strong>Normal:</strong> BMI 18.5-24.9</li>
                    <li>• <strong>Overweight:</strong> BMI 25-29.9</li>
                    <li>• <strong>Obese:</strong> BMI 30 or greater</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Health Tips</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Maintain a balanced diet with plenty of fruits and vegetables</li>
                <li>• Exercise regularly - aim for 150 minutes per week</li>
                <li>• Stay hydrated by drinking plenty of water</li>
                <li>• Get adequate sleep (7-9 hours per night)</li>
                <li>• Consult healthcare professionals for personalized advice</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
              <p className="text-sm text-yellow-800">
                BMI is a screening tool and not a diagnostic tool. It doesn't account for muscle mass, 
                bone density, or body composition. Always consult with healthcare professionals for 
                medical advice and personalized health assessments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
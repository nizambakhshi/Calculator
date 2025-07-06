import React, { useState, useEffect } from 'react';
import { DollarSign, Users } from 'lucide-react';

const GratuityCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState('1000');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [serviceQuality, setServiceQuality] = useState('good');
  const [customTip, setCustomTip] = useState('');
  
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [perPersonAmount, setPerPersonAmount] = useState(0);
  const [perPersonTip, setPerPersonTip] = useState(0);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);

    if (bill > 0 && tip >= 0 && people > 0) {
      const tipAmt = (bill * tip) / 100;
      const total = bill + tipAmt;
      const perPerson = total / people;
      const tipPerPerson = tipAmt / people;

      setTipAmount(tipAmt);
      setTotalAmount(total);
      setPerPersonAmount(perPerson);
      setPerPersonTip(tipPerPerson);
    }
  };

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  const serviceQualities = {
    poor: { percentage: 10, description: 'Poor service' },
    average: { percentage: 12, description: 'Average service' },
    good: { percentage: 15, description: 'Good service' },
    great: { percentage: 18, description: 'Great service' },
    excellent: { percentage: 20, description: 'Excellent service' },
  };

  const quickTipAmounts = [10, 12, 15, 18, 20, 25];

  const billPresets = [
    { name: 'Coffee', amount: 200 },
    { name: 'Lunch', amount: 500 },
    { name: 'Dinner', amount: 1500 },
    { name: 'Fine Dining', amount: 3000 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <DollarSign className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Gratuity Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Bill Amount (₹)</label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter bill amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Bill Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {billPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setBillAmount(preset.amount.toString())}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {preset.name} (₹{preset.amount})
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Service Quality</label>
              <div className="space-y-2">
                {Object.entries(serviceQualities).map(([key, quality]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="serviceQuality"
                      value={key}
                      checked={serviceQuality === key}
                      onChange={(e) => {
                        setServiceQuality(e.target.value);
                        setTipPercentage(quality.percentage.toString());
                      }}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">
                      {quality.description} ({quality.percentage}%)
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tip Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter tip percentage"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Quick Tip Amounts</label>
              <div className="grid grid-cols-3 gap-2">
                {quickTipAmounts.map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setTipPercentage(tip.toString())}
                    className={`px-3 py-2 border rounded-lg transition-colors ${
                      tipPercentage === tip.toString()
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tip}%
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Number of People</label>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Number of people"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Tip Calculation</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Bill Amount:</span>
                  <span className="font-semibold text-green-800">₹{parseFloat(billAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Tip ({tipPercentage}%):</span>
                  <span className="font-semibold text-green-800">₹{tipAmount.toFixed(2)}</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between">
                  <span className="text-green-700 font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-900">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {parseInt(numberOfPeople) > 1 && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Per Person Split</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Number of People:</span>
                    <span className="font-semibold text-blue-800">{numberOfPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Tip per Person:</span>
                    <span className="font-semibold text-blue-800">₹{perPersonTip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700 font-semibold">Total per Person:</span>
                    <span className="text-xl font-bold text-blue-900">₹{perPersonAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Tip Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Tip Rate:</span>
                  <span className="font-semibold">{tipPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Tip Amount:</span>
                  <span className="font-semibold">₹{tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Tip as % of Total:</span>
                  <span className="font-semibold">
                    {totalAmount > 0 ? ((tipAmount / totalAmount) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Tipping Guidelines (India)</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• <strong>Restaurants:</strong> 10-15% for good service</li>
                <li>• <strong>Fine Dining:</strong> 15-20% for excellent service</li>
                <li>• <strong>Cafes/Fast Food:</strong> 5-10% or round up</li>
                <li>• <strong>Delivery:</strong> ₹20-50 depending on order size</li>
                <li>• <strong>Taxi/Auto:</strong> Round up to nearest ₹10</li>
                <li>• <strong>Hotels:</strong> ₹50-100 for room service</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Tip Etiquette</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tip in cash when possible</li>
                <li>• Consider service quality, not just bill amount</li>
                <li>• Tip is optional but appreciated</li>
                <li>• Some restaurants include service charge</li>
                <li>• Be generous for exceptional service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GratuityCalculator;
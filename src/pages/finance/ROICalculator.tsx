import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState('100000');
  const [finalValue, setFinalValue] = useState('150000');
  const [additionalInvestments, setAdditionalInvestments] = useState('0');
  const [timePeriod, setTimePeriod] = useState('2');
  const [timeUnit, setTimeUnit] = useState('years');
  
  const [roi, setROI] = useState(0);
  const [annualizedROI, setAnnualizedROI] = useState(0);
  const [totalGain, setTotalGain] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const additional = parseFloat(additionalInvestments);
    const time = parseFloat(timePeriod);

    if (initial > 0 && final > 0 && time > 0) {
      const totalInvestedAmount = initial + additional;
      const gain = final - totalInvestedAmount;
      const roiPercentage = (gain / totalInvestedAmount) * 100;
      
      // Convert time to years for annualized calculation
      let timeInYears = time;
      if (timeUnit === 'months') {
        timeInYears = time / 12;
      } else if (timeUnit === 'days') {
        timeInYears = time / 365;
      }
      
      const annualized = timeInYears > 0 ? Math.pow(final / totalInvestedAmount, 1 / timeInYears) - 1 : 0;
      
      setROI(roiPercentage);
      setAnnualizedROI(annualized * 100);
      setTotalGain(gain);
      setTotalInvested(totalInvestedAmount);
    }
  };

  useEffect(() => {
    calculateROI();
  }, [initialInvestment, finalValue, additionalInvestments, timePeriod, timeUnit]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <TrendingUp className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">ROI Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Investment (₹)</label>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter initial investment"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Final Value (₹)</label>
              <input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter final value"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Additional Investments (₹)</label>
              <input
                type="number"
                value={additionalInvestments}
                onChange={(e) => setAdditionalInvestments(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter additional investments"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time Period</label>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Time"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">ROI Results</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    {roi.toFixed(2)}%
                  </div>
                  <div className="text-green-700">Total ROI</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Annualized ROI:</span>
                  <span className="font-semibold text-green-800">{annualizedROI.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Gain:</span>
                  <span className="font-semibold text-green-800">₹{totalGain.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Invested:</span>
                  <span className="font-semibold text-green-800">₹{totalInvested.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">ROI Interpretation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Excellent ROI:</span>
                  <span className="font-semibold text-green-600">&gt; 15% annually</span>
                </div>
                <div className="flex justify-between">
                  <span>Good ROI:</span>
                  <span className="font-semibold text-blue-600">10-15% annually</span>
                </div>
                <div className="flex justify-between">
                  <span>Average ROI:</span>
                  <span className="font-semibold text-yellow-600">7-10% annually</span>
                </div>
                <div className="flex justify-between">
                  <span>Poor ROI:</span>
                  <span className="font-semibold text-red-600">&lt; 7% annually</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
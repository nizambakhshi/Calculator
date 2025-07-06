import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowUp } from 'lucide-react';

const StepUpSIPCalculator: React.FC = () => {
  const [initialSIP, setInitialSIP] = useState('10000');
  const [stepUpPercentage, setStepUpPercentage] = useState('10');
  const [stepUpFrequency, setStepUpFrequency] = useState('yearly');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('15');
  
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [regularSIPAmount, setRegularSIPAmount] = useState(0);
  const [stepUpBenefit, setStepUpBenefit] = useState(0);

  const calculateStepUpSIP = () => {
    const P = parseFloat(initialSIP);
    const stepUp = parseFloat(stepUpPercentage) / 100;
    const r = parseFloat(expectedReturn) / 100 / 12;
    const years = parseFloat(timePeriod);
    const totalMonths = years * 12;

    if (P <= 0 || r < 0 || years <= 0) return;

    let totalInvested = 0;
    let futureValue = 0;
    let currentSIP = P;
    
    // Calculate step-up frequency in months
    const stepUpMonths = stepUpFrequency === 'yearly' ? 12 : 6;

    for (let month = 1; month <= totalMonths; month++) {
      // Increase SIP amount at step-up intervals
      if (month > 1 && (month - 1) % stepUpMonths === 0) {
        currentSIP = currentSIP * (1 + stepUp);
      }

      totalInvested += currentSIP;
      
      // Calculate future value of this month's investment
      const remainingMonths = totalMonths - month + 1;
      futureValue += currentSIP * Math.pow(1 + r, remainingMonths - 1);
    }

    // Calculate regular SIP for comparison
    const regularSIPFV = P * (Math.pow(1 + r, totalMonths) - 1) / r * (1 + r);
    const regularSIPInvestment = P * totalMonths;

    setMaturityAmount(futureValue);
    setTotalInvestment(totalInvested);
    setWealthGained(futureValue - totalInvested);
    setRegularSIPAmount(regularSIPFV);
    setStepUpBenefit(futureValue - regularSIPFV);
  };

  useEffect(() => {
    calculateStepUpSIP();
  }, [initialSIP, stepUpPercentage, stepUpFrequency, expectedReturn, timePeriod]);

  const getStepUpSchedule = () => {
    const P = parseFloat(initialSIP);
    const stepUp = parseFloat(stepUpPercentage) / 100;
    const years = parseFloat(timePeriod);
    const stepUpMonths = stepUpFrequency === 'yearly' ? 12 : 6;
    const schedule = [];
    
    let currentSIP = P;
    let period = 0;
    
    while (period < years) {
      schedule.push({
        period: period + 1,
        sipAmount: currentSIP,
        frequency: stepUpFrequency
      });
      
      currentSIP = currentSIP * (1 + stepUp);
      period += stepUpFrequency === 'yearly' ? 1 : 0.5;
    }
    
    return schedule.slice(0, 10); // Show first 10 periods
  };

  const stepUpSchedule = getStepUpSchedule();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <ArrowUp className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Step-up SIP Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Monthly SIP (₹)</label>
              <input
                type="number"
                value={initialSIP}
                onChange={(e) => setInitialSIP(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter initial SIP amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Step-up Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                value={stepUpPercentage}
                onChange={(e) => setStepUpPercentage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter step-up percentage"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Step-up Frequency</label>
              <select
                value={stepUpFrequency}
                onChange={(e) => setStepUpFrequency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg bg-white"
              >
                <option value="yearly">Yearly</option>
                <option value="half-yearly">Half-yearly</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter expected return"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Investment Period (years)</label>
              <input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter time period"
              />
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Step-up SIP Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Keeps pace with income growth and inflation</li>
                <li>• Significantly higher corpus than regular SIP</li>
                <li>• Disciplined approach to increasing investments</li>
                <li>• Better wealth creation over long term</li>
                <li>• Flexible step-up amounts and frequency</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Step-up SIP Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Total Investment:</span>
                  <span className="font-semibold text-green-800">
                    ₹{totalInvestment.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Wealth Gained:</span>
                  <span className="font-semibold text-green-800">
                    ₹{wealthGained.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Maturity Amount:</span>
                  <span className="text-2xl font-bold text-green-900">
                    ₹{maturityAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Comparison with Regular SIP</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Regular SIP Maturity:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{regularSIPAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Step-up SIP Maturity:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{maturityAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Additional Benefit:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{stepUpBenefit.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Benefit Percentage:</span>
                  <span className="font-bold text-green-600">
                    {regularSIPAmount > 0 ? ((stepUpBenefit / regularSIPAmount) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Step-up Schedule (First 10 periods)</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {stepUpSchedule.map((step, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-purple-700">
                      {stepUpFrequency === 'yearly' ? `Year ${step.period}` : `Period ${step.period}`}:
                    </span>
                    <span className="font-semibold text-purple-800">
                      ₹{step.sipAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Investment Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Start with a comfortable SIP amount</li>
                <li>• Increase step-up with salary increments</li>
                <li>• Review and adjust step-up percentage annually</li>
                <li>• Consider 10-15% annual step-up for optimal growth</li>
                <li>• Stay consistent with your investment discipline</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUpSIPCalculator;
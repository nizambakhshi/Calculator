import React, { useState, useEffect } from 'react';
import { ArrowDown, Wallet } from 'lucide-react';

const SWPCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState('2000000');
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState('15000');
  const [expectedReturn, setExpectedReturn] = useState('10');
  const [inflationRate, setInflationRate] = useState('6');
  const [withdrawalType, setWithdrawalType] = useState('fixed');
  const [inflationAdjustment, setInflationAdjustment] = useState('5');
  
  const [portfolioLife, setPortfolioLife] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [realWithdrawalValue, setRealWithdrawalValue] = useState(0);

  const calculateSWP = () => {
    const initial = parseFloat(initialInvestment);
    const withdrawal = parseFloat(monthlyWithdrawal);
    const annualReturn = parseFloat(expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const inflation = parseFloat(inflationRate) / 100;
    const adjustmentRate = parseFloat(inflationAdjustment) / 100;

    if (initial <= 0 || withdrawal <= 0 || monthlyReturn < 0) return;

    let currentAmount = initial;
    let currentWithdrawal = withdrawal;
    let totalWithdrawnAmount = 0;
    let months = 0;
    const maxMonths = 50 * 12; // Maximum 50 years

    while (currentAmount > 0 && months < maxMonths) {
      months++;
      
      // Apply returns first
      currentAmount = currentAmount * (1 + monthlyReturn);
      
      // Check if we can make the withdrawal
      if (currentAmount < currentWithdrawal) {
        totalWithdrawnAmount += currentAmount;
        currentAmount = 0;
        break;
      }
      
      // Make withdrawal
      currentAmount -= currentWithdrawal;
      totalWithdrawnAmount += currentWithdrawal;
      
      // Adjust withdrawal for inflation (yearly)
      if (withdrawalType === 'inflation-adjusted' && months % 12 === 0) {
        currentWithdrawal = currentWithdrawal * (1 + adjustmentRate);
      }
    }

    // Calculate real value of withdrawals
    const years = months / 12;
    const realValue = withdrawal / Math.pow(1 + inflation, years);

    setPortfolioLife(years);
    setTotalWithdrawn(totalWithdrawnAmount);
    setRemainingAmount(currentAmount);
    setRealWithdrawalValue(realValue);
  };

  useEffect(() => {
    calculateSWP();
  }, [initialInvestment, monthlyWithdrawal, expectedReturn, inflationRate, withdrawalType, inflationAdjustment]);

  const getWithdrawalSchedule = () => {
    const withdrawal = parseFloat(monthlyWithdrawal);
    const adjustmentRate = parseFloat(inflationAdjustment) / 100;
    const schedule = [];
    
    let currentWithdrawal = withdrawal;
    
    for (let year = 1; year <= Math.min(10, portfolioLife); year++) {
      schedule.push({
        year,
        monthlyWithdrawal: currentWithdrawal,
        annualWithdrawal: currentWithdrawal * 12
      });
      
      if (withdrawalType === 'inflation-adjusted') {
        currentWithdrawal = currentWithdrawal * (1 + adjustmentRate);
      }
    }
    
    return schedule;
  };

  const withdrawalSchedule = getWithdrawalSchedule();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <ArrowDown className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">SWP Calculator</h1>
          <span className="text-sm text-gray-500">(Systematic Withdrawal Plan)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Investment (₹)</label>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Enter initial corpus"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Withdrawal (₹)</label>
              <input
                type="number"
                value={monthlyWithdrawal}
                onChange={(e) => setMonthlyWithdrawal(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Enter monthly withdrawal"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Enter expected return"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Withdrawal Type</label>
              <select
                value={withdrawalType}
                onChange={(e) => setWithdrawalType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg bg-white"
              >
                <option value="fixed">Fixed Amount</option>
                <option value="inflation-adjusted">Inflation Adjusted</option>
              </select>
            </div>

            {withdrawalType === 'inflation-adjusted' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Annual Increase (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inflationAdjustment}
                  onChange={(e) => setInflationAdjustment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                  placeholder="Enter annual increase"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                placeholder="Enter inflation rate"
              />
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">SWP Benefits</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Regular income from investments</li>
                <li>• Tax-efficient withdrawal strategy</li>
                <li>• Flexibility to change withdrawal amount</li>
                <li>• Remaining corpus continues to grow</li>
                <li>• Ideal for retirement planning</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">SWP Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-red-700">Portfolio Life:</span>
                  <span className="text-2xl font-bold text-red-900">
                    {portfolioLife > 50 ? '50+ years' : `${portfolioLife.toFixed(1)} years`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Total Withdrawn:</span>
                  <span className="font-semibold text-red-800">
                    ₹{totalWithdrawn.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Remaining Amount:</span>
                  <span className="font-semibold text-red-800">
                    ₹{remainingAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Real Value (Today's terms):</span>
                  <span className="font-semibold text-red-800">
                    ₹{realWithdrawalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Withdrawal Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Initial Corpus:</span>
                  <span>₹{parseFloat(initialInvestment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Monthly Withdrawal:</span>
                  <span>₹{parseFloat(monthlyWithdrawal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Annual Withdrawal:</span>
                  <span>₹{(parseFloat(monthlyWithdrawal) * 12).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Withdrawal Rate:</span>
                  <span className="font-semibold">
                    {((parseFloat(monthlyWithdrawal) * 12 / parseFloat(initialInvestment)) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {withdrawalSchedule.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  Withdrawal Schedule {withdrawalType === 'inflation-adjusted' ? '(Inflation Adjusted)' : '(Fixed)'}
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {withdrawalSchedule.map((schedule) => (
                    <div key={schedule.year} className="flex justify-between text-sm">
                      <span className="text-green-700">Year {schedule.year}:</span>
                      <span className="font-semibold text-green-800">
                        ₹{schedule.monthlyWithdrawal.toLocaleString(undefined, {maximumFractionDigits: 0})}/month
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">SWP Guidelines</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Ideal withdrawal rate: 4-6% annually</li>
                <li>• Choose equity-oriented funds for long-term SWP</li>
                <li>• Review and adjust withdrawal amount periodically</li>
                <li>• Consider tax implications of withdrawals</li>
                <li>• Maintain emergency fund separately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;
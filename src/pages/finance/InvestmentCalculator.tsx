import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const InvestmentCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState('100000');
  const [monthlyContribution, setMonthlyContribution] = useState('5000');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [years, setYears] = useState('10');
  const [inflationRate, setInflationRate] = useState('6');
  
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [realValue, setRealValue] = useState(0);

  const calculateInvestment = () => {
    const P = parseFloat(initialAmount);
    const PMT = parseFloat(monthlyContribution);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(years) * 12;
    const inflation = parseFloat(inflationRate) / 100;

    if (P >= 0 && r >= 0 && n > 0) {
      // Future value of initial investment
      const FV_initial = P * Math.pow(1 + r, n);
      
      // Future value of monthly contributions
      const FV_payments = PMT > 0 ? PMT * (Math.pow(1 + r, n) - 1) / r : 0;
      
      const total = FV_initial + FV_payments;
      const contributions = P + (PMT * n);
      const gains = total - contributions;
      
      // Adjust for inflation
      const realValueCalc = total / Math.pow(1 + inflation, parseFloat(years));

      setFutureValue(total);
      setTotalContributions(contributions);
      setTotalGains(gains);
      setRealValue(realValueCalc);
    }
  };

  useEffect(() => {
    calculateInvestment();
  }, [initialAmount, monthlyContribution, annualReturn, years, inflationRate]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <TrendingUp className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Investment Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Investment (₹)</label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter initial amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution (₹)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter monthly contribution"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter expected return"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Investment Period (years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter number of years"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter inflation rate"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Investment Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Future Value:</span>
                  <span className="text-xl font-bold text-green-900">
                    ₹{futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Contributions:</span>
                  <span className="font-semibold text-green-800">
                    ₹{totalContributions.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Gains:</span>
                  <span className="font-semibold text-green-800">
                    ₹{totalGains.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Real Value (Inflation Adjusted):</span>
                  <span className="font-semibold text-green-800">
                    ₹{realValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Investment Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start investing early to benefit from compound growth</li>
                <li>• Diversify your portfolio across asset classes</li>
                <li>• Consider SIP for regular investments</li>
                <li>• Review and rebalance periodically</li>
                <li>• Stay invested for long-term goals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
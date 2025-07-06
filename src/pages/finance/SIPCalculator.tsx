import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [inflationRate, setInflationRate] = useState('6');
  
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [realValue, setRealValue] = useState(0);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;
    const inflation = parseFloat(inflationRate) / 100;

    if (P > 0 && r >= 0 && n > 0) {
      // SIP Future Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
      const futureValue = P * (Math.pow(1 + r, n) - 1) / r * (1 + r);
      const totalInvested = P * n;
      const wealth = futureValue - totalInvested;
      
      // Adjust for inflation
      const realValueCalc = futureValue / Math.pow(1 + inflation, parseFloat(timePeriod));

      setMaturityAmount(futureValue);
      setTotalInvestment(totalInvested);
      setWealthGained(wealth);
      setRealValue(realValueCalc);
    }
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod, inflationRate]);

  const getYearlyBreakdown = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const breakdown = [];
    
    for (let year = 1; year <= parseInt(timePeriod); year++) {
      const n = year * 12;
      const futureValue = P * (Math.pow(1 + r, n) - 1) / r * (1 + r);
      const invested = P * n;
      const returns = futureValue - invested;
      
      breakdown.push({
        year,
        invested,
        returns,
        total: futureValue
      });
    }
    
    return breakdown;
  };

  const yearlyData = getYearlyBreakdown();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">SIP Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Investment (₹)</label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter monthly SIP amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter expected return"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Investment Period (years)</label>
              <input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter time period"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter inflation rate"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">SIP Benefits</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Rupee cost averaging reduces market volatility impact</li>
                <li>• Power of compounding over long term</li>
                <li>• Disciplined investing habit</li>
                <li>• Flexibility to increase or pause investments</li>
                <li>• Tax benefits under Section 80C (ELSS funds)</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">SIP Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Investment:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{totalInvestment.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Wealth Gained:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{wealthGained.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Maturity Amount:</span>
                  <span className="text-2xl font-bold text-blue-900">
                    ₹{maturityAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Real Value (Inflation Adjusted):</span>
                  <span className="font-semibold text-blue-800">
                    ₹{realValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Investment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly SIP:</span>
                  <span>₹{parseFloat(monthlyInvestment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Investment Period:</span>
                  <span>{timePeriod} years ({parseInt(timePeriod) * 12} months)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Expected Return:</span>
                  <span>{parseFloat(expectedReturn).toFixed(1)}% per annum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Return Multiple:</span>
                  <span className="text-green-600 font-semibold">
                    {totalInvestment > 0 ? (maturityAmount / totalInvestment).toFixed(1) : 0}x
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Goal Planning</h3>
              <div className="space-y-3">
                <div className="text-sm text-purple-800">
                  <p><strong>For ₹1 Crore goal:</strong></p>
                  <p>Required monthly SIP: ₹{Math.round((10000000 / maturityAmount) * parseFloat(monthlyInvestment)).toLocaleString()}</p>
                </div>
                <div className="text-sm text-purple-800">
                  <p><strong>For ₹50 Lakh goal:</strong></p>
                  <p>Required monthly SIP: ₹{Math.round((5000000 / maturityAmount) * parseFloat(monthlyInvestment)).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown Table */}
        {yearlyData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-wise SIP Growth</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total Invested</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Returns Earned</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((data) => (
                    <tr key={data.year} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{data.year}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        ₹{data.invested.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right text-green-600">
                        ₹{data.returns.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                        ₹{data.total.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;
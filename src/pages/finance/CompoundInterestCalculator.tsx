import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator } from 'lucide-react';

const CompoundInterestCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState('100000');
  const [monthlyContribution, setMonthlyContribution] = useState('10000');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('10');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateCompoundInterest = () => {
    const P = parseFloat(initialAmount);
    const PMT = parseFloat(monthlyContribution);
    const r = parseFloat(interestRate) / 100;
    const n = parseFloat(compoundFrequency);
    const t = parseFloat(years);

    if (P >= 0 && r >= 0 && n > 0 && t > 0) {
      // Future value of initial investment
      const FV_initial = P * Math.pow(1 + r/n, n*t);
      
      // Future value of monthly contributions (ordinary annuity)
      const monthlyRate = r / 12;
      const totalMonths = t * 12;
      const FV_payments = PMT > 0 ? PMT * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate : 0;
      
      const total = FV_initial + FV_payments;
      const contributions = P + (PMT * totalMonths);
      const interest = total - contributions;

      setFinalAmount(total);
      setTotalContributions(contributions);
      setTotalInterest(interest);
    } else {
      setFinalAmount(0);
      setTotalContributions(0);
      setTotalInterest(0);
    }
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [initialAmount, monthlyContribution, interestRate, years, compoundFrequency]);

  const getYearlyBreakdown = () => {
    const breakdown = [];
    const P = parseFloat(initialAmount);
    const PMT = parseFloat(monthlyContribution);
    const r = parseFloat(interestRate) / 100;
    const monthlyRate = r / 12;
    
    let balance = P;
    
    for (let year = 1; year <= parseInt(years); year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + PMT;
      }
      breakdown.push({
        year,
        balance: balance,
        contributions: P + (PMT * 12 * year),
        interest: balance - (P + (PMT * 12 * year))
      });
    }
    
    return breakdown;
  };

  const yearlyData = getYearlyBreakdown();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <TrendingUp className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Compound Interest Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Investment (₹)</label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter initial amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution (₹)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter monthly contribution"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Investment Period (years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter number of years"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Compound Frequency</label>
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Final Amount:</span>
                  <span className="text-2xl font-bold text-purple-900">
                    ₹{finalAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Total Contributions:</span>
                  <span className="text-lg font-semibold text-purple-800">
                    ₹{totalContributions.toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">Total Interest Earned:</span>
                  <span className="text-lg font-semibold text-purple-800">
                    ₹{totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </span>
                </div>
              </div>
            </div>

            {/* Investment Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Initial Investment:</span>
                  <span>₹{parseFloat(initialAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Contributions:</span>
                  <span>₹{parseFloat(monthlyContribution).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Interest Rate:</span>
                  <span>{parseFloat(interestRate).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Investment Period:</span>
                  <span>{years} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Growth:</span>
                  <span className="text-green-600 font-semibold">
                    {totalContributions > 0 ? ((totalInterest / totalContributions) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Investment Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start investing early to maximize compound growth</li>
                <li>• Regular contributions significantly boost returns</li>
                <li>• Higher compound frequency increases returns</li>
                <li>• Time in market beats timing the market</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown Table */}
        {yearlyData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Growth</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total Balance</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Contributions</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((data) => (
                    <tr key={data.year} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{data.year}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                        ₹{data.balance.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        ₹{data.contributions.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right text-green-600">
                        ₹{data.interest.toLocaleString(undefined, {maximumFractionDigits: 0})}
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

export default CompoundInterestCalculator;
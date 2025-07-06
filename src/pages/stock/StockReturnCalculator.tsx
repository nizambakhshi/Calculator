import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart } from 'lucide-react';

const StockReturnCalculator: React.FC = () => {
  const [initialPrice, setInitialPrice] = useState('100');
  const [finalPrice, setFinalPrice] = useState('150');
  const [dividends, setDividends] = useState('5');
  const [shares, setShares] = useState('100');
  const [timePeriod, setTimePeriod] = useState('1');
  const [timeUnit, setTimeUnit] = useState('years');
  
  const [results, setResults] = useState({
    totalReturn: 0,
    totalReturnPercent: 0,
    annualizedReturn: 0,
    capitalGain: 0,
    capitalGainPercent: 0,
    dividendYield: 0,
    totalValue: 0,
    profit: 0
  });

  const calculateStockReturn = () => {
    const initial = parseFloat(initialPrice);
    const final = parseFloat(finalPrice);
    const div = parseFloat(dividends);
    const numShares = parseFloat(shares);
    const time = parseFloat(timePeriod);

    if (initial > 0 && final > 0 && numShares > 0 && time > 0) {
      // Convert time to years
      let timeInYears = time;
      if (timeUnit === 'months') {
        timeInYears = time / 12;
      } else if (timeUnit === 'days') {
        timeInYears = time / 365;
      }

      // Calculate returns
      const capitalGain = final - initial;
      const capitalGainPercent = (capitalGain / initial) * 100;
      const dividendYield = (div / initial) * 100;
      
      const totalReturnPerShare = capitalGain + div;
      const totalReturnPercent = (totalReturnPerShare / initial) * 100;
      
      // Annualized return
      const annualizedReturn = timeInYears > 0 ? 
        (Math.pow((final + div) / initial, 1 / timeInYears) - 1) * 100 : 0;

      // Portfolio values
      const initialInvestment = initial * numShares;
      const finalValue = final * numShares;
      const totalDividends = div * numShares;
      const totalValue = finalValue + totalDividends;
      const profit = totalValue - initialInvestment;

      setResults({
        totalReturn: totalReturnPerShare,
        totalReturnPercent,
        annualizedReturn,
        capitalGain,
        capitalGainPercent,
        dividendYield,
        totalValue,
        profit
      });
    }
  };

  useEffect(() => {
    calculateStockReturn();
  }, [initialPrice, finalPrice, dividends, shares, timePeriod, timeUnit]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <BarChart className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Stock Return Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Stock Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={initialPrice}
                onChange={(e) => setInitialPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter initial price"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Final Stock Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter final price"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Dividends per Share (₹)</label>
              <input
                type="number"
                step="0.01"
                value={dividends}
                onChange={(e) => setDividends(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter dividends received"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter number of shares"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Holding Period</label>
                <input
                  type="number"
                  step="0.1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Time period"
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
              <h3 className="text-lg font-semibold text-green-900 mb-4">Return Analysis</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    {results.totalReturnPercent.toFixed(2)}%
                  </div>
                  <div className="text-green-700">Total Return</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Annualized Return:</span>
                  <span className="font-semibold text-green-800">{results.annualizedReturn.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Capital Gain:</span>
                  <span className="font-semibold text-green-800">{results.capitalGainPercent.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Dividend Yield:</span>
                  <span className="font-semibold text-green-800">{results.dividendYield.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Portfolio Value</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Initial Investment:</span>
                  <span className="font-semibold text-blue-800">₹{(parseFloat(initialPrice) * parseFloat(shares)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Final Value:</span>
                  <span className="font-semibold text-blue-800">₹{results.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Profit/Loss:</span>
                  <span className={`font-semibold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{results.profit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Per Share Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-700">Capital Gain per Share:</span>
                  <span className="font-semibold text-purple-800">₹{results.capitalGain.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Dividends per Share:</span>
                  <span className="font-semibold text-purple-800">₹{parseFloat(dividends).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Total Return per Share:</span>
                  <span className="font-semibold text-purple-800">₹{results.totalReturn.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Investment Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Consider both capital gains and dividends</li>
                <li>• Compare returns to market benchmarks</li>
                <li>• Factor in taxes and transaction costs</li>
                <li>• Diversify your portfolio across sectors</li>
                <li>• Review performance regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockReturnCalculator;
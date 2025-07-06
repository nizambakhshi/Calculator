import React, { useState, useEffect } from 'react';
import { PiggyBank, Target } from 'lucide-react';

const SavingsCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState('1000000');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('10000');
  const [interestRate, setInterestRate] = useState('8');
  const [timeFrame, setTimeFrame] = useState('5');
  
  const [timeToGoal, setTimeToGoal] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [monthlyRequired, setMonthlyRequired] = useState(0);

  const calculateSavings = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyDeposit);
    const rate = parseFloat(interestRate) / 100 / 12;
    const years = parseFloat(timeFrame);
    const months = years * 12;

    if (goal > 0 && rate >= 0) {
      // Calculate future value with current inputs
      const futureCurrentSavings = current * Math.pow(1 + rate, months);
      const futureMonthlyDeposits = monthly > 0 ? monthly * (Math.pow(1 + rate, months) - 1) / rate : 0;
      const totalFutureValue = futureCurrentSavings + futureMonthlyDeposits;
      
      setFutureValue(totalFutureValue);

      // Calculate time to reach goal with current monthly deposits
      if (monthly > 0 && rate > 0) {
        const remainingAmount = goal - current;
        if (remainingAmount > 0) {
          const timeInMonths = Math.log(1 + (remainingAmount * rate) / monthly) / Math.log(1 + rate);
          setTimeToGoal(timeInMonths / 12);
        } else {
          setTimeToGoal(0);
        }
      }

      // Calculate required monthly deposit to reach goal in specified time
      if (months > 0 && rate > 0) {
        const futureValueOfCurrent = current * Math.pow(1 + rate, months);
        const remainingNeeded = goal - futureValueOfCurrent;
        if (remainingNeeded > 0) {
          const requiredMonthly = (remainingNeeded * rate) / (Math.pow(1 + rate, months) - 1);
          setMonthlyRequired(requiredMonthly);
        } else {
          setMonthlyRequired(0);
        }
      }
    }
  };

  useEffect(() => {
    calculateSavings();
  }, [goalAmount, currentSavings, monthlyDeposit, interestRate, timeFrame]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <PiggyBank className="h-8 w-8 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Savings Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Savings Goal (₹)</label>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="Enter your savings goal"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Savings (₹)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="Enter current savings"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Deposit (₹)</label>
              <input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="Enter monthly deposit"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time Frame (years)</label>
              <input
                type="number"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="Enter time frame"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-pink-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-pink-900 mb-4">Savings Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-pink-700">Future Value:</span>
                  <span className="text-xl font-bold text-pink-900">
                    ₹{futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-700">Time to Goal:</span>
                  <span className="font-semibold text-pink-800">
                    {timeToGoal > 0 ? `${timeToGoal.toFixed(1)} years` : 'Goal already reached'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-700">Required Monthly Deposit:</span>
                  <span className="font-semibold text-pink-800">
                    ₹{monthlyRequired.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Goal Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Goal Amount:</span>
                  <span className="font-semibold">₹{parseFloat(goalAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Current Progress:</span>
                  <span className="font-semibold">
                    {((parseFloat(currentSavings) / parseFloat(goalAmount)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (parseFloat(currentSavings) / parseFloat(goalAmount)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Savings Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Set up automatic transfers to savings</li>
                <li>• Track your expenses and cut unnecessary costs</li>
                <li>• Consider high-yield savings accounts</li>
                <li>• Review and adjust goals regularly</li>
                <li>• Start with small amounts and increase gradually</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
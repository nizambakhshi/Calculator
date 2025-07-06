import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('60');
  const [currentSavings, setCurrentSavings] = useState('500000');
  const [monthlyContribution, setMonthlyContribution] = useState('15000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [inflationRate, setInflationRate] = useState('6');
  const [retirementIncome, setRetirementIncome] = useState('50000');
  
  const [retirementCorpus, setRetirementCorpus] = useState(0);
  const [monthlyIncomeGenerated, setMonthlyIncomeGenerated] = useState(0);
  const [shortfall, setShortfall] = useState(0);
  const [requiredMonthly, setRequiredMonthly] = useState(0);

  const calculateRetirement = () => {
    const currentAgeNum = parseFloat(currentAge);
    const retirementAgeNum = parseFloat(retirementAge);
    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const monthsToRetirement = yearsToRetirement * 12;
    
    const currentSavingsNum = parseFloat(currentSavings);
    const monthlyContributionNum = parseFloat(monthlyContribution);
    const annualReturn = parseFloat(expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const inflation = parseFloat(inflationRate) / 100;
    const desiredIncome = parseFloat(retirementIncome);

    if (yearsToRetirement <= 0) return;

    // Calculate retirement corpus
    const futureValueCurrentSavings = currentSavingsNum * Math.pow(1 + monthlyReturn, monthsToRetirement);
    const futureValueContributions = monthlyContributionNum > 0 ? 
      monthlyContributionNum * (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn : 0;
    
    const totalCorpus = futureValueCurrentSavings + futureValueContributions;
    setRetirementCorpus(totalCorpus);

    // Calculate monthly income that can be generated (assuming 4% withdrawal rate)
    const withdrawalRate = 0.04 / 12; // 4% annually = 0.33% monthly
    const monthlyIncome = totalCorpus * withdrawalRate;
    setMonthlyIncomeGenerated(monthlyIncome);

    // Adjust desired income for inflation
    const inflationAdjustedIncome = desiredIncome * Math.pow(1 + inflation, yearsToRetirement);
    
    // Calculate shortfall
    const incomeShortfall = Math.max(0, inflationAdjustedIncome - monthlyIncome);
    setShortfall(incomeShortfall);

    // Calculate required monthly contribution to meet goal
    if (incomeShortfall > 0) {
      const requiredCorpus = inflationAdjustedIncome / withdrawalRate;
      const requiredFromContributions = requiredCorpus - futureValueCurrentSavings;
      if (requiredFromContributions > 0 && monthsToRetirement > 0) {
        const requiredMonthlyContribution = (requiredFromContributions * monthlyReturn) / 
          (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1);
        setRequiredMonthly(requiredMonthlyContribution);
      } else {
        setRequiredMonthly(0);
      }
    } else {
      setRequiredMonthly(0);
    }
  };

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate, retirementIncome]);

  const yearsToRetirement = parseFloat(retirementAge) - parseFloat(currentAge);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Users className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Retirement Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Age</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Age"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Retirement age"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Retirement Savings (₹)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Current savings"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution (₹)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Monthly contribution"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Expected return"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Inflation rate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Desired Monthly Income in Retirement (₹)</label>
              <input
                type="number"
                value={retirementIncome}
                onChange={(e) => setRetirementIncome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Desired monthly income"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Retirement Projection</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-700">Years to Retirement:</span>
                  <span className="font-bold text-purple-900">{yearsToRetirement} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Retirement Corpus:</span>
                  <span className="text-xl font-bold text-purple-900">
                    ₹{retirementCorpus.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Monthly Income Generated:</span>
                  <span className="font-semibold text-purple-800">
                    ₹{monthlyIncomeGenerated.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            {shortfall > 0 ? (
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Income Shortfall</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-red-700">Monthly Shortfall:</span>
                    <span className="font-bold text-red-900">
                      ₹{shortfall.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Required Monthly Contribution:</span>
                    <span className="font-semibold text-red-800">
                      ₹{requiredMonthly.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Retirement Goal Status</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-green-800 font-semibold">
                    You're on track to meet your retirement income goal!
                  </p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Retirement Planning Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start saving early to benefit from compound growth</li>
                <li>• Maximize employer PF contributions</li>
                <li>• Consider tax-saving retirement accounts (PPF, ELSS)</li>
                <li>• Diversify your retirement portfolio</li>
                <li>• Review and adjust your plan annually</li>
                <li>• Plan for healthcare costs in retirement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
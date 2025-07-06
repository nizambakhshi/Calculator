import React, { useState, useEffect } from 'react';
import { PiggyBank, Target } from 'lucide-react';

const RetirementPlannerCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('60');
  const [currentSalary, setCurrentSalary] = useState('1000000');
  const [currentSavings, setCurrentSavings] = useState('500000');
  const [monthlyContribution, setMonthlyContribution] = useState('25000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [inflationRate, setInflationRate] = useState('6');
  const [retirementExpenses, setRetirementExpenses] = useState('70');
  const [lifeExpectancy, setLifeExpectancy] = useState('80');
  
  const [results, setResults] = useState({
    yearsToRetirement: 0,
    retirementCorpus: 0,
    monthlyIncomeNeeded: 0,
    monthlyIncomeGenerated: 0,
    shortfall: 0,
    requiredMonthlyContribution: 0,
    corpusAtRetirement: 0
  });

  const calculateRetirementPlan = () => {
    const currentAgeNum = parseFloat(currentAge);
    const retirementAgeNum = parseFloat(retirementAge);
    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const yearsInRetirement = parseFloat(lifeExpectancy) - retirementAgeNum;
    
    const currentSalaryNum = parseFloat(currentSalary);
    const currentSavingsNum = parseFloat(currentSavings);
    const monthlyContributionNum = parseFloat(monthlyContribution);
    const annualReturn = parseFloat(expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const inflation = parseFloat(inflationRate) / 100;
    const expenseRatio = parseFloat(retirementExpenses) / 100;

    if (yearsToRetirement <= 0) return;

    // Calculate future salary at retirement (adjusted for inflation)
    const salaryAtRetirement = currentSalaryNum * Math.pow(1 + inflation, yearsToRetirement);
    const monthlyIncomeNeeded = (salaryAtRetirement * expenseRatio) / 12;

    // Calculate corpus needed for retirement
    const monthlyInflationAdjustedReturn = (annualReturn - inflation) / 12;
    const monthsInRetirement = yearsInRetirement * 12;
    
    let corpusNeeded = 0;
    if (monthlyInflationAdjustedReturn > 0) {
      corpusNeeded = monthlyIncomeNeeded * (1 - Math.pow(1 + monthlyInflationAdjustedReturn, -monthsInRetirement)) / monthlyInflationAdjustedReturn;
    } else {
      corpusNeeded = monthlyIncomeNeeded * monthsInRetirement;
    }

    // Calculate projected corpus at retirement
    const monthsToRetirement = yearsToRetirement * 12;
    const futureValueCurrentSavings = currentSavingsNum * Math.pow(1 + monthlyReturn, monthsToRetirement);
    const futureValueContributions = monthlyContributionNum > 0 ? 
      monthlyContributionNum * (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn : 0;
    
    const totalCorpusAtRetirement = futureValueCurrentSavings + futureValueContributions;

    // Calculate shortfall and required contribution
    const shortfall = Math.max(0, corpusNeeded - totalCorpusAtRetirement);
    let requiredMonthlyContribution = 0;
    
    if (shortfall > 0 && monthsToRetirement > 0) {
      const additionalCorpusNeeded = shortfall - futureValueCurrentSavings;
      if (additionalCorpusNeeded > 0) {
        requiredMonthlyContribution = (additionalCorpusNeeded * monthlyReturn) / 
          (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1);
      }
    }

    // Monthly income that can be generated from corpus
    const monthlyIncomeGenerated = totalCorpusAtRetirement * monthlyInflationAdjustedReturn;

    setResults({
      yearsToRetirement,
      retirementCorpus: corpusNeeded,
      monthlyIncomeNeeded,
      monthlyIncomeGenerated,
      shortfall,
      requiredMonthlyContribution: requiredMonthlyContribution + monthlyContributionNum,
      corpusAtRetirement: totalCorpusAtRetirement
    });
  };

  useEffect(() => {
    calculateRetirementPlan();
  }, [currentAge, retirementAge, currentSalary, currentSavings, monthlyContribution, 
      expectedReturn, inflationRate, retirementExpenses, lifeExpectancy]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Target className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Retirement Planner</h1>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Age"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Retirement age"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Annual Salary (₹)</label>
              <input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Current salary"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Retirement Savings (₹)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Current savings"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution (₹)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Monthly contribution"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expected Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Inflation rate"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Retirement Expenses (% of salary)</label>
                <input
                  type="number"
                  value={retirementExpenses}
                  onChange={(e) => setRetirementExpenses(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Expense ratio"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Life Expectancy</label>
                <input
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Life expectancy"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Retirement Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Years to Retirement:</span>
                  <span className="font-bold text-blue-900">{results.yearsToRetirement} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Corpus Needed:</span>
                  <span className="font-bold text-blue-900">₹{results.retirementCorpus.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Projected Corpus:</span>
                  <span className="font-bold text-blue-900">₹{results.corpusAtRetirement.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Monthly Income Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Income Needed:</span>
                  <span className="font-bold text-green-900">₹{results.monthlyIncomeNeeded.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Income Generated:</span>
                  <span className="font-bold text-green-900">₹{results.monthlyIncomeGenerated.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                {results.shortfall > 0 && (
                  <div className="flex justify-between">
                    <span className="text-red-700">Shortfall:</span>
                    <span className="font-bold text-red-900">₹{results.shortfall.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                )}
              </div>
            </div>

            {results.shortfall > 0 ? (
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Action Required</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-900 mb-2">
                      ₹{results.requiredMonthlyContribution.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                    <div className="text-red-700">required monthly contribution</div>
                  </div>
                  <div className="text-sm text-red-800">
                    You need to increase your monthly contribution to meet your retirement goals.
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Retirement Goal Status</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-green-800 font-semibold">
                    You're on track to meet your retirement goals!
                  </p>
                </div>
              </div>
            )}

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Retirement Tips</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Start saving early to benefit from compounding</li>
                <li>• Increase contributions with salary raises</li>
                <li>• Diversify your retirement portfolio</li>
                <li>• Consider tax-advantaged accounts</li>
                <li>• Plan for healthcare costs in retirement</li>
                <li>• Review and adjust your plan annually</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlannerCalculator;
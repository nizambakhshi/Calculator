import React, { useState, useEffect } from 'react';
import { BarChart3, DollarSign } from 'lucide-react';

const LoanComparisonCalculator: React.FC = () => {
  const [loan1Amount, setLoan1Amount] = useState('500000');
  const [loan1Rate, setLoan1Rate] = useState('8.5');
  const [loan1Term, setLoan1Term] = useState('20');
  const [loan1Fees, setLoan1Fees] = useState('10000');
  
  const [loan2Amount, setLoan2Amount] = useState('500000');
  const [loan2Rate, setLoan2Rate] = useState('9.0');
  const [loan2Term, setLoan2Term] = useState('15');
  const [loan2Fees, setLoan2Fees] = useState('5000');

  const [comparison, setComparison] = useState({
    loan1: { monthly: 0, total: 0, interest: 0, totalCost: 0 },
    loan2: { monthly: 0, total: 0, interest: 0, totalCost: 0 },
    savings: 0,
    betterOption: ''
  });

  const calculateLoan = (principal: number, rate: number, years: number, fees: number) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - principal;
    const totalCost = totalPayments + fees;
    
    return {
      monthly: monthlyPayment,
      total: totalPayments,
      interest: totalInterest,
      totalCost: totalCost
    };
  };

  const compareLoans = () => {
    const loan1 = calculateLoan(
      parseFloat(loan1Amount),
      parseFloat(loan1Rate),
      parseFloat(loan1Term),
      parseFloat(loan1Fees)
    );
    
    const loan2 = calculateLoan(
      parseFloat(loan2Amount),
      parseFloat(loan2Rate),
      parseFloat(loan2Term),
      parseFloat(loan2Fees)
    );
    
    const savings = Math.abs(loan1.totalCost - loan2.totalCost);
    const betterOption = loan1.totalCost < loan2.totalCost ? 'Loan 1' : 'Loan 2';
    
    setComparison({
      loan1,
      loan2,
      savings,
      betterOption
    });
  };

  useEffect(() => {
    compareLoans();
  }, [loan1Amount, loan1Rate, loan1Term, loan1Fees, loan2Amount, loan2Rate, loan2Term, loan2Fees]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Loan Comparison Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loan 1 Inputs */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Loan Option 1</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loan1Amount}
                    onChange={(e) => setLoan1Amount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Loan amount"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={loan1Rate}
                    onChange={(e) => setLoan1Rate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Interest rate"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
                  <input
                    type="number"
                    value={loan1Term}
                    onChange={(e) => setLoan1Term(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Loan term"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Fees & Charges (₹)</label>
                  <input
                    type="number"
                    value={loan1Fees}
                    onChange={(e) => setLoan1Fees(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Processing fees"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">Loan 1 Results</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span className="font-semibold">₹{comparison.loan1.monthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-semibold">₹{comparison.loan1.interest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span className="font-semibold">₹{comparison.loan1.totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loan 2 Inputs */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Loan Option 2</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loan2Amount}
                    onChange={(e) => setLoan2Amount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Loan amount"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={loan2Rate}
                    onChange={(e) => setLoan2Rate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Interest rate"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
                  <input
                    type="number"
                    value={loan2Term}
                    onChange={(e) => setLoan2Term(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Loan term"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Fees & Charges (₹)</label>
                  <input
                    type="number"
                    value={loan2Fees}
                    onChange={(e) => setLoan2Fees(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Processing fees"
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">Loan 2 Results</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span className="font-semibold">₹{comparison.loan2.monthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-semibold">₹{comparison.loan2.interest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span className="font-semibold">₹{comparison.loan2.totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Results */}
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Comparison Results</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900 mb-2">
                    {comparison.betterOption}
                  </div>
                  <div className="text-purple-700">is the better option</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Potential Savings:</span>
                    <span className="text-xl font-bold text-purple-900">
                      ₹{comparison.savings.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Side-by-Side Comparison</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-700 border-b pb-2">
                  <span></span>
                  <span className="text-center">Loan 1</span>
                  <span className="text-center">Loan 2</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-700">Monthly Payment:</span>
                  <span className="text-center font-semibold">₹{comparison.loan1.monthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  <span className="text-center font-semibold">₹{comparison.loan2.monthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-700">Total Interest:</span>
                  <span className="text-center font-semibold">₹{comparison.loan1.interest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  <span className="text-center font-semibold">₹{comparison.loan2.interest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-700">Total Cost:</span>
                  <span className="text-center font-semibold">₹{comparison.loan1.totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  <span className="text-center font-semibold">₹{comparison.loan2.totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Comparison Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Consider all fees and charges</li>
                <li>• Compare APR, not just interest rates</li>
                <li>• Factor in prepayment penalties</li>
                <li>• Consider loan flexibility and features</li>
                <li>• Check lender reputation and service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanComparisonCalculator;
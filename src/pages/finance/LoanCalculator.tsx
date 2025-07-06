import React, { useState, useEffect } from 'react';
import { DollarSign, Calculator } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('10000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('60');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm);

    if (principal > 0 && monthlyRate > 0 && numPayments > 0) {
      const monthlyPaymentCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const totalPaymentCalc = monthlyPaymentCalc * numPayments;
      const totalInterestCalc = totalPaymentCalc - principal;

      setMonthlyPayment(monthlyPaymentCalc);
      setTotalPayment(totalPaymentCalc);
      setTotalInterest(totalInterestCalc);
    } else {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <DollarSign className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Loan Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter loan amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Loan Term (months)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter loan term"
              />
            </div>

            <button
              onClick={calculateLoan}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate</span>
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Monthly Payment:</span>
                  <span className="text-xl font-bold text-green-900">
                    ₹{monthlyPayment.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Total Interest:</span>
                  <span className="text-lg font-semibold text-green-800">
                    ₹{totalInterest.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Total Payment:</span>
                  <span className="text-lg font-semibold text-green-800">
                    ₹{totalPayment.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Principal Amount:</span>
                  <span>₹{parseFloat(loanAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span>{parseFloat(interestRate).toFixed(2)}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Term:</span>
                  <span>{loanTerm} months ({(parseFloat(loanTerm) / 12).toFixed(1)} years)</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Lower interest rates mean lower monthly payments</li>
                <li>• Shorter loan terms have higher payments but less total interest</li>
                <li>• Making extra payments can significantly reduce total interest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
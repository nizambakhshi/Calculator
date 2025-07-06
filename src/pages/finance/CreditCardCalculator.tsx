import React, { useState, useEffect } from 'react';
import { CreditCard, AlertTriangle } from 'lucide-react';

const CreditCardCalculator: React.FC = () => {
  const [balance, setBalance] = useState('50000');
  const [interestRate, setInterestRate] = useState('36');
  const [monthlyPayment, setMonthlyPayment] = useState('5000');
  const [paymentType, setPaymentType] = useState('fixed');
  const [minimumPercent, setMinimumPercent] = useState('3');
  
  const [payoffTime, setPayoffTime] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [minimumPayment, setMinimumPayment] = useState(0);

  const calculatePayoff = () => {
    const bal = parseFloat(balance);
    const rate = parseFloat(interestRate) / 100 / 12;
    let payment = parseFloat(monthlyPayment);
    const minPercent = parseFloat(minimumPercent) / 100;

    if (bal <= 0 || rate < 0) return;

    // Calculate minimum payment
    const minPay = Math.max(bal * minPercent, 500); // Minimum ₹500 or 3% of balance
    setMinimumPayment(minPay);

    if (paymentType === 'minimum') {
      payment = minPay;
    }

    if (payment <= bal * rate) {
      // Payment is less than interest - debt will never be paid off
      setPayoffTime(Infinity);
      setTotalInterest(Infinity);
      setTotalPayment(Infinity);
      return;
    }

    let currentBalance = bal;
    let months = 0;
    let totalInterestPaid = 0;

    while (currentBalance > 0.01 && months < 600) { // Max 50 years
      const interestPayment = currentBalance * rate;
      const principalPayment = Math.min(payment - interestPayment, currentBalance);
      
      currentBalance -= principalPayment;
      totalInterestPaid += interestPayment;
      months++;

      // For minimum payment, recalculate payment each month
      if (paymentType === 'minimum') {
        payment = Math.max(currentBalance * minPercent, 500);
      }
    }

    setPayoffTime(months);
    setTotalInterest(totalInterestPaid);
    setTotalPayment(bal + totalInterestPaid);
  };

  useEffect(() => {
    calculatePayoff();
  }, [balance, interestRate, monthlyPayment, paymentType, minimumPercent]);

  const formatTime = (months: number) => {
    if (months === Infinity || months > 600) return 'Never (payment too low)';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${months} months`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <CreditCard className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Credit Card Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Balance (₹)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter current balance"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Payment Strategy</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
              >
                <option value="fixed">Fixed Monthly Payment</option>
                <option value="minimum">Minimum Payment Only</option>
              </select>
            </div>

            {paymentType === 'fixed' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Monthly Payment (₹)</label>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter monthly payment"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Minimum Payment (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={minimumPercent}
                  onChange={(e) => setMinimumPercent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter minimum payment percentage"
                />
              </div>
            )}

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Minimum Payment: ₹{minimumPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                  <p>Paying only the minimum will result in much higher total interest.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Payoff Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Time to Pay Off:</span>
                  <span className="font-bold text-blue-900">
                    {formatTime(payoffTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Interest:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{totalInterest === Infinity ? '∞' : totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Payment:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{totalPayment === Infinity ? '∞' : totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Cost Comparison</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-red-700">Original Balance:</span>
                  <span>₹{parseFloat(balance).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Interest Cost:</span>
                  <span className="font-semibold text-red-800">
                    {totalInterest === Infinity ? '∞' : `${((totalInterest / parseFloat(balance)) * 100).toFixed(1)}%`}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Debt Reduction Tips</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Pay more than the minimum payment</li>
                <li>• Focus on highest interest rate cards first</li>
                <li>• Consider balance transfer to lower rate</li>
                <li>• Stop using the card for new purchases</li>
                <li>• Create a budget to free up more money for payments</li>
                <li>• Consider debt consolidation options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardCalculator;
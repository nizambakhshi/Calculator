import React, { useState, useEffect } from 'react';
import { Home, Calculator } from 'lucide-react';

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState('3000000');
  const [downPayment, setDownPayment] = useState('600000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('30000');
  const [insurance, setInsurance] = useState('12000');
  const [pmi, setPmi] = useState('2000');
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalAndInterest, setPrincipalAndInterest] = useState(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    const monthlyTax = parseFloat(propertyTax) / 12;
    const monthlyInsurance = parseFloat(insurance) / 12;
    const monthlyPmi = parseFloat(pmi) / 12;

    if (principal > 0 && monthlyRate > 0 && numPayments > 0) {
      const monthlyPI = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPmi;

      setPrincipalAndInterest(monthlyPI);
      setMonthlyPayment(monthlyPI);
      setTotalMonthlyPayment(totalMonthly);
    } else {
      setPrincipalAndInterest(0);
      setMonthlyPayment(0);
      setTotalMonthlyPayment(0);
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, pmi]);

  const downPaymentPercent = ((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1);
  const loanAmount = parseFloat(homePrice) - parseFloat(downPayment);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Home className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Mortgage Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Home Price (₹)</label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter home price"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Down Payment (₹) - {downPaymentPercent}%
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter down payment"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
              >
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900">Additional Monthly Costs</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Property Tax (annual)</label>
                <input
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Annual property tax"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Home Insurance (annual)</label>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Annual insurance"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">PMI (monthly)</label>
                <input
                  type="number"
                  value={pmi}
                  onChange={(e) => setPmi(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Monthly PMI"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Monthly Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Principal & Interest:</span>
                  <span className="text-xl font-bold text-blue-900">
                    ₹{principalAndInterest.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Property Tax:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{(parseFloat(propertyTax) / 12).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Insurance:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{(parseFloat(insurance) / 12).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">PMI:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{(parseFloat(pmi) / 12).toFixed(2)}
                  </span>
                </div>
                <hr className="border-blue-200" />
                <div className="flex justify-between items-center">
                  <span className="text-blue-700 font-semibold">Total Monthly Payment:</span>
                  <span className="text-2xl font-bold text-blue-900">
                    ₹{totalMonthlyPayment.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Home Price:</span>
                  <span>₹{parseFloat(homePrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment:</span>
                  <span>₹{parseFloat(downPayment).toLocaleString()} ({downPaymentPercent}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span>₹{loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span>{parseFloat(interestRate).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Term:</span>
                  <span>{loanTerm} years</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Money-Saving Tips</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 20% down payment eliminates PMI</li>
                <li>• Shorter loan terms have lower total interest</li>
                <li>• Shop around for the best interest rates</li>
                <li>• Consider making extra principal payments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
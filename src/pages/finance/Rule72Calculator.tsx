import React, { useState, useEffect } from 'react';
import { Clock, Calculator } from 'lucide-react';

const Rule72Calculator: React.FC = () => {
  const [interestRate, setInterestRate] = useState('8');
  const [initialAmount, setInitialAmount] = useState('100000');
  const [targetMultiple, setTargetMultiple] = useState('2');
  const [calculationType, setCalculationType] = useState('time');
  
  const [doublingTime, setDoublingTime] = useState(0);
  const [requiredRate, setRequiredRate] = useState(0);
  const [futureValue, setFutureValue] = useState(0);

  const calculateRule72 = () => {
    const rate = parseFloat(interestRate);
    const amount = parseFloat(initialAmount);
    const multiple = parseFloat(targetMultiple);

    if (calculationType === 'time' && rate > 0) {
      const time = 72 / rate;
      setDoublingTime(time);
      setFutureValue(amount * Math.pow(2, 1));
    } else if (calculationType === 'rate' && doublingTime > 0) {
      const requiredRateCalc = 72 / parseFloat(doublingTime.toString());
      setRequiredRate(requiredRateCalc);
    } else if (calculationType === 'multiple' && rate > 0) {
      const timeForMultiple = (Math.log(multiple) / Math.log(2)) * (72 / rate);
      setDoublingTime(timeForMultiple);
      setFutureValue(amount * multiple);
    }
  };

  useEffect(() => {
    calculateRule72();
  }, [interestRate, initialAmount, targetMultiple, calculationType, doublingTime]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Clock className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Rule of 72 Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Calculation Type</label>
              <select
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="time">Calculate Time to Double</option>
                <option value="rate">Calculate Required Rate</option>
                <option value="multiple">Calculate Time for Multiple</option>
              </select>
            </div>

            {calculationType === 'time' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter interest rate"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Initial Amount (₹)</label>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter initial amount"
                  />
                </div>
              </>
            )}

            {calculationType === 'rate' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Desired Doubling Time (years)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={doublingTime}
                    onChange={(e) => setDoublingTime(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter years to double"
                  />
                </div>
              </>
            )}

            {calculationType === 'multiple' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter interest rate"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Target Multiple</label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetMultiple}
                    onChange={(e) => setTargetMultiple(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter target multiple"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Initial Amount (₹)</label>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    placeholder="Enter initial amount"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Rule of 72 Results</h3>
              <div className="space-y-3">
                {calculationType === 'time' && (
                  <>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-900 mb-2">
                        {doublingTime.toFixed(1)} years
                      </div>
                      <div className="text-purple-700">to double your money</div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Initial Amount:</span>
                      <span className="font-semibold text-purple-800">₹{parseFloat(initialAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Doubled Amount:</span>
                      <span className="font-semibold text-purple-800">₹{(parseFloat(initialAmount) * 2).toLocaleString()}</span>
                    </div>
                  </>
                )}

                {calculationType === 'rate' && (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-900 mb-2">
                      {requiredRate.toFixed(2)}%
                    </div>
                    <div className="text-purple-700">required annual return</div>
                  </div>
                )}

                {calculationType === 'multiple' && (
                  <>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-900 mb-2">
                        {doublingTime.toFixed(1)} years
                      </div>
                      <div className="text-purple-700">to reach {targetMultiple}x</div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Target Value:</span>
                      <span className="font-semibold text-purple-800">₹{futureValue.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">About Rule of 72</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>The Rule of 72 is a quick way to estimate how long it takes for an investment to double.</p>
                <p><strong>Formula:</strong> Years to double = 72 ÷ Interest Rate</p>
                <p>This rule works best for interest rates between 6% and 10%.</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Quick Reference</h4>
              <div className="text-sm text-green-800 space-y-1">
                <div className="flex justify-between">
                  <span>6% return:</span>
                  <span>12 years to double</span>
                </div>
                <div className="flex justify-between">
                  <span>8% return:</span>
                  <span>9 years to double</span>
                </div>
                <div className="flex justify-between">
                  <span>10% return:</span>
                  <span>7.2 years to double</span>
                </div>
                <div className="flex justify-between">
                  <span>12% return:</span>
                  <span>6 years to double</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule72Calculator;
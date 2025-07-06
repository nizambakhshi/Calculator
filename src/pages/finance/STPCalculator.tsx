import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp } from 'lucide-react';

const STPCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState('1000000');
  const [transferAmount, setTransferAmount] = useState('25000');
  const [transferFrequency, setTransferFrequency] = useState('monthly');
  const [sourceReturn, setSourceReturn] = useState('6');
  const [targetReturn, setTargetReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('24');
  
  const [sourceBalance, setSourceBalance] = useState(0);
  const [targetBalance, setTargetBalance] = useState(0);
  const [totalTransferred, setTotalTransferred] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [lumpSumComparison, setLumpSumComparison] = useState(0);

  const calculateSTP = () => {
    const initial = parseFloat(initialInvestment);
    const transfer = parseFloat(transferAmount);
    const sourceRate = parseFloat(sourceReturn) / 100;
    const targetRate = parseFloat(targetReturn) / 100;
    const months = parseFloat(timePeriod);

    if (initial <= 0 || transfer <= 0 || months <= 0) return;

    // Calculate frequency multiplier
    const frequencyMultiplier = transferFrequency === 'monthly' ? 1 : 
                               transferFrequency === 'quarterly' ? 3 : 12;
    
    const monthlySourceRate = sourceRate / 12;
    const monthlyTargetRate = targetRate / 12;
    const transfersPerMonth = 1 / frequencyMultiplier;
    
    let sourceAmount = initial;
    let targetAmount = 0;
    let totalTransferredAmount = 0;
    
    for (let month = 1; month <= months; month++) {
      // Apply returns to both funds
      sourceAmount = sourceAmount * (1 + monthlySourceRate);
      targetAmount = targetAmount * (1 + monthlyTargetRate);
      
      // Transfer money if it's the right frequency
      if (month % frequencyMultiplier === 0) {
        const actualTransfer = Math.min(transfer, sourceAmount);
        sourceAmount -= actualTransfer;
        targetAmount += actualTransfer;
        totalTransferredAmount += actualTransfer;
      }
    }

    // Calculate lump sum investment in target fund for comparison
    const lumpSumValue = initial * Math.pow(1 + monthlyTargetRate, months);

    setSourceBalance(sourceAmount);
    setTargetBalance(targetAmount);
    setTotalTransferred(totalTransferredAmount);
    setTotalValue(sourceAmount + targetAmount);
    setLumpSumComparison(lumpSumValue);
  };

  useEffect(() => {
    calculateSTP();
  }, [initialInvestment, transferAmount, transferFrequency, sourceReturn, targetReturn, timePeriod]);

  const getTransferSchedule = () => {
    const transfer = parseFloat(transferAmount);
    const frequencyMultiplier = transferFrequency === 'monthly' ? 1 : 
                               transferFrequency === 'quarterly' ? 3 : 12;
    const schedule = [];
    
    for (let i = 1; i <= Math.min(12, parseFloat(timePeriod) / frequencyMultiplier); i++) {
      schedule.push({
        transfer: i,
        month: i * frequencyMultiplier,
        amount: transfer
      });
    }
    
    return schedule;
  };

  const transferSchedule = getTransferSchedule();

  const getFrequencyText = () => {
    switch (transferFrequency) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'yearly': return 'Yearly';
      default: return 'Monthly';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <ArrowRightLeft className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">STP Calculator</h1>
          <span className="text-sm text-gray-500">(Systematic Transfer Plan)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Initial Investment (₹)</label>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter initial investment"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transfer Amount (₹)</label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter transfer amount"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transfer Frequency</label>
              <select
                value={transferFrequency}
                onChange={(e) => setTransferFrequency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Source Fund Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={sourceReturn}
                  onChange={(e) => setSourceReturn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Debt fund return"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Target Fund Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetReturn}
                  onChange={(e) => setTargetReturn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Equity fund return"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transfer Period (months)</label>
              <input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                placeholder="Enter transfer period"
              />
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">STP Benefits</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Rupee cost averaging in volatile markets</li>
                <li>• Gradual shift from debt to equity</li>
                <li>• Reduces timing risk of lump sum investment</li>
                <li>• Systematic approach to asset allocation</li>
                <li>• Tax-efficient fund switching</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">STP Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-700">Source Fund Balance:</span>
                  <span className="font-semibold text-purple-800">
                    ₹{sourceBalance.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Target Fund Balance:</span>
                  <span className="font-semibold text-purple-800">
                    ₹{targetBalance.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Total Transferred:</span>
                  <span className="font-semibold text-purple-800">
                    ₹{totalTransferred.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Total Portfolio Value:</span>
                  <span className="text-2xl font-bold text-purple-900">
                    ₹{totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Strategy Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">STP Strategy Value:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Lump Sum in Target Fund:</span>
                  <span className="font-semibold text-blue-800">
                    ₹{lumpSumComparison.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Difference:</span>
                  <span className={`font-bold ${totalValue > lumpSumComparison ? 'text-green-600' : 'text-red-600'}`}>
                    {totalValue > lumpSumComparison ? '+' : ''}₹{(totalValue - lumpSumComparison).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Performance:</span>
                  <span className={`font-bold ${totalValue > lumpSumComparison ? 'text-green-600' : 'text-red-600'}`}>
                    {totalValue > lumpSumComparison ? 'Better' : 'Lower'} by {Math.abs(((totalValue - lumpSumComparison) / lumpSumComparison) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Transfer Schedule</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Frequency:</span>
                  <span className="font-semibold">{getFrequencyText()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Amount per Transfer:</span>
                  <span className="font-semibold">₹{parseFloat(transferAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Total Transfers:</span>
                  <span className="font-semibold">
                    {Math.ceil(parseFloat(timePeriod) / (transferFrequency === 'monthly' ? 1 : transferFrequency === 'quarterly' ? 3 : 12))}
                  </span>
                </div>
              </div>
            </div>

            {transferSchedule.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">First 12 Transfers</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {transferSchedule.map((transfer) => (
                    <div key={transfer.transfer} className="flex justify-between text-sm">
                      <span className="text-gray-700">Transfer {transfer.transfer} (Month {transfer.month}):</span>
                      <span className="font-semibold text-gray-800">
                        ₹{transfer.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">STP Guidelines</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Ideal for large lump sum investments</li>
                <li>• Transfer from debt to equity funds gradually</li>
                <li>• Consider market conditions for timing</li>
                <li>• Review and adjust transfer amounts periodically</li>
                <li>• Suitable for risk-averse investors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STPCalculator;
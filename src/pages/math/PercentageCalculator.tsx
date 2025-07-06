import React, { useState } from 'react';
import { Percent, Calculator } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
  const [tab, setTab] = useState('basic');
  
  // Basic percentage calculations
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [basicResult, setBasicResult] = useState('');

  // Percentage change
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [changeResult, setChangeResult] = useState('');

  // What is X percent of Y
  const [percent1, setPercent1] = useState('');
  const [total1, setTotal1] = useState('');
  const [result1, setResult1] = useState('');

  // X is what percent of Y
  const [part, setPart] = useState('');
  const [whole, setWhole] = useState('');
  const [result2, setResult2] = useState('');

  const calculateBasic = () => {
    const val = parseFloat(value);
    const pct = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(pct)) {
      const result = (val * pct) / 100;
      setBasicResult(result.toString());
    } else {
      setBasicResult('');
    }
  };

  const calculateChange = () => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(old) && !isNaN(newVal) && old !== 0) {
      const change = ((newVal - old) / old) * 100;
      setChangeResult(change.toFixed(2));
    } else {
      setChangeResult('');
    }
  };

  const calculatePercentOf = () => {
    const pct = parseFloat(percent1);
    const tot = parseFloat(total1);
    if (!isNaN(pct) && !isNaN(tot)) {
      const result = (pct * tot) / 100;
      setResult1(result.toString());
    } else {
      setResult1('');
    }
  };

  const calculateWhatPercent = () => {
    const partVal = parseFloat(part);
    const wholeVal = parseFloat(whole);
    if (!isNaN(partVal) && !isNaN(wholeVal) && wholeVal !== 0) {
      const result = (partVal / wholeVal) * 100;
      setResult2(result.toFixed(2));
    } else {
      setResult2('');
    }
  };

  const tabs = [
    { id: 'basic', name: 'Basic Percentage', icon: Percent },
    { id: 'change', name: 'Percentage Change', icon: Calculator },
    { id: 'of', name: 'Percent Of', icon: Percent },
    { id: 'is', name: 'What Percent Is', icon: Calculator },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Percent className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Percentage Calculator</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                tab === tabItem.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tabItem.icon className="h-4 w-4" />
              <span>{tabItem.name}</span>
            </button>
          ))}
        </div>

        {/* Basic Percentage */}
        {tab === 'basic' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Calculate Percentage</h2>
              <p className="text-gray-600">What is X% of Y?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Percentage (%)</label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  onInput={calculateBasic}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter percentage"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onInput={calculateBasic}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter value"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Result</label>
                <input
                  type="text"
                  value={basicResult}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold text-blue-600"
                  placeholder="Result"
                />
              </div>
            </div>

            {basicResult && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-center">
                  {percentage}% of {value} = <span className="font-bold">{basicResult}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Percentage Change */}
        {tab === 'change' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Percentage Change</h2>
              <p className="text-gray-600">Calculate the percentage increase or decrease</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Original Value</label>
                <input
                  type="number"
                  value={oldValue}
                  onChange={(e) => setOldValue(e.target.value)}
                  onInput={calculateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter original value"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Value</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onInput={calculateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter new value"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Percentage Change</label>
                <input
                  type="text"
                  value={changeResult ? `${changeResult}%` : ''}
                  readOnly
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold ${
                    changeResult && parseFloat(changeResult) > 0 ? 'text-green-600' : 
                    changeResult && parseFloat(changeResult) < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}
                  placeholder="Result"
                />
              </div>
            </div>

            {changeResult && (
              <div className={`rounded-lg p-4 ${
                parseFloat(changeResult) > 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className={`text-center ${
                  parseFloat(changeResult) > 0 ? 'text-green-800' : 'text-red-800'
                }`}>
                  {parseFloat(changeResult) > 0 ? 'Increase' : 'Decrease'} of{' '}
                  <span className="font-bold">{Math.abs(parseFloat(changeResult)).toFixed(2)}%</span>
                  {' '}from {oldValue} to {newValue}
                </p>
              </div>
            )}
          </div>
        )}

        {/* What is X percent of Y */}
        {tab === 'of' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What is X% of Y?</h2>
              <p className="text-gray-600">Find X percent of a given number</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Percentage</label>
                <input
                  type="number"
                  value={percent1}
                  onChange={(e) => setPercent1(e.target.value)}
                  onInput={calculatePercentOf}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter percentage"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Of</label>
                <input
                  type="number"
                  value={total1}
                  onChange={(e) => setTotal1(e.target.value)}
                  onInput={calculatePercentOf}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter total"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Result</label>
                <input
                  type="text"
                  value={result1}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold text-blue-600"
                  placeholder="Result"
                />
              </div>
            </div>

            {result1 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-center">
                  {percent1}% of {total1} = <span className="font-bold">{result1}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* X is what percent of Y */}
        {tab === 'is' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">X is what percent of Y?</h2>
              <p className="text-gray-600">Find what percentage one number is of another</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Part</label>
                <input
                  type="number"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  onInput={calculateWhatPercent}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter part"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Whole</label>
                <input
                  type="number"
                  value={whole}
                  onChange={(e) => setWhole(e.target.value)}
                  onInput={calculateWhatPercent}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter whole"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Percentage</label>
                <input
                  type="text"
                  value={result2 ? `${result2}%` : ''}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold text-blue-600"
                  placeholder="Result"
                />
              </div>
            </div>

            {result2 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-center">
                  {part} is <span className="font-bold">{result2}%</span> of {whole}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Common Percentages Reference */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Percentage Conversions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>1/4 =</span>
                <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>1/3 =</span>
                <span className="font-semibold">33.33%</span>
              </div>
              <div className="flex justify-between">
                <span>1/2 =</span>
                <span className="font-semibold">50%</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>2/3 =</span>
                <span className="font-semibold">66.67%</span>
              </div>
              <div className="flex justify-between">
                <span>3/4 =</span>
                <span className="font-semibold">75%</span>
              </div>
              <div className="flex justify-between">
                <span>1/5 =</span>
                <span className="font-semibold">20%</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>1/8 =</span>
                <span className="font-semibold">12.5%</span>
              </div>
              <div className="flex justify-between">
                <span>1/10 =</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between">
                <span>1/6 =</span>
                <span className="font-semibold">16.67%</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>3/8 =</span>
                <span className="font-semibold">37.5%</span>
              </div>
              <div className="flex justify-between">
                <span>5/8 =</span>
                <span className="font-semibold">62.5%</span>
              </div>
              <div className="flex justify-between">
                <span>7/8 =</span>
                <span className="font-semibold">87.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
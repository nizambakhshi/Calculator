import React, { useState } from 'react';
import { Shuffle, Dice6, RefreshCw } from 'lucide-react';

const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const generateRandomNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || minNum >= maxNum || countNum <= 0) {
      return;
    }

    if (!allowDuplicates && countNum > (maxNum - minNum + 1)) {
      alert('Cannot generate more unique numbers than available in range');
      return;
    }

    const numbers: number[] = [];
    const usedNumbers = new Set<number>();

    for (let i = 0; i < countNum; i++) {
      let randomNum: number;
      
      if (allowDuplicates) {
        randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      } else {
        do {
          randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        } while (usedNumbers.has(randomNum));
        usedNumbers.add(randomNum);
      }
      
      numbers.push(randomNum);
    }

    setGeneratedNumbers(numbers);
    setHistory(prev => [numbers, ...prev.slice(0, 9)]); // Keep last 10 generations
  };

  const generateDiceRoll = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setGeneratedNumbers([result]);
    setHistory(prev => [[result], ...prev.slice(0, 9)]);
  };

  const generateCoinFlip = () => {
    const result = Math.random() < 0.5 ? 0 : 1; // 0 = Heads, 1 = Tails
    setGeneratedNumbers([result]);
    setHistory(prev => [[result], ...prev.slice(0, 9)]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getStatistics = () => {
    if (generatedNumbers.length === 0) return null;

    const sum = generatedNumbers.reduce((a, b) => a + b, 0);
    const avg = sum / generatedNumbers.length;
    const sortedNumbers = [...generatedNumbers].sort((a, b) => a - b);
    const minVal = sortedNumbers[0];
    const maxVal = sortedNumbers[sortedNumbers.length - 1];

    return { sum, avg, min: minVal, max: maxVal };
  };

  const stats = getStatistics();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Shuffle className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Random Number Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Minimum</label>
                    <input
                      type="number"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Maximum</label>
                    <input
                      type="number"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Count</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    min="1"
                    max="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="duplicates"
                    checked={allowDuplicates}
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="duplicates" className="text-sm text-gray-700">
                    Allow duplicates
                  </label>
                </div>

                <button
                  onClick={generateRandomNumbers}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Shuffle className="h-5 w-5" />
                  <span>Generate Numbers</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={generateDiceRoll}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Dice6 className="h-5 w-5" />
                  <span>Roll Dice (1-6)</span>
                </button>

                <button
                  onClick={generateCoinFlip}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Flip Coin</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMin('1');
                      setMax('10');
                      setCount('1');
                      generateRandomNumbers();
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    1-10
                  </button>
                  <button
                    onClick={() => {
                      setMin('1');
                      setMax('100');
                      setCount('1');
                      generateRandomNumbers();
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    1-100
                  </button>
                  <button
                    onClick={() => {
                      setMin('1');
                      setMax('1000');
                      setCount('1');
                      generateRandomNumbers();
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    1-1000
                  </button>
                  <button
                    onClick={() => {
                      setMin('0');
                      setMax('1');
                      setCount('1');
                      generateRandomNumbers();
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    0-1
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Generated Numbers */}
            {generatedNumbers.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Generated Numbers</h3>
                <div className="space-y-4">
                  {generatedNumbers.length === 1 && (generatedNumbers[0] === 0 || generatedNumbers[0] === 1) && 
                   parseInt(min) === 0 && parseInt(max) === 1 ? (
                    <div className="text-center">
                      <div className="text-6xl mb-2">
                        {generatedNumbers[0] === 0 ? '🪙' : '🪙'}
                      </div>
                      <div className="text-2xl font-bold text-purple-900">
                        {generatedNumbers[0] === 0 ? 'Heads' : 'Tails'}
                      </div>
                    </div>
                  ) : generatedNumbers.length === 1 && generatedNumbers[0] >= 1 && generatedNumbers[0] <= 6 &&
                            parseInt(min) === 1 && parseInt(max) === 6 ? (
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎲</div>
                      <div className="text-4xl font-bold text-purple-900">
                        {generatedNumbers[0]}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {generatedNumbers.map((num, index) => (
                        <span
                          key={index}
                          className="bg-white text-purple-800 px-4 py-2 rounded-lg font-bold text-lg border-2 border-purple-200"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Statistics */}
            {stats && generatedNumbers.length > 1 && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{stats.sum}</div>
                    <div className="text-sm text-green-600">Sum</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{stats.avg.toFixed(2)}</div>
                    <div className="text-sm text-green-600">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{stats.min}</div>
                    <div className="text-sm text-green-600">Minimum</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{stats.max}</div>
                    <div className="text-sm text-green-600">Maximum</div>
                  </div>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">History</h3>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {history.map((numbers, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">#{history.length - index}:</span>
                      <div className="flex flex-wrap gap-1">
                        {numbers.map((num, numIndex) => (
                          <span
                            key={numIndex}
                            className="bg-white text-gray-700 px-2 py-1 rounded border"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">About Random Number Generation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Uses:</h4>
              <ul className="space-y-1">
                <li>• Gaming and simulations</li>
                <li>• Statistical sampling</li>
                <li>• Cryptography and security</li>
                <li>• Decision making</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Note:</h4>
              <p>
                This generator uses JavaScript's Math.random() function, which produces 
                pseudo-random numbers suitable for most applications but not cryptographic purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomNumberGenerator;
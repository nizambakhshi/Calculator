import React, { useState } from 'react';
import { Search, Hash } from 'lucide-react';

const PrimeNumberCalculator: React.FC = () => {
  const [number, setNumber] = useState('');
  const [rangeStart, setRangeStart] = useState('1');
  const [rangeEnd, setRangeEnd] = useState('100');
  const [tab, setTab] = useState('check');
  const [isPrime, setIsPrime] = useState<boolean | null>(null);
  const [primeList, setPrimeList] = useState<number[]>([]);
  const [factors, setFactors] = useState<number[]>([]);

  const checkPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getFactors = (num: number): number[] => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const generatePrimes = (start: number, end: number): number[] => {
    const primes = [];
    for (let i = Math.max(2, start); i <= end; i++) {
      if (checkPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  };

  const handleCheck = () => {
    const num = parseInt(number);
    if (!isNaN(num) && num > 0) {
      setIsPrime(checkPrime(num));
      setFactors(getFactors(num));
    }
  };

  const handleGenerate = () => {
    const start = parseInt(rangeStart);
    const end = parseInt(rangeEnd);
    if (!isNaN(start) && !isNaN(end) && start <= end) {
      setPrimeList(generatePrimes(start, end));
    }
  };

  React.useEffect(() => {
    if (number) {
      handleCheck();
    }
  }, [number]);

  React.useEffect(() => {
    handleGenerate();
  }, [rangeStart, rangeEnd]);

  const tabs = [
    { id: 'check', name: 'Prime Checker', icon: Search },
    { id: 'generate', name: 'Prime Generator', icon: Hash },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Hash className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Prime Number Calculator</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                tab === tabItem.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tabItem.icon className="h-4 w-4" />
              <span>{tabItem.name}</span>
            </button>
          ))}
        </div>

        {/* Prime Checker Tab */}
        {tab === 'check' && (
          <div className="space-y-6">
            <div className="max-w-md mx-auto">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Enter a Number</label>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg text-center"
                  placeholder="Enter a positive integer"
                />
              </div>
            </div>

            {number && isPrime !== null && (
              <div className={`max-w-md mx-auto rounded-lg p-6 ${
                isPrime ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    isPrime ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPrime ? '✓' : '✗'}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isPrime ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {number} is {isPrime ? 'PRIME' : 'NOT PRIME'}
                  </h3>
                  <p className={`text-sm ${
                    isPrime ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isPrime 
                      ? `${number} is only divisible by 1 and itself`
                      : `${number} has factors other than 1 and itself`
                    }
                  </p>
                </div>
              </div>
            )}

            {factors.length > 0 && (
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Factors of {number}</h3>
                <div className="flex flex-wrap gap-2">
                  {factors.map((factor, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        factor === 1 || factor === parseInt(number)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prime Generator Tab */}
        {tab === 'generate' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Start Range</label>
                <input
                  type="number"
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="Start"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">End Range</label>
                <input
                  type="number"
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="End"
                />
              </div>
            </div>

            {primeList.length > 0 && (
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                  Prime Numbers from {rangeStart} to {rangeEnd} ({primeList.length} found)
                </h3>
                <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
                  {primeList.map((prime, index) => (
                    <span
                      key={index}
                      className="bg-white text-indigo-800 px-2 py-1 rounded text-center font-medium text-sm"
                    >
                      {prime}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What are Prime Numbers?</h3>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.</p>
              <p>The first few prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...</p>
              <p>2 is the only even prime number. All other even numbers are divisible by 2.</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Prime Number Facts</h3>
            <ul className="space-y-1 text-green-800 text-sm">
              <li>• There are infinitely many prime numbers</li>
              <li>• The largest known prime has over 24 million digits</li>
              <li>• Prime numbers are fundamental in cryptography</li>
              <li>• Every integer can be expressed as a product of primes</li>
              <li>• The distribution of primes becomes less dense as numbers get larger</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeNumberCalculator;
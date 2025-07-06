import React, { useState } from 'react';
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react';

const FractionCalculator: React.FC = () => {
  const [num1, setNum1] = useState('1');
  const [den1, setDen1] = useState('2');
  const [num2, setNum2] = useState('1');
  const [den2, setDen2] = useState('3');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState({ numerator: 0, denominator: 1 });
  const [decimal, setDecimal] = useState(0);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (num: number, den: number) => {
    const divisor = gcd(Math.abs(num), Math.abs(den));
    return {
      numerator: num / divisor,
      denominator: den / divisor
    };
  };

  const calculateFraction = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    let resultNum = 0;
    let resultDen = 1;

    switch (operation) {
      case '+':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case '-':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case '×':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case '÷':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    if (resultDen === 0) {
      setResult({ numerator: 0, denominator: 1 });
      setDecimal(0);
      return;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    setResult(simplified);
    setDecimal(simplified.numerator / simplified.denominator);
  };

  React.useEffect(() => {
    calculateFraction();
  }, [num1, den1, num2, den2, operation]);

  const operations = [
    { symbol: '+', name: 'Add', icon: Plus },
    { symbol: '-', name: 'Subtract', icon: Minus },
    { symbol: '×', name: 'Multiply', icon: X },
    { symbol: '÷', name: 'Divide', icon: Divide },
  ];

  const FractionInput: React.FC<{
    numerator: string;
    denominator: string;
    onNumeratorChange: (value: string) => void;
    onDenominatorChange: (value: string) => void;
    label: string;
  }> = ({ numerator, denominator, onNumeratorChange, onDenominatorChange, label }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-col items-center space-y-1">
        <input
          type="number"
          value={numerator}
          onChange={(e) => onNumeratorChange(e.target.value)}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
          placeholder="0"
        />
        <div className="w-20 h-px bg-gray-400"></div>
        <input
          type="number"
          value={denominator}
          onChange={(e) => onDenominatorChange(e.target.value)}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
          placeholder="1"
        />
      </div>
    </div>
  );

  const FractionDisplay: React.FC<{
    numerator: number;
    denominator: number;
    className?: string;
  }> = ({ numerator, denominator, className = '' }) => (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="text-2xl font-bold">{numerator}</div>
      <div className="w-16 h-px bg-gray-600 my-1"></div>
      <div className="text-2xl font-bold">{denominator}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Calculator className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Fraction Calculator</h1>
        </div>

        <div className="space-y-8">
          {/* Input Section */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FractionInput
              numerator={num1}
              denominator={den1}
              onNumeratorChange={setNum1}
              onDenominatorChange={setDen1}
              label="First Fraction"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Operation</label>
              <div className="flex flex-col space-y-2">
                {operations.map((op) => (
                  <button
                    key={op.symbol}
                    onClick={() => setOperation(op.symbol)}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-colors ${
                      operation === op.symbol
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400 text-gray-600'
                    }`}
                    title={op.name}
                  >
                    <op.icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <FractionInput
              numerator={num2}
              denominator={den2}
              onNumeratorChange={setNum2}
              onDenominatorChange={setDen2}
              label="Second Fraction"
            />

            <div className="text-4xl font-bold text-gray-400">=</div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Result</label>
              <FractionDisplay
                numerator={result.numerator}
                denominator={result.denominator}
                className="text-blue-600"
              />
            </div>
          </div>

          {/* Calculation Steps */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-4 text-lg">
                <FractionDisplay numerator={parseInt(num1) || 0} denominator={parseInt(den1) || 1} />
                <span className="text-2xl font-bold">{operation}</span>
                <FractionDisplay numerator={parseInt(num2) || 0} denominator={parseInt(den2) || 1} />
                <span className="text-2xl font-bold">=</span>
                <FractionDisplay numerator={result.numerator} denominator={result.denominator} className="text-blue-600" />
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-gray-600">
                  As a decimal: <span className="font-semibold text-blue-600">{decimal.toFixed(6)}</span>
                </div>
                <div className="text-gray-600">
                  As a percentage: <span className="font-semibold text-blue-600">{(decimal * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Operations Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Addition & Subtraction</h3>
              <div className="space-y-2 text-blue-800">
                <p className="text-sm">To add or subtract fractions:</p>
                <ol className="text-sm space-y-1 pl-4">
                  <li>1. Find a common denominator</li>
                  <li>2. Convert fractions to equivalent fractions</li>
                  <li>3. Add or subtract the numerators</li>
                  <li>4. Keep the common denominator</li>
                  <li>5. Simplify the result</li>
                </ol>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Multiplication & Division</h3>
              <div className="space-y-2 text-green-800">
                <p className="text-sm">For multiplication and division:</p>
                <ul className="text-sm space-y-1 pl-4">
                  <li>• <strong>Multiply:</strong> Multiply numerators together and denominators together</li>
                  <li>• <strong>Divide:</strong> Multiply by the reciprocal of the second fraction</li>
                  <li>• Always simplify the final result</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Fractions Reference */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Fraction Equivalents</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>1/2 =</span>
                  <span className="font-semibold">0.5</span>
                </div>
                <div className="flex justify-between">
                  <span>1/3 =</span>
                  <span className="font-semibold">0.333...</span>
                </div>
                <div className="flex justify-between">
                  <span>1/4 =</span>
                  <span className="font-semibold">0.25</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>2/3 =</span>
                  <span className="font-semibold">0.667...</span>
                </div>
                <div className="flex justify-between">
                  <span>3/4 =</span>
                  <span className="font-semibold">0.75</span>
                </div>
                <div className="flex justify-between">
                  <span>1/5 =</span>
                  <span className="font-semibold">0.2</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>1/6 =</span>
                  <span className="font-semibold">0.167...</span>
                </div>
                <div className="flex justify-between">
                  <span>1/8 =</span>
                  <span className="font-semibold">0.125</span>
                </div>
                <div className="flex justify-between">
                  <span>3/8 =</span>
                  <span className="font-semibold">0.375</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>5/8 =</span>
                  <span className="font-semibold">0.625</span>
                </div>
                <div className="flex justify-between">
                  <span>7/8 =</span>
                  <span className="font-semibold">0.875</span>
                </div>
                <div className="flex justify-between">
                  <span>1/10 =</span>
                  <span className="font-semibold">0.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionCalculator;
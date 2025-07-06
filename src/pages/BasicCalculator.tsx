import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const Button: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'number' | 'operator' | 'equals' | 'clear';
  }> = ({ children, onClick, className = '', variant = 'number' }) => {
    const baseClasses = 'h-16 rounded-lg font-semibold text-lg transition-all duration-200 active:scale-95';
    const variantClasses = {
      number: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400',
      operator: 'bg-blue-500 hover:bg-blue-600 text-white',
      equals: 'bg-green-500 hover:bg-green-600 text-white',
      clear: 'bg-red-500 hover:bg-red-600 text-white'
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Basic Calculator</h1>
        
        {/* Display */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="text-right text-3xl font-mono text-white min-h-[2.5rem] flex items-center justify-end">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} variant="clear" className="col-span-2">
            Clear
          </Button>
          <Button onClick={() => setDisplay(display.slice(0, -1) || '0')} variant="clear">
            <Delete className="h-5 w-5 mx-auto" />
          </Button>
          <Button onClick={() => performOperation('÷')} variant="operator">
            ÷
          </Button>

          <Button onClick={() => inputNumber('7')}>7</Button>
          <Button onClick={() => inputNumber('8')}>8</Button>
          <Button onClick={() => inputNumber('9')}>9</Button>
          <Button onClick={() => performOperation('×')} variant="operator">
            ×
          </Button>

          <Button onClick={() => inputNumber('4')}>4</Button>
          <Button onClick={() => inputNumber('5')}>5</Button>
          <Button onClick={() => inputNumber('6')}>6</Button>
          <Button onClick={() => performOperation('-')} variant="operator">
            -
          </Button>

          <Button onClick={() => inputNumber('1')}>1</Button>
          <Button onClick={() => inputNumber('2')}>2</Button>
          <Button onClick={() => inputNumber('3')}>3</Button>
          <Button onClick={() => performOperation('+')} variant="operator">
            +
          </Button>

          <Button onClick={() => inputNumber('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={handleEquals} variant="equals">
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
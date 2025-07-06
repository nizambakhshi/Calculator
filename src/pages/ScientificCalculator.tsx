import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
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
      case '^':
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const performScientificOperation = (func: string) => {
    const inputValue = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(inputValue);
        break;
      case 'cos':
        result = Math.cos(inputValue);
        break;
      case 'tan':
        result = Math.tan(inputValue);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'x²':
        result = inputValue * inputValue;
        break;
      case '±':
        result = -inputValue;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
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
    variant?: 'number' | 'operator' | 'scientific' | 'equals' | 'clear';
  }> = ({ children, onClick, className = '', variant = 'number' }) => {
    const baseClasses = 'h-12 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95';
    const variantClasses = {
      number: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400',
      operator: 'bg-blue-500 hover:bg-blue-600 text-white',
      scientific: 'bg-purple-500 hover:bg-purple-600 text-white',
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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Scientific Calculator</h1>
        
        {/* Display */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="text-right text-2xl font-mono text-white min-h-[2rem] flex items-center justify-end">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-6 gap-2">
          {/* Scientific Functions Row 1 */}
          <Button onClick={() => performScientificOperation('sin')} variant="scientific">
            sin
          </Button>
          <Button onClick={() => performScientificOperation('cos')} variant="scientific">
            cos
          </Button>
          <Button onClick={() => performScientificOperation('tan')} variant="scientific">
            tan
          </Button>
          <Button onClick={() => performScientificOperation('log')} variant="scientific">
            log
          </Button>
          <Button onClick={() => performScientificOperation('ln')} variant="scientific">
            ln
          </Button>
          <Button onClick={() => performOperation('^')} variant="operator">
            x^y
          </Button>

          {/* Scientific Functions Row 2 */}
          <Button onClick={() => performScientificOperation('sqrt')} variant="scientific">
            √
          </Button>
          <Button onClick={() => performScientificOperation('x²')} variant="scientific">
            x²
          </Button>
          <Button onClick={() => performScientificOperation('1/x')} variant="scientific">
            1/x
          </Button>
          <Button onClick={() => performScientificOperation('±')} variant="scientific">
            ±
          </Button>
          <Button onClick={clear} variant="clear">
            C
          </Button>
          <Button onClick={() => setDisplay(display.slice(0, -1) || '0')} variant="clear">
            <Delete className="h-4 w-4 mx-auto" />
          </Button>

          {/* Basic Calculator Grid */}
          <Button onClick={() => inputNumber('7')}>7</Button>
          <Button onClick={() => inputNumber('8')}>8</Button>
          <Button onClick={() => inputNumber('9')}>9</Button>
          <Button onClick={() => performOperation('÷')} variant="operator">
            ÷
          </Button>
          <Button onClick={() => inputNumber('(')} variant="operator">
            (
          </Button>
          <Button onClick={() => inputNumber(')')} variant="operator">
            )
          </Button>

          <Button onClick={() => inputNumber('4')}>4</Button>
          <Button onClick={() => inputNumber('5')}>5</Button>
          <Button onClick={() => inputNumber('6')}>6</Button>
          <Button onClick={() => performOperation('×')} variant="operator">
            ×
          </Button>
          <Button onClick={() => setMemory(memory + parseFloat(display))} variant="scientific">
            M+
          </Button>
          <Button onClick={() => setMemory(memory - parseFloat(display))} variant="scientific">
            M-
          </Button>

          <Button onClick={() => inputNumber('1')}>1</Button>
          <Button onClick={() => inputNumber('2')}>2</Button>
          <Button onClick={() => inputNumber('3')}>3</Button>
          <Button onClick={() => performOperation('-')} variant="operator">
            -
          </Button>
          <Button onClick={() => {setDisplay(String(memory)); setWaitingForNewValue(true);}} variant="scientific">
            MR
          </Button>
          <Button onClick={() => setMemory(0)} variant="scientific">
            MC
          </Button>

          <Button onClick={() => inputNumber('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={() => performOperation('+')} variant="operator">
            +
          </Button>
          <Button onClick={handleEquals} variant="equals" className="col-span-2">
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const inputPercent = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = operate(currentValue, inputValue, operator);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const operate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const calculate = () => {
    if (prevValue === null || !operator) return;
    const inputValue = parseFloat(display);
    const result = operate(prevValue, inputValue, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    { label: 'AC', className: 'bg-[#5c5c5c]', onClick: clear },
    { label: '±', className: 'bg-[#5c5c5c]', onClick: toggleSign },
    { label: '%', className: 'bg-[#5c5c5c]', onClick: inputPercent },
    { label: '÷', className: `bg-[#ff9f0a] ${operator === '/' ? 'brightness-150' : ''}`, onClick: () => performOperation('/') },
    { label: '7', className: 'bg-[#333333]', onClick: () => inputDigit('7') },
    { label: '8', className: 'bg-[#333333]', onClick: () => inputDigit('8') },
    { label: '9', className: 'bg-[#333333]', onClick: () => inputDigit('9') },
    { label: '×', className: `bg-[#ff9f0a] ${operator === '*' ? 'brightness-150' : ''}`, onClick: () => performOperation('*') },
    { label: '4', className: 'bg-[#333333]', onClick: () => inputDigit('4') },
    { label: '5', className: 'bg-[#333333]', onClick: () => inputDigit('5') },
    { label: '6', className: 'bg-[#333333]', onClick: () => inputDigit('6') },
    { label: '−', className: `bg-[#ff9f0a] ${operator === '-' ? 'brightness-150' : ''}`, onClick: () => performOperation('-') },
    { label: '1', className: 'bg-[#333333]', onClick: () => inputDigit('1') },
    { label: '2', className: 'bg-[#333333]', onClick: () => inputDigit('2') },
    { label: '3', className: 'bg-[#333333]', onClick: () => inputDigit('3') },
    { label: '+', className: `bg-[#ff9f0a] ${operator === '+' ? 'brightness-150' : ''}`, onClick: () => performOperation('+') },
    { label: '0', className: 'bg-[#333333] col-span-2', onClick: () => inputDigit('0') },
    { label: '.', className: 'bg-[#333333]', onClick: inputDot },
    { label: '=', className: 'bg-[#ff9f0a]', onClick: calculate },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#1c1c1c] text-white">
      <div className="flex flex-1 items-end justify-end px-4 py-6 text-6xl font-light">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-px bg-[#1c1c1c]">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`${btn.className} flex h-16 items-center justify-center text-xl font-medium active:brightness-125 transition-all ${btn.label === '0' ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { Component, useState } from 'react';
import './Calculator.css';
import Button from '../components/Button.js';
import Display from '../components/Display.js';

export default function Calculator() {
  const initialDisplay = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  };

  const [display, setDisplay] = useState({
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  });

  const clearMemory = () => {
    setDisplay({ ...initialDisplay });
  };

  const setOperation = (operation) => {
    if (display.current === 0) {
      setDisplay({
        ...display,
        displayValue: '0',
        operation: operation,
        current: 1,
        clearDisplay: false,
      });
    } else {
      const equals = operation === '=';
      const currentOperation = display.operation;

      const values = [...display.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = display.values[0];
      }
      setDisplay({
        ...display,
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values: values,
      });
    }
  };

  const addDigit = (n) => {
    if (n === '.' && display.displayValue.includes('.')) {
      return;
    }
    const clearDisplay = display.displayValue === '0' || display.clearDisplay;
    const currentValue = clearDisplay ? '' : display.displayValue;
    const displayValue = currentValue + n;
    setDisplay({ ...display, displayValue: displayValue, clearDisplay: false });

    if (n !== '.') {
      const i = display.current;
      const newValue = parseFloat(displayValue);
      const values = [...display.values];
      values[i] = newValue;
      setDisplay({ ...display, values: values, displayValue: displayValue });
      console.log(values);
    }
  };

  return (
    <div>
      <div className="calculator">
        <Display value={display.displayValue} />
        <Button label="AC" click={clearMemory} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} operation />
      </div>
    </div>
  );
}

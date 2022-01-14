import styles from "./Calculator.module.css";
import Button from "../components/Button";
import Display from "../components/Display";
import { useState } from "react";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentIndex: 0,
};

const Calculator = () => {
  const [lastClick, setLastClick] = useState(null)
  const [calcState, setCalcState] = useState(initialState);
  const clearMemory = () => {
    setCalcState(initialState);
    setLastClick(null)
  };
  const setOperation = (operation) => {
    setLastClick(operation)  
    if(lastClick === operation) {
        return
    }  
    if (calcState.currentIndex === 0) {
      setCalcState({ ...calcState, operation, currentIndex: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = calcState.operation;
      const values = [...calcState.values];
      switch (currentOperation) {
        case "/":
          values[0] /= values[1];
          break;
        case "*":
          values[0] *= values[1];
          break;
        case "+":
          values[0] += values[1];
          break;
        case "-":
          values[0] -= values[1];
          break;
        default:
          values[0] = calcState.values[0];
          break;
      }
      values[1] = 0;
      setCalcState({
        displayValue: values[0],
        operation: equals ? null : operation,
        currentIndex: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };
  const addDigit = (n) => {
    setLastClick(n)  
    if (n === "." && calcState.displayValue.includes(".")) {
      return;
    }
    const clearDisplay = calcState.displayValue === "0" || calcState.clearDisplay;
    const currentValue = clearDisplay ? "" : calcState.displayValue;
    const displayValue = currentValue + n;
    let newState = { ...calcState, displayValue, clearDisplay: false };
    setCalcState(newState);
    if (n !== ".") {
      const i = calcState.currentIndex;
      const newValue = parseFloat(displayValue);
      const values = [...calcState.values];
      values[i] = newValue;
      setCalcState({ ...newState, values });
    }
  };

  return (
    <div className={styles.calculator}>
      <Display value={calcState.displayValue} />
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
  );
};

export default Calculator;

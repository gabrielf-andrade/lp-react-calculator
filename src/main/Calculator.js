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
  const [lastClick, setLastClick] = useState(null);
  const [calcState, setCalcState] = useState(initialState);

  const clearMemory = () => {
    setCalcState(initialState);
    setLastClick(null);
  };

  const setOperation = (operation) => {
    if (lastClick === operation) {
      return;
    }
    setLastClick(operation);
    if (calcState.currentIndex === 0) {
      setCalcState((prevState) => {
        return { ...prevState, operation, currentIndex: 1, clearDisplay: true };
      });
    } else {
      if (["*", "/", "+", "-", "="].includes(lastClick)) {
        setCalcState((prevState) => {
          return { ...prevState, operation };
        });
        return;
      }
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
      if (isNaN(values[0]) || !isFinite(values[0])) {
        clearMemory();
        return;
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
    setLastClick(n);
    if (n === "." && calcState.displayValue.toString().includes(".")) {
      return;
    }
    const clearDisplay = calcState.displayValue === "0" || calcState.clearDisplay;
    const currentValue = clearDisplay ? "" : calcState.displayValue;
    const displayValue = currentValue + n;
    setCalcState((prevState) => {
      return { ...prevState, displayValue, clearDisplay: false };
    });
    if (n !== ".") {
      const i = calcState.currentIndex;
      const newValue = parseFloat(displayValue);
      const values = [...calcState.values];
      values[i] = newValue;
      setCalcState((prevState) => {
        return { ...prevState, values };
      });
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

import React, { useState } from "react";
type Operator = "+" | "-" | "X" | "/" | null;

const Calculator: React.FC = () => {
  const [current, setCurrent] = useState<string>("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator>(null);

  const inputNum = (value: string) => {
    setCurrent((prev) => (prev === "0" ? value : prev + value));
  };

  const clear = () => {
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
  };

  const changeSign = () => {
    setCurrent((prev) => (parseFloat(prev) * -1).toString());
  };

  const percentage = () => {
    setCurrent((prev) => (parseFloat(prev) / 100).toString());
  };

  const handleOperator = (op: Operator) => {
    setPrevious(current);
    setCurrent("0");
    setOperator(op);
  };

  const calculate = () => {
    if (!operator || !previous) return;
    const num1 = parseFloat(previous);
    const num2 = parseFloat(current);
    let result: number = 0;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "X":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : 0;
        break;
    }

    setCurrent(result.toString());
    setPrevious(null);
    setOperator(null);
  };

  const buttons = [
    { label: "AC", onClick: clear },
    { label: "+/-", onClick: changeSign },
    { label: "%", onClick: percentage },
    { label: "/", onClick: () => handleOperator("/") },
    { label: "7", onClick: () => inputNum("7") },
    { label: "8", onClick: () => inputNum("8") },
    { label: "9", onClick: () => inputNum("9") },
    { label: "X", onClick: () => handleOperator("X") },
    { label: "4", onClick: () => inputNum("4") },
    { label: "5", onClick: () => inputNum("5") },
    { label: "6", onClick: () => inputNum("6") },
    { label: "-", onClick: () => handleOperator("-") },
    { label: "1", onClick: () => inputNum("1") },
    { label: "2", onClick: () => inputNum("2") },
    { label: "3", onClick: () => inputNum("3") },
    { label: "+", onClick: () => handleOperator("+") },
    { label: "0", onClick: () => inputNum("0"), span: true },
    { label: ".", onClick: () => inputNum(".") },
    { label: "=", onClick: calculate },
  ];

  return (
    <div className="calculator">
      <div className="display">{current}</div>
      <div className="buttons-grid">
        {buttons.map(({ label, onClick, span }, idx) => (
          <button
            key={idx}
            onClick={onClick}
            className={`button ${
              ["+", "-", "X", "/", "="].includes(label)
                ? "button-orange"
                : label === "AC" || label === "+/-" || label === "%"
                ? "button-gray-light"
                : "button-gray-dark"
            } ${span ? "span-two" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Calculator;

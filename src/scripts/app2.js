const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const action = key.dataset.action;
  const firstValue = state.firstValue;
  const modValue = state.modValue;
  const operator = state.operator;
  const previousKeyType = state.previousKeyType;

  if (!action) {
    return displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
      ? keyContent
      : displayedNum + keyContent;
  }

  if (action === "decimal") {
    if (!displayedNum.includes(".")) return displayedNum + ".";
    if (previousKeyType === "operator" || previousKeyType === "calculate")
      return "0.";
    return displayedNum;
  }

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (action === "delete") return 0;
  if (action === "clear") return 0;

  if (action === "calculate") {
    return firstValue
      ? previousKeyType === "calculate"
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return "number";
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";
  return action;
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);

  const firstValue = calculator.dataset.firstValue;
  const operator = calculator.dataset.operator;
  const previousKeyType = calculator.dataset.previousKeyType;

  calculator.dataset.previousKeyType = keyType;

  Array.from(key.parentNode.children).forEach((k) =>
    k.classList.remove("is-depressed")
  );

  if (keyType === "number") {
    calculator.dataset.previousKeyType = "number";
  }
  if (keyType === "decimal") {
    calculator.dataset.previousKeyType = "decimal";
  }

  if (keyType === "operator") {
    key.classList.add("is-depressed");
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === "clear") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";

    calculator.dataset.previousKeyType = "clear";
  }

  if (keyType === "delete") {
    calculator.dataset.previousKeyType = "delete";
  }

  if (keyType === "calculate") {
    let secondValue = displayedNum;

    if (firstValue) {
      if (previousKeyType === "calculate") {
        secondValue = calculator.dataset.modValue;
      }
    }

    calculator.dataset.modValue = secondValue;
  }
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const displayedNum = display.textContent;
    const resultString = createResultString(
      e.target,
      displayedNum,
      calculator.dataset
    );

    display.textContent = resultString;

    updateCalculatorState(key, calculator, resultString, displayedNum);
  }
});

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

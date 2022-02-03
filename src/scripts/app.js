const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = "";
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== "operator") {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      // if (!displayedNum.includes(".")) {
      //   display.textContent = displayedNum + ".";
      // } else if (previousKeyType === "operator") {
      //   display.textContent = "0.";
      // }

      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      }

      if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";
      display.textContent = "0";
    }

    if (action === "calculate") {
      const firstValue = parseFloat(calculator.dataset.firstValue);
      const operator = calculator.dataset.operator;
      const secondValue = parseFloat(displayedNum);

      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = n1 + n2;
  } else if (operator === "subtract") {
    result = n1 - n2;
  } else if (operator === "multiply") {
    result = n1 * n2;
  } else if (operator === "divide") {
    result = n1 / n2;
  }

  return result;
};

//switch statement failed here. why?

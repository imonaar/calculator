class Theme {
  constructor() {
    this.radioBtns = document.querySelectorAll(".js-radio");
    this.body = document.body;

    this.switchTheme();
  }

  switchTheme = () => {
    this.radioBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;

        this.body.classList.remove("theme-1");
        this.body.classList.remove("theme-2");
        this.body.classList.remove("theme-3");

        this.body.classList.add(theme);
      });
    });
  };
}

class Calculator {
  constructor() {
    this.calculator = document.querySelector(".calculator");
    this.keys = this.calculator.querySelector(".calculator__keys");
    this.display = document.querySelector(".calculator__display");

    this.addEventListener();
  }

  addEventListener = () => {
    const calculator = this.calculator;
    const display = this.display;

    this.keys.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        const key = e.target;
        const displayedNum = display.textContent;
        const resultString = this.createResultString(
          e.target,
          displayedNum,
          calculator.dataset
        );

        const result =
          resultString.toString().includes(".") &&
          resultString.toString().length > 10
            ? resultString.toFixed(8)
            : resultString;

        display.textContent = result.toLocaleString();

        this.updateCalculatorState(key, calculator, resultString, displayedNum);
      }
    });
  };

  createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent;
    const action = key.dataset.action;
    const firstValue = state.firstValue;
    const modValue = state.modValue;
    const operator = state.operator;
    const previousKeyType = state.previousKeyType;
    const calculate = this.calculate;

    if (!action) {
      return displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
        ? keyContent
        : displayedNum + keyContent;
    }

    if (action === "decimal") {
      if (previousKeyType === "operator" || previousKeyType === "calculate")
        return "0.";
      if (!displayedNum.includes(".")) return displayedNum + ".";

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

  updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    const keyType = this.getKeyType(key);

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

  getKeyType = (key) => {
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

  calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === "add") return firstNum + secondNum;
    if (operator === "subtract") return firstNum - secondNum;
    if (operator === "multiply") return firstNum * secondNum;
    if (operator === "divide") return firstNum / secondNum;
  };
}

new Theme();
new Calculator();

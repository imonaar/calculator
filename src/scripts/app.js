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
      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

   if (action === "decimal") {
     if (!displayedNum.includes(".")) {
       display.textContent = displayedNum + ".";
     } else if (previousKeyType === "operator") {
       display.textContent = "0.";
     }  
     calculator.dataset.previousKeyType = "decimal";
   }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";
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

function calculate(n1, operator, n2) {
  let result;
  switch (operator) {
    case "add":
      result = n1 + n2;
    case "subtract":
      result = n1 - n2;
    case "multiply":
      result = n1 * n2;
    case "divide":
      result = n1 / n2;
    default:
      return result;
  }

  return result;
}

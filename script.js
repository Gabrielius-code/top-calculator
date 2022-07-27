class Calculator {
  #numbers = document.querySelectorAll("[data-number]");
  #operators = document.querySelectorAll("[data-operator]");
  #firstNum = "";
  #secondNum = "";
  #answer = "";
  #input = document.querySelector(".input");
  #inputStr = "";
  #previuosInput = document.querySelector(".previous-input");
  #operator = "";
  #equalBtn = document.querySelector(".equal");
  #clearAll = document.querySelector(".clearAll");
  constructor() {
    this.#addEventListenersToBtns();
  }
  #addEventListenersToBtns() {
    this.#numbers.forEach((number) =>
      number.addEventListener("click", this.#handleNumClick.bind(this))
    );
    this.#operators.forEach((operator) =>
      operator.addEventListener("click", this.#handleOperatorClick.bind(this))
    );
    this.#equalBtn.addEventListener("click", this.#handleEqualClick.bind(this));
    this.#clearAll.addEventListener("click", this.#init.bind(this));
  }
  #handleNumClick(e) {
    //FOR NOW

    if (!this.#operator) {
      if (this.#answer || this.#answer === 0) {
        this.#init();
      } //If I have an answer like 100 and I press number (for example 1), then it should clear firstNum, because it shouldn't be 1001, it should be 1
      this.#firstNum += e.target.dataset.number;
    }
    if (this.#operator) this.#secondNum += e.target.dataset.number;
    this.#displayInput(e.target.dataset.number);
    console.log(`Pirmas:${this.#firstNum} Antras:${this.#secondNum}`);
  }
  #handleOperatorClick(e) {
    if (this.#operator && this.#secondNum)
      return this.#operate(this.#operator, this.#firstNum, this.#secondNum);

    this.#operator = e.target.dataset.operator;
    // this.#input.textContent.splice(-1, 1);
    this.#displayInput(` ${this.#operator} `);
  }
  #handleEqualClick() {
    if (!this.#secondNum) return;
    this.#operate(this.#operator, this.#firstNum, this.#secondNum);
  }
  #init() {
    this.#firstNum = "";
    this.#secondNum = "";
    this.#input.textContent = "";
    this.#inputStr = "";
    this.#previuosInput.textContent = "";
    this.#answer = "";
    this.#operator = "";
  }
  #add(a, b) {
    return a + b;
  }
  #subtract(a, b) {
    return a - b;
  }
  #multiply(a, b) {
    return a * b;
  }
  #divide(a, b) {
    return a / b;
  }
  #operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
      case "+":
        this.#answer = this.#add(num1, num2);
        break;
      case "-":
        this.#answer = this.#subtract(num1, num2);
        break;
      case "*":
        this.#answer = this.#multiply(num1, num2);
        break;
      case "/":
        this.#answer = this.#divide(num1, num2);
        break;
    }
    this.#previuosInput.textContent = `${num1} ${operator} ${num2} =`;
    this.#displayAnswer(this.#answer);
    this.#firstNum = this.#answer;
    this.#secondNum = "";
    this.#operator = "";
  }
  #displayInput(input) {
    this.#inputStr += input;
    this.#input.textContent = this.#inputStr;
  }
  #displayAnswer(answer) {
    this.#input.textContent = answer;
    this.#inputStr = answer;
  }
}
const calculator = new Calculator();

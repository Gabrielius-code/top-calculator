class Calculator {
  #numbers = document.querySelectorAll("[data-number]");
  #operators = document.querySelectorAll("[data-operator]");
  #firstNum = "";
  #secondNum = "";
  #answer = "";
  #input = document.querySelector(".input");
  #previuosInput = document.querySelector(".previous-input");
  #operator = "";
  #equalBtn = document.querySelector(".equal");
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
    if (this.#operator)
      this.#operate(this.#operator, this.#firstNum, this.#secondNum);
    this.#operator = e.target.dataset.operator;
    this.#displayInput(this.#operator);
  }
  #handleEqualClick() {
    this.#operate(this.#operator, this.#firstNum, this.#secondNum);
  }
  #init() {
    this.#firstNum = "";
    this.#secondNum = "";
    this.#input.textContent = "";
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
    this.#displayAnswer(this.#answer);
    this.#firstNum = this.#answer;
    this.#secondNum = "";
    this.#operator = "";
  }
  #displayInput(input) {
    this.#input.textContent += input;
  }
  #displayAnswer(answer) {
    this.#input.textContent = answer;
  }
}
const calculator = new Calculator();

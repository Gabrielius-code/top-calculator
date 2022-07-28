class Calculator {
  #numbers = document.querySelectorAll("[data-number]");
  #operators = document.querySelectorAll("[data-operator]");
  #firstNum = "";
  #secondNum = "";
  #answer = "";
  #inputStr = "";
  #temporaryInputStr = "";
  #temporaryNumber = "";
  #operator = "";
  #removedCharacter = "";
  #currentNumberIsFirst = true; //By default
  #input = document.querySelector(".input");
  #previousInput = document.querySelector(".previous-input");
  #equalBtn = document.querySelector(".equal");
  #clearAll = document.querySelector(".clearAll");
  #deleteOne = document.querySelector(".deleteOne");
  #decimal = document.querySelector(".decimal");
  #plusMinus = document.querySelector(".plusMinus");
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
    this.#deleteOne.addEventListener(
      "click",
      this.#handleDeleteOneClick.bind(this)
    );
    this.#decimal.addEventListener(
      "click",
      this.#handleDecimalClick.bind(this)
    );
    this.#plusMinus.addEventListener(
      "click",
      this.#handlePlusMinusClick.bind(this)
    );
    window.addEventListener("keydown", this.#handleKeyPresses.bind(this));
  }
  #handleNumClick(e) {
    if (!this.#operator) {
      if (this.#answer || this.#answer === 0) {
        this.#init();
      }
      this.#currentNumberIsFirst = true;
      this.#firstNum += e.target.dataset.number || e.key;
    }
    if (this.#operator) {
      this.#currentNumberIsFirst = false;
      this.#secondNum += e.target.dataset.number || e.key;
    }
    this.#displayInput(e.target.dataset.number || e.key);
  }
  #handleOperatorClick(e) {
    if (!this.#firstNum) return;

    if (this.#operator && this.#secondNum)
      this.#operate(this.#operator, this.#firstNum, this.#secondNum);

    if (this.#operator) {
      this.#removeOneFromInputStr();
    }
    this.#currentNumberIsFirst = false;
    this.#operator = e.target.dataset.operator || e.key;
    this.#changeOperatorLook(this.#operator);
    this.#displayInput(`${this.#operator}`);
  }
  #handleEqualClick() {
    if (!this.#secondNum) return;
    this.#operate(this.#operator, this.#firstNum, this.#secondNum);
  }
  #handleDeleteOneClick() {
    this.#removeOneFromInputStr();
    this.#displayInput();
    if (this.#removedCharacter == this.#secondNum.at(-1)) {
      this.#secondNum = this.#secondNum.slice(0, -1);
    } else if (this.#removedCharacter == this.#operator.at(-1)) {
      this.#operator = this.#operator.slice(0, -1);
      if (!this.#operator) this.#currentNumberIsFirst = true;
    } else if (this.#removedCharacter == this.#firstNum.at(-1))
      this.#firstNum = this.#firstNum.slice(0, -1);
    else return;
  }
  #handleDecimalClick() {
    if (this.#currentNumberIsFirst) {
      if (!this.#firstNum) {
        this.#firstNum = "0.";
        this.#displayInput("0.");
      } else if (!this.#firstNum.includes(".")) {
        this.#firstNum += ".";
        this.#displayInput(".");
      }
    }
    if (!this.#currentNumberIsFirst) {
      if (!this.#secondNum) {
        this.#secondNum = "0.";
        this.#displayInput("0.");
      } else if (!this.#secondNum.includes(".")) {
        this.#secondNum += ".";
        this.#displayInput(".");
      }
    }
  }
  #handlePlusMinusClick() {
    if (this.#currentNumberIsFirst) {
      if (!this.#firstNum.includes("-")) {
        this.#temporaryNumber = [...this.#firstNum];
        this.#temporaryNumber.unshift("-");
        this.#firstNum = this.#temporaryNumber.join("");
        this.#renderMinusInInputStr();
      } else if (this.#firstNum.includes("-")) {
        this.#temporaryNumber = [...this.#firstNum];
        this.#temporaryNumber.shift();
        this.#firstNum = this.#temporaryNumber.join("");
        this.#removeMinusInInputStr();
      }
    }
    if (!this.#currentNumberIsFirst && this.#secondNum) {
      if (!this.#secondNum.includes("-")) {
        this.#temporaryNumber = [...this.#secondNum];
        this.#temporaryNumber.unshift("-");
        this.#secondNum = this.#temporaryNumber.join("");
        this.#renderMinusInInputStr(false);
      } else if (this.#secondNum.includes("-")) {
        this.#temporaryNumber = [...this.#secondNum];
        this.#temporaryNumber.shift();
        this.#secondNum = this.#temporaryNumber.join("");
        this.#removeMinusInInputStr(false);
      }
    }
  }

  #renderMinusInInputStr(firstNum = true) {
    this.#temporaryInputStr = [...this.#inputStr];
    if (firstNum) this.#temporaryInputStr.unshift("-");
    if (!firstNum)
      this.#temporaryInputStr.splice(-this.#secondNum.length + 1, 0, "-");

    this.#inputStr = this.#temporaryInputStr.join("");
    this.#displayInput();
  }
  #removeMinusInInputStr(firstNum = true) {
    this.#temporaryInputStr = [...this.#inputStr];
    if (firstNum) this.#temporaryInputStr.shift();
    if (!firstNum)
      this.#temporaryInputStr.splice(-this.#secondNum.length - 1, 1);
    this.#inputStr = this.#temporaryInputStr.join("");
    this.#displayInput();
  }
  #handleKeyPresses(e) {
    if (e.key === "Backspace" || e.key === "Delete")
      this.#handleDeleteOneClick();
    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*")
      this.#handleOperatorClick(e);
    else if (isFinite(e.key)) this.#handleNumClick(e);
    else if (e.key === "Enter" || e.key === "=") this.#handleEqualClick();
    else if (e.key === ".") this.#handleDecimalClick();
  }
  #changeOperatorLook(operator) {
    switch (operator) {
      case "+":
        this.#operator = "+";
        break;
      case "-":
        this.#operator = "-";
        break;
      case "*":
        this.#operator = "×";
        break;
      case "/":
        this.#operator = "÷";
        break;
    }
  }
  #init() {
    this.#firstNum = "";
    this.#secondNum = "";
    this.#input.textContent = "";
    this.#inputStr = "";
    this.#previousInput.textContent = "";
    this.#answer = "";
    this.#operator = "";
  }
  #removeOneFromInputStr() {
    this.#temporaryInputStr = [...this.#inputStr];
    this.#removedCharacter = this.#temporaryInputStr.splice(-1, 1);
    this.#inputStr = this.#temporaryInputStr.join("");
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
    if (
      (this.#firstNum == 0 || this.#secondNum == 0) &&
      this.#operator === "÷"
    ) {
      this.#init();
      this.#previousInput.textContent = "Can't divide by zero!";
      return;
    }
    switch (operator) {
      case "+":
        this.#answer = this.#add(num1, num2);
        break;
      case "-":
        this.#answer = this.#subtract(num1, num2);
        break;
      case "×":
        this.#answer = this.#multiply(num1, num2);
        break;
      case "÷":
        this.#answer = this.#divide(num1, num2);
        break;
    }
    this.#answer = +this.#answer.toFixed(10);
    this.#answer = this.#answer.toString();
    this.#previousInput.textContent = `${num1} ${operator} ${num2} =`;
    this.#inputStr = "";
    this.#displayInput(this.#answer);
    this.#firstNum = this.#answer;
    this.#currentNumberIsFirst = true;
    this.#secondNum = "";
    this.#operator = "";
  }
  #displayInput(input = "") {
    this.#inputStr += input;
    this.#input.textContent = this.#inputStr;
  }
}
const calculator = new Calculator();

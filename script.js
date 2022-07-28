class Calculator {
  #numbers = document.querySelectorAll("[data-number]");
  #operators = document.querySelectorAll("[data-operator]");
  #firstNum = "";
  #secondNum = "";
  #answer = "";
  #inputStr = "";
  #temporaryInputStr = "";
  #operator = "";
  #removedCharacter = "";
  #currentNumber = this.#firstNum; //By default
  #input = document.querySelector(".input");
  #previousInput = document.querySelector(".previous-input");
  #equalBtn = document.querySelector(".equal");
  #clearAll = document.querySelector(".clearAll");
  #deleteOne = document.querySelector(".deleteOne");
  #decimal = document.querySelector(".decimal");
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
    if (!this.#firstNum) return;

    if (this.#operator && this.#secondNum)
      this.#operate(this.#operator, this.#firstNum, this.#secondNum);

    if (this.#operator) {
      this.#removeOneFromInputStr();
    }
    this.#operator = e.target.dataset.operator;

    this.#displayInput(`${this.#operator}`);
  }
  #handleEqualClick() {
    if (!this.#secondNum) return;
    this.#operate(this.#operator, this.#firstNum, this.#secondNum);
  }
  #handleDeleteOneClick() {
    this.#removeOneFromInputStr();
    this.#displayInput();
    if (this.#removedCharacter == this.#secondNum.at(-1))
      this.#secondNum = this.#secondNum.slice(0, -1);
    else if (this.#removedCharacter == this.#operator.at(-1))
      this.#operator = this.#operator.slice(0, -1);
    else if (this.#removedCharacter == this.#firstNum.at(-1))
      this.#firstNum = this.#firstNum.slice(0, -1);
    else return;
  }
  #handleDecimalClick() {
    // if (!this.#firstNum) {
    //   this.#firstNum = "0.";
    //   this.#displayInput("0.");
    // }
    // else if (!this.#secondNum) {
    //   this.#secondNum = "0.";
    //   this.#displayInput("0.");
    // }
    // if (!this.#firstNum.includes(".")) {
    //   this.#firstNum += ".";
    //   this.#displayInput(".");
    // }
    // if (!this.#secondNum.includes(".")) {
    //   this.#secondNum += ".";
    //   this.#displayInput(".");
    // }
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
    // console.log(this.#inputStr, "paprastas");
    // console.log(Array(this.#inputStr), "Array");
    // console.log([...this.#inputStr], "irgi array");
    this.#temporaryInputStr = [...this.#inputStr];
    this.#removedCharacter = this.#temporaryInputStr.splice(-1, 1);
    this.#inputStr = this.#temporaryInputStr.join("");
    /*
    this.#inputStr = this.#inputStr.slice(0, -1);
    BETTER SOLUTION BUT I NEED TO KNOW REMOVED CHARACTER
*/
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
    //PRADĖTI NUO ČIA
    if (
      (this.#firstNum == 0 || this.#secondNum == 0) &&
      this.#operator === "÷"
    ) {
      // this.#input.textContent = "";
      // this.#inputStr = "";
      // this.#firstNum = "";
      // this.#secondNum = "";
      // this.#operator = "";
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
    this.#answer = this.#answer.toString();
    this.#previousInput.textContent = `${num1} ${operator} ${num2} =`;
    this.#inputStr = "";
    this.#displayInput(this.#answer);
    this.#firstNum = this.#answer;
    this.#secondNum = "";
    this.#operator = "";
  }
  #displayInput(input = "") {
    this.#inputStr += input;

    this.#input.textContent = this.#inputStr;
  }
  // #displayAnswer(answer) {
  //   // this.#input.textContent = answer;

  //   this.#inputStr = "";
  //   this.#displayInput(answer);
  // }
}
const calculator = new Calculator();
//ROUND NUMBERS

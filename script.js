class Calculator {
  #numbers = document.querySelectorAll("[data-number]");
  constructor() {
    this.addEventListenersToNum();
  }
  addEventListenersToNum() {
    this.#numbers.forEach((number) =>
      number.addEventListener("click", this.handleNumClick.bind(this))
    );
  }
  handleNumClick(e) {
    //FOR NOW
    console.log(e.target.dataset.number);
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
  #operate(operator, num1, num2) {}
}
const calculator = new Calculator();

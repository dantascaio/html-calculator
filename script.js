const display = document.getElementById("display");
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');
const equal = document.querySelector('[id*=igual]');
const decimals = document.querySelectorAll('[id*=decimal]');

let newNumber = true;
let operator;
let previousNumber;
let hasDecimals = false;

function updateDisplay(number){
    if(newNumber){
        display.textContent = number;
        newNumber = false;
    }
    else if(!hasDecimals || number != ",") {
        display.textContent += number;
    }
    
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

const selectOperator = (event) => {
    newNumber = true;
    hasDecimals = false;
    operator = event.target.textContent;
    previousNumber = replaceCommas(display.textContent);
}

const calculate = () => {
    display.textContent = display.textContent.replace(/,/g, '.');
    const actualNumber = display.textContent;
    let result = eval(`${previousNumber}${operator}${actualNumber}`); // template string, utilizando crase;
    newNumber = true;
    updateDisplay(replaceDots(result));
}

const decimalAdded = () => {
    number = ","
    if(newNumber){
        number = "0,";
    }
   updateDisplay(number);
   hasDecimals = true;
}

buttons.forEach((button) => button.addEventListener('click', insertNumber));
operators.forEach((operador) => operador.addEventListener('click', selectOperator));
decimals.forEach((decimal) => decimal.addEventListener('click', decimalAdded));
equal.addEventListener('click', calculate);


const clearDisplay = () => {
    display.textContent = "";
    hasDecimals = false;
};
document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);
const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}

function replaceCommas(number) {
    number = String(number);
    return number.replace(/,/g, '.');
}

function replaceDots(number) {
    number = String(number);
    return number.replace(/\./g, ',');
}

document.querySelector("#inverter").addEventListener("click", invertSignal);



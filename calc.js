function add(numArray) {
    return numArray.reduce((total, currentNum) => {
        return total + currentNum;
    }, 0);
}

function multiply(numArray) {
    return numArray.reduce((total, currentNum) => {
        return total * currentNum;
    }, 1);
}

function subtract(numArray) {
    if (array.length === 1) return total;
    return numArray.reduce((total, currentNum) => {
        return total - currentNum;
    });
}

function divide(numArray) {
    return numArray.reduce((total, currentNum, number, array) => {
        if (array.length === 1) return total;
        return total / currentNum;
    });
}

function operate(operator, numArray) {
    if (operator === '+') return add(numArray);
    else if (operator === '-') return subtract(numArray);
    else if (operator === '*') return multiply(numArray);
    else if (operator === '/') return divide(numArray);
}

const numberBtn = document.querySelectorAll('.button');
const display = document.querySelector('.display');
let displayValue = '';
let operator = '';
let numbers = [];
numberBtn.forEach(button => {
    displayValue.textContent = 0
    button.addEventListener('click', () => {
        if (display.textContent=== '0')  display.textContent = '';
        display.textContent += button.textContent;
        displayValue = Number(display.textContent);
        
    });
})

const operatorBtn = document.querySelectorAll('.operator');
operatorBtn.forEach(button => {

    button.addEventListener('click', () => {
        numbers.push(displayValue);
        operator = button.textContent;
        
        display.textContent = operate(operator, numbers);
        
    })
})    
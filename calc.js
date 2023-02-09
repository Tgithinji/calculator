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
    
    return numArray.reduce((total, currentNum, number, array) => {
        if (array.length === 1) return total;
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
const operatorBtn = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
let displayValue = '';
let operator = '';
let numbers = [];
let lastBtn = false;
numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            if (lastBtn) display.textContent = '0'
            if (display.textContent === '0') display.textContent = ''; 
            display.textContent += button.textContent;
            displayValue = Number(display.textContent);
            lastBtn = false;
        });
})


operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        numbers.push(displayValue);
        if (!operator) operator = button.textContent;
        let result = operate(operator, numbers);
        display.textContent = result;
        numbers = [result];
        operator = button.textContent;
        lastBtn = true;
    })
})   
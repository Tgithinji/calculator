// global variables
const numberBtn = document.querySelectorAll('.button');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const percentageBtn = document.querySelector('.percent');
const dotBtn = document.querySelector('.dot');
const negativeBtn = document.querySelector('.negative');
let displayValue = '';
let operator = '';
let numbers = [];
let lastBtn = false;
let equals = false;
let result;

// function to do the basic math
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

// event listener to add functionality to number buttons
numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            if (numbers && equals) {
                numbers = [];
                operator = '';
                equals = false;
            }
            if (display.textContent === '0' || lastBtn) display.textContent = ''; 
            display.textContent += button.textContent;
            displayValue = parseFloat(display.textContent);
            lastBtn = false;
        });
})

// event listener to add functionality to the operator buttons
operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (numbers && equals) {
            numbers = [result];
            operator = button.textContent;
            equals = false;
            return
        }
        numbers.push(displayValue);
        if (!operator) operator = button.textContent;
        result = operate(operator, numbers);
        display.textContent = Math.round(result * 100000) / 100000;
        numbers = [result];
        operator = button.textContent;
        lastBtn = true;
    })
})   

// event listener to add functionality to equals button
equalsBtn.addEventListener('click', () => {
    if (!equals) numbers.push(displayValue);
    if (!operator) operator = '+';
    result = operate(operator, numbers);
    display.textContent = Math.round(result * 100000) / 100000;
    numbers[0] = result;
    lastBtn = true;
    displayValue = parseFloat(display.textContent);
    equals = true
})

// add functionality to clear button
clearBtn.addEventListener('click', () => {
    operator = '';
    numbers = [];
    display.textContent = 0;
})

// function to add a decimal point to a number
dotBtn.addEventListener('click', () => {
    if (display.textContent.indexOf('.') > -1 || 
        display.textContent.indexOf('-') > -1) return;
    if (lastBtn) {
        display.textContent = '0.';
        lastBtn = false;
        return;
    }
    display.textContent += dotBtn.textContent; 
})

// function to turn a number to percentage
percentageBtn.addEventListener('click', () => {
    let num = display.textContent;
    display.textContent = num / 100;
    displayValue = parseFloat(display.textContent);
});

// function to make a negative value
negativeBtn.addEventListener('click', () => {
    const num = display.textContent;
    if (num === '0') {
        display.textContent = '-';
        return
    }
    if (lastBtn) {
        display.textContent = '-';
        lastBtn = false;
        return
    }
    if (!num.startsWith('-')) {
        display.textContent = '-' + num;
        displayValue = parseFloat(display.textContent);
    }
    else {
        display.textContent = num.replace('-', '');
        displayValue = parseFloat(display.textContent);
        if (!display.textContent) display.textContent = '0'
    }
})

// function to implement the backspace button
const backspaceBtn = document.querySelector('.backspace');
backspaceBtn.addEventListener('click', () => {
    let num = display.textContent;
    num = num.slice(0, -1);
    if (!num) display.textContent = '0';
    else display.textContent = num;
})

// Keyboard support feature
window.addEventListener('keydown', (e) => {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    if (!button) return;
    button.click();
})
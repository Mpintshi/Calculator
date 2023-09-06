const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondoperand: false,
    operator: null,
};
//Entering number
function inputDigit(digit) {
    const { displayValue, waitingForSecondoperand } = calculator;
    
if(waitingForSecondoperand === true){
    calculator.displayValue = digit;
    calculator.waitingForSecondoperand = false;
}else{
    calculator.displayValue = displayValue === '0' ?  digit : displayValue + digit;
    }
}
//Input decimals
function inputDecimal(dot){
    if(calculator.waitingForSecondoperand === true){
        calculator.displayValue = '0.';
        calculator.waitingForSecondoperand =false;
        return
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}
//
function handleOperator(nextOperator){
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);


    if(operator && calculator.waitingForSecondoperand){
        calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    }else if(operator){
        const result = calculator(firstOperand, inputValue, operator);

        calculator.displayValue = '${parseFloat(result.toFixed(7))}';
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondoperand = true;
    calculator.firstOperand = nextOperator;
}

//operators in a calculator
function calculator(firstOperand, SecondOperand, operator){
    if(operator === '+'){
        return firstOperand + SecondOperand;
    }else if(operator === '-'){
        return firstOperand - SecondOperand;
    }else if(operator === '*'){
        return firstOperand * SecondOperand;
    }else if(operator === '/'){
        return firstOperand / SecondOperand;
    }
    return SecondOperand;
}

//Resert
function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondoperand = false;
    calculator.operator = null;
}

function updateDisplay(){
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if(!target.matches('button')){
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
          default:
            if (Number.isInteger(parseFloat(value))) {
                 inputDigit(value);
            }
    }
    updateDisplay();
});
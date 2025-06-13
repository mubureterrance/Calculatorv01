// Calculator state
let currentInput = '';
let lastResult = null;
let memory = 0;

// Safe calculation function to replace eval()
function safeCalculate(expression) {
    // Remove any whitespace
    expression = expression.replace(/\s+/g, '');
    
    // Validate expression
    if (!/^[0-9+\-*/.()]+$/.test(expression)) {
        throw new Error('Invalid characters in expression');
    }

    // Split the expression into tokens
    const tokens = expression.match(/(\d*\.?\d+|[+\-*/()])/g) || [];
    
    // Convert to Reverse Polish Notation (RPN) using Shunting Yard algorithm
    const output = [];
    const operators = [];
    
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    for (const token of tokens) {
        if (/^\d*\.?\d+$/.test(token)) {
            output.push(parseFloat(token));
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            if (operators.pop() !== '(') {
                throw new Error('Mismatched parentheses');
            }
        } else {
            while (operators.length && 
                   operators[operators.length - 1] !== '(' && 
                   precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        const operator = operators.pop();
        if (operator === '(') {
            throw new Error('Mismatched parentheses');
        }
        output.push(operator);
    }

    // Evaluate RPN
    const stack = [];
    for (const token of output) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (typeof a === 'undefined' || typeof b === 'undefined') {
                throw new Error('Invalid expression');
            }
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': 
                    if (b === 0) throw new Error('Division by zero');
                    stack.push(a / b); 
                    break;
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return stack[0];
}

// Input handling functions
function appendValue(value) {
    const display = document.getElementById("display");
    
    // If we have a result displayed and user starts a new calculation
    if (lastResult !== null && !['+', '-', '*', '/', '(', ')'].includes(value)) {
        currentInput = '';
        lastResult = null;
    }
    
    // Prevent multiple decimal points
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Prevent multiple operators
    if (['+', '-', '*', '/'].includes(value)) {
        const lastChar = currentInput.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            currentInput = currentInput.slice(0, -1);
        }
    }

    currentInput += value;
    display.value = currentInput;
    display.classList.remove('error');
}

function clearDisplay() {
    currentInput = '';
    document.getElementById("display").value = '';
    document.getElementById("display").classList.remove('error');
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById("display").value = currentInput;
    document.getElementById("display").classList.remove('error');
}

function calculateResult() {
    const display = document.getElementById("display");
    try {
        if (!currentInput) return;
        
        const result = safeCalculate(currentInput);
        // Format the result to avoid floating point issues
        const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
        display.value = formattedResult;
        lastResult = formattedResult;
        currentInput = formattedResult.toString();
        display.classList.remove('error');
    } catch (error) {
        display.value = error.message;
        display.classList.add('error');
        currentInput = '';
    }
}

// Memory functions
function memoryAdd() {
    try {
        const value = parseFloat(document.getElementById("display").value);
        if (!isNaN(value)) {
            memory += value;
            showMemoryNotification('M+');
        }
    } catch (error) {
        showError('Invalid value for memory');
    }
}

function memorySubtract() {
    try {
        const value = parseFloat(document.getElementById("display").value);
        if (!isNaN(value)) {
            memory -= value;
            showMemoryNotification('M-');
        }
    } catch (error) {
        showError('Invalid value for memory');
    }
}

function memoryRecall() {
    if (memory !== 0) {
        currentInput = memory.toString();
        document.getElementById("display").value = currentInput;
    }
}

function memoryClear() {
    memory = 0;
    showMemoryNotification('MC');
}

function showMemoryNotification(action) {
    const notification = document.createElement('div');
    notification.className = 'memory-notification';
    notification.textContent = action;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 1000);
}

function showError(message) {
    const display = document.getElementById("display");
    display.value = message;
    display.classList.add('error');
    setTimeout(() => {
        display.classList.remove('error');
        display.value = currentInput;
    }, 2000);
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Prevent default for calculator keys
    if (/[\d+\-*/.=]/.test(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
        event.preventDefault();
    }

    switch (key) {
        case 'Enter':
        case '=':
            calculateResult();
            break;
        case 'Escape':
            clearDisplay();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Delete':
            clearDisplay();
            break;
        default:
            if (/[\d+\-*/.]/.test(key)) {
                appendValue(key);
            }
    }
});

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem('darkMode', isDarkMode);
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').checked = true;
    }
});

/**
 * @fileoverview Calculator engine module for handling mathematical calculations.
 * Implements the Shunting Yard algorithm for expression parsing and evaluation.
 */

/**
 * CalculatorEngine class for handling mathematical calculations.
 * Uses Reverse Polish Notation (RPN) for safe and accurate calculations.
 * @class CalculatorEngine
 * @example
 * const engine = new CalculatorEngine();
 * const result = engine.calculate('2 + 2 * 3'); // Returns 8
 */
export class CalculatorEngine {
    /**
     * Creates a new CalculatorEngine instance.
     * Initializes the operator definitions with their precedence and operations.
     * @constructor
     */
    constructor() {
        /** @private {Object} Operator definitions with precedence and operations */
        this.operators = {
            '+': { precedence: 1, operation: (a, b) => a + b },
            '-': { precedence: 1, operation: (a, b) => a - b },
            '*': { precedence: 2, operation: (a, b) => a * b },
            '/': { precedence: 2, operation: (a, b) => {
                if (b === 0) throw new Error('Division by zero');
                return a / b;
            }}
        };
    }

    /**
     * Calculates the result of a mathematical expression.
     * @param {string} expression - The mathematical expression to evaluate
     * @returns {number} The calculated result
     * @throws {Error} If the expression is invalid or contains errors
     * @example
     * engine.calculate('2 + 2'); // Returns 4
     * engine.calculate('(1 + 2) * 3'); // Returns 9
     */
    calculate(expression) {
        // Remove any whitespace
        expression = expression.replace(/\s+/g, '');
        
        // Validate expression
        if (!/^[0-9+\-*/.()]+$/.test(expression)) {
            throw new Error('Invalid characters in expression');
        }

        // Convert to Reverse Polish Notation (RPN)
        const rpn = this.toRPN(expression);
        
        // Evaluate RPN
        return this.evaluateRPN(rpn);
    }

    /**
     * Converts an infix expression to Reverse Polish Notation (RPN).
     * Uses the Shunting Yard algorithm.
     * @private
     * @param {string} expression - The infix expression to convert
     * @returns {Array} The expression in RPN format
     * @throws {Error} If the expression contains mismatched parentheses
     */
    toRPN(expression) {
        const output = [];
        const operators = [];
        
        // Split the expression into tokens
        const tokens = expression.match(/(\d*\.?\d+|[+\-*/()])/g) || [];
        
        for (const token of tokens) {
            if (/^\d*\.?\d+$/.test(token)) {
                // If token is a number, add to output
                output.push(parseFloat(token));
            } else if (token === '(') {
                // If token is opening parenthesis, push to operators stack
                operators.push(token);
            } else if (token === ')') {
                // If token is closing parenthesis, pop operators until matching '('
                while (operators.length && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                if (operators.pop() !== '(') {
                    throw new Error('Mismatched parentheses');
                }
            } else {
                // If token is an operator
                const currentOperator = this.operators[token];
                while (
                    operators.length && 
                    operators[operators.length - 1] !== '(' && 
                    this.operators[operators[operators.length - 1]]?.precedence >= currentOperator.precedence
                ) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }

        // Pop remaining operators
        while (operators.length) {
            const operator = operators.pop();
            if (operator === '(') {
                throw new Error('Mismatched parentheses');
            }
            output.push(operator);
        }

        return output;
    }

    /**
     * Evaluates an expression in Reverse Polish Notation.
     * @private
     * @param {Array} rpn - The expression in RPN format
     * @returns {number} The calculated result
     * @throws {Error} If the expression is invalid
     */
    evaluateRPN(rpn) {
        const stack = [];
        
        for (const token of rpn) {
            if (typeof token === 'number') {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();
                
                if (typeof a === 'undefined' || typeof b === 'undefined') {
                    throw new Error('Invalid expression');
                }
                
                const operator = this.operators[token];
                if (!operator) {
                    throw new Error('Invalid operator');
                }
                
                stack.push(operator.operation(a, b));
            }
        }

        if (stack.length !== 1) {
            throw new Error('Invalid expression');
        }

        // Format the result to avoid floating point issues
        const result = stack[0];
        return Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    }

    /**
     * Checks if a string represents a valid number.
     * @param {string} value - The string to check
     * @returns {boolean} True if the string is a valid number
     * @example
     * engine.isValidNumber('123'); // Returns true
     * engine.isValidNumber('abc'); // Returns false
     */
    isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
} 
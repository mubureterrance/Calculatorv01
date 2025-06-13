/**
 * @fileoverview Main Calculator class that coordinates all calculator operations.
 * This class serves as the central controller for the calculator application,
 * managing the interaction between different modules.
 */

import { Display } from './Display.js';
import { Keypad } from './Keypad.js';
import { Memory } from './Memory.js';
import { ThemeManager } from './ThemeManager.js';
import { CalculatorEngine } from './CalculatorEngine.js';

/**
 * Main Calculator class that coordinates all calculator operations.
 * @class Calculator
 * @example
 * // Create a new calculator instance
 * const calculator = new Calculator();
 */
export class Calculator {
    /**
     * Creates a new Calculator instance.
     * Initializes all necessary modules and sets up the calculator state.
     * @constructor
     */
    constructor() {
        /** @private {Display} The display module instance */
        this.display = new Display();
        
        /** @private {Keypad} The keypad module instance */
        this.keypad = new Keypad(this);
        
        /** @private {Memory} The memory module instance */
        this.memory = new Memory();
        
        /** @private {ThemeManager} The theme manager instance */
        this.themeManager = new ThemeManager();
        
        /** @private {CalculatorEngine} The calculation engine instance */
        this.engine = new CalculatorEngine();
        
        /** @private {string} Current input string */
        this.currentInput = '';
        
        /** @private {number|null} Last calculation result */
        this.lastResult = null;
        
        this.initialize();
    }

    /**
     * Initializes all calculator components and sets up event listeners.
     * @private
     */
    initialize() {
        this.display.initialize();
        this.keypad.initialize();
        this.memory.initialize();
        this.themeManager.initialize();
        this.setupEventListeners();
    }

    /**
     * Sets up keyboard event listeners for calculator operations.
     * @private
     */
    setupEventListeners() {
        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event));
    }

    /**
     * Handles keyboard input for calculator operations.
     * @private
     * @param {KeyboardEvent} event - The keyboard event object
     */
    handleKeyboardInput(event) {
        const key = event.key;
        
        if (/[\d+\-*/.=]/.test(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
            event.preventDefault();
        }

        switch (key) {
            case 'Enter':
            case '=':
                this.calculate();
                break;
            case 'Escape':
                this.clear();
                break;
            case 'Backspace':
                this.backspace();
                break;
            case 'Delete':
                this.clear();
                break;
            default:
                if (/[\d+\-*/.]/.test(key)) {
                    this.appendValue(key);
                }
        }
    }

    /**
     * Appends a value to the current input.
     * Handles special cases like starting a new calculation after a result.
     * @param {string} value - The value to append
     * @example
     * calculator.appendValue('5'); // Appends 5 to current input
     * calculator.appendValue('+'); // Appends + operator
     */
    appendValue(value) {
        if (this.lastResult !== null && !['+', '-', '*', '/', '(', ')'].includes(value)) {
            this.currentInput = '';
            this.lastResult = null;
        }
        
        if (value === '.' && this.currentInput.includes('.')) {
            return;
        }
        
        if (['+', '-', '*', '/'].includes(value)) {
            const lastChar = this.currentInput.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                this.currentInput = this.currentInput.slice(0, -1);
            }
        }

        this.currentInput += value;
        this.display.update(this.currentInput);
    }

    /**
     * Clears the current input and result.
     * @example
     * calculator.clear(); // Clears the display and resets the calculator state
     */
    clear() {
        this.currentInput = '';
        this.lastResult = null;
        this.display.clear();
    }

    /**
     * Removes the last character from the current input.
     * @example
     * calculator.backspace(); // Removes the last entered character
     */
    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.display.update(this.currentInput);
    }

    /**
     * Calculates the result of the current input expression.
     * @throws {Error} If the expression is invalid or contains errors
     * @example
     * calculator.appendValue('2+2');
     * calculator.calculate(); // Returns 4
     */
    calculate() {
        try {
            if (!this.currentInput) return;
            
            const result = this.engine.calculate(this.currentInput);
            this.lastResult = result;
            this.currentInput = result.toString();
            this.display.update(result);
        } catch (error) {
            this.display.showError(error.message);
            this.currentInput = '';
        }
    }

    /**
     * Adds the current display value to memory.
     * @throws {Error} If the current value is invalid
     * @example
     * calculator.appendValue('5');
     * calculator.memoryAdd(); // Adds 5 to memory
     */
    memoryAdd() {
        try {
            const value = parseFloat(this.display.getValue());
            if (!isNaN(value)) {
                this.memory.add(value);
                this.display.showNotification('M+');
            }
        } catch (error) {
            this.display.showError('Invalid value for memory');
        }
    }

    /**
     * Subtracts the current display value from memory.
     * @throws {Error} If the current value is invalid
     * @example
     * calculator.appendValue('3');
     * calculator.memorySubtract(); // Subtracts 3 from memory
     */
    memorySubtract() {
        try {
            const value = parseFloat(this.display.getValue());
            if (!isNaN(value)) {
                this.memory.subtract(value);
                this.display.showNotification('M-');
            }
        } catch (error) {
            this.display.showError('Invalid value for memory');
        }
    }

    /**
     * Recalls the value from memory to the display.
     * @example
     * calculator.memoryRecall(); // Displays the value stored in memory
     */
    memoryRecall() {
        const value = this.memory.recall();
        if (value !== null) {
            this.currentInput = value.toString();
            this.display.update(value);
        }
    }

    /**
     * Clears the memory value.
     * @example
     * calculator.memoryClear(); // Clears the stored memory value
     */
    memoryClear() {
        this.memory.clear();
        this.display.showNotification('MC');
    }

    /**
     * Toggles between light and dark themes.
     * @example
     * calculator.toggleTheme(); // Switches between light and dark mode
     */
    toggleTheme() {
        this.themeManager.toggle();
    }
} 
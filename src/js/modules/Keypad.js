/**
 * @fileoverview Keypad module for managing calculator button interactions.
 * Handles button creation, event handling, and keyboard input mapping.
 */

/**
 * Keypad class for managing calculator button interactions.
 * Creates and manages calculator buttons, handles click events, and maps keyboard inputs.
 * @class Keypad
 * @example
 * const keypad = new Keypad(display, calculator);
 * keypad.initialize(); // Creates and sets up all calculator buttons
 */
export class Keypad {
    /**
     * Creates a new Keypad instance.
     * @param {Display} display - The calculator display instance
     * @param {Calculator} calculator - The calculator instance
     * @constructor
     */
    constructor(display, calculator) {
        /** @private {Display} Reference to the calculator display */
        this.display = display;
        
        /** @private {Calculator} Reference to the calculator instance */
        this.calculator = calculator;
        
        /** @private {Object} Mapping of keyboard keys to calculator buttons */
        this.keyMap = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '.': '.', '+': '+', '-': '-', '*': '×', '/': '÷',
            'Enter': '=', 'Escape': 'C', 'Backspace': '⌫',
            'Delete': 'C', 'c': 'C', '=': '='
        };

        /** @private {Object} Button configuration for different button types */
        this.buttonConfig = {
            number: { className: 'number' },
            operator: { className: 'operator' },
            function: { className: 'function' },
            equals: { className: 'equals' },
            clear: { className: 'clear' }
        };
    }

    /**
     * Initializes the keypad by creating all calculator buttons.
     * Sets up event listeners for both click and keyboard events.
     * @example
     * keypad.initialize(); // Creates and sets up all calculator buttons
     */
    initialize() {
        this.createButtons();
        this.setupEventListeners();
    }

    /**
     * Creates all calculator buttons and adds them to the keypad container.
     * @private
     */
    createButtons() {
        const buttonLayout = [
            ['C', '⌫', '%', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '=']
        ];

        const keypadContainer = document.querySelector('.keypad');
        if (!keypadContainer) {
            throw new Error('Keypad container not found');
        }

        buttonLayout.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'keypad-row';
            
            row.forEach(buttonText => {
                const button = this.createButton(buttonText);
                rowElement.appendChild(button);
            });
            
            keypadContainer.appendChild(rowElement);
        });
    }

    /**
     * Creates a single calculator button.
     * @param {string} text - The text to display on the button
     * @returns {HTMLButtonElement} The created button element
     * @private
     */
    createButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.value = text;
        
        // Apply appropriate styling based on button type
        if (text === '=') {
            Object.assign(button, this.buttonConfig.equals);
        } else if (['C', '⌫', '%'].includes(text)) {
            Object.assign(button, this.buttonConfig.function);
        } else if (['+', '-', '×', '÷'].includes(text)) {
            Object.assign(button, this.buttonConfig.operator);
        } else if (text === 'C') {
            Object.assign(button, this.buttonConfig.clear);
        } else {
            Object.assign(button, this.buttonConfig.number);
        }

        return button;
    }

    /**
     * Sets up event listeners for button clicks and keyboard input.
     * @private
     */
    setupEventListeners() {
        // Button click events
        document.querySelectorAll('.keypad button').forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button));
        });

        // Keyboard events
        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event));
    }

    /**
     * Handles button click events.
     * @param {HTMLButtonElement} button - The clicked button element
     * @private
     */
    handleButtonClick(button) {
        const value = button.dataset.value;
        this.processInput(value);
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }

    /**
     * Handles keyboard input events.
     * @param {KeyboardEvent} event - The keyboard event
     * @private
     */
    handleKeyboardInput(event) {
        const key = event.key;
        const mappedValue = this.keyMap[key];
        
        if (mappedValue) {
            event.preventDefault();
            this.processInput(mappedValue);
            
            // Visual feedback for keyboard input
            const button = document.querySelector(`button[data-value="${mappedValue}"]`);
            if (button) {
                button.classList.add('active');
                setTimeout(() => button.classList.remove('active'), 100);
            }
        }
    }

    /**
     * Processes input from either button clicks or keyboard.
     * @param {string} value - The input value to process
     * @private
     */
    processInput(value) {
        switch (value) {
            case 'C':
                this.calculator.clear();
                break;
            case '⌫':
                this.calculator.backspace();
                break;
            case '=':
                this.calculator.calculate();
                break;
            default:
                this.calculator.appendInput(value);
        }
    }

    /**
     * Gets the current keyboard mapping.
     * @returns {Object} The current key mapping object
     * @example
     * const mapping = keypad.getKeyMap();
     * // Returns { '0': '0', '1': '1', ... }
     */
    getKeyMap() {
        return { ...this.keyMap };
    }

    /**
     * Updates the keyboard mapping.
     * @param {Object} newKeyMap - The new key mapping object
     * @throws {Error} If the new key map is invalid
     * @example
     * keypad.updateKeyMap({
     *     'Enter': '=',
     *     'Escape': 'C'
     * });
     */
    updateKeyMap(newKeyMap) {
        if (typeof newKeyMap !== 'object' || newKeyMap === null) {
            throw new Error('Invalid key map provided');
        }
        this.keyMap = { ...this.keyMap, ...newKeyMap };
    }
} 
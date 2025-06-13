/**
 * @fileoverview Manages the calculator keypad and button interactions.
 */

/**
 * Class representing the calculator keypad.
 */
export class Keypad {
    /**
     * Creates a new Keypad instance.
     * @param {Display} display - The display module instance
     * @param {Calculator} calculator - The calculator instance
     */
    constructor(display, calculator) {
        /** @private {Display} The display module instance */
        this.display = display;
        
        /** @private {Calculator} The calculator instance */
        this.calculator = calculator;
        
        /** @private {Object} Button definitions */
        this.buttons = {
            // Memory buttons
            'M+': { type: 'memory', value: 'M+', order: 0 },
            'M-': { type: 'memory', value: 'M-', order: 1 },
            'MR': { type: 'memory', value: 'MR', order: 2 },
            'MC': { type: 'memory', value: 'MC', order: 3 },
            
            // Functions
            'C': { type: 'function', value: 'C', order: 4 },
            '⌫': { type: 'function', value: '⌫', order: 5 },
            '(': { type: 'function', value: '(', order: 6 },
            ')': { type: 'function', value: ')', order: 7 },
            
            // Numbers and operations
            '7': { type: 'number', value: '7', order: 8 },
            '8': { type: 'number', value: '8', order: 9 },
            '9': { type: 'number', value: '9', order: 10 },
            '/': { type: 'operation', value: '/', order: 11 },
            
            '4': { type: 'number', value: '4', order: 12 },
            '5': { type: 'number', value: '5', order: 13 },
            '6': { type: 'number', value: '6', order: 14 },
            '*': { type: 'operation', value: '*', order: 15 },
            
            '1': { type: 'number', value: '1', order: 16 },
            '2': { type: 'number', value: '2', order: 17 },
            '3': { type: 'number', value: '3', order: 18 },
            '-': { type: 'operation', value: '-', order: 19 },
            
            '0': { type: 'number', value: '0', order: 20 },
            '.': { type: 'number', value: '.', order: 21 },
            '=': { type: 'function', value: '=', order: 22 },
            '+': { type: 'operation', value: '+', order: 23 }
        };
        
        this.initialize();
    }

    /**
     * Initializes the keypad by creating buttons and setting up event listeners.
     * @private
     */
    initialize() {
        const keypadContainer = document.querySelector('.calculator-keypad');
        if (!keypadContainer) {
            console.error('Keypad container not found');
            return;
        }

        // Clear any existing buttons
        keypadContainer.innerHTML = '';

        // Create memory buttons container
        const memoryContainer = document.createElement('div');
        memoryContainer.className = 'calculator-memory-buttons';
        keypadContainer.appendChild(memoryContainer);

        // Create main buttons container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'calculator-main-buttons';
        keypadContainer.appendChild(mainContainer);

        // Sort buttons by order
        const sortedButtons = Object.entries(this.buttons)
            .sort(([, a], [, b]) => a.order - b.order);

        // Create buttons
        sortedButtons.forEach(([key, button]) => {
            const buttonElement = document.createElement('button');
            buttonElement.textContent = button.value;
            buttonElement.dataset.type = button.type;
            buttonElement.dataset.value = button.value;
            buttonElement.classList.add('calculator-button');
            
            // Add specific classes based on button type
            switch (button.type) {
                case 'number':
                    buttonElement.classList.add('number-button');
                    break;
                case 'operation':
                    buttonElement.classList.add('operation-button');
                    break;
                case 'function':
                    buttonElement.classList.add('function-button');
                    break;
                case 'memory':
                    buttonElement.classList.add('memory-button');
                    break;
            }
            
            // Add click event listener
            buttonElement.addEventListener('click', () => {
                this.handleButtonClick(button.value);
            });
            
            // Add to appropriate container
            if (button.type === 'memory') {
                memoryContainer.appendChild(buttonElement);
            } else {
                mainContainer.appendChild(buttonElement);
            }
        });

        // Add keyboard event listener
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });
    }

    /**
     * Handles button click events.
     * @param {string} value - The button value
     * @private
     */
    handleButtonClick(value) {
        switch (value) {
            case 'M+':
                this.calculator.memoryAdd();
                break;
            case 'M-':
                this.calculator.memorySubtract();
                break;
            case 'MR':
                this.calculator.memoryRecall();
                break;
            case 'MC':
                this.calculator.memoryClear();
                break;
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
                this.calculator.appendValue(value);
        }
    }

    /**
     * Handles keyboard input events.
     * @param {KeyboardEvent} event - The keyboard event
     * @private
     */
    handleKeyboardInput(event) {
        const key = event.key;
        
        // Prevent default behavior for calculator keys
        if (this.isCalculatorKey(key)) {
            event.preventDefault();
        }
        
        // Map keyboard keys to calculator functions
        const keyMap = {
            'Enter': '=',
            'Escape': 'C',
            'Backspace': '⌫',
            'Delete': 'C'
        };
        
        const value = keyMap[key] || key;
        if (this.buttons[value]) {
            this.handleButtonClick(value);
        }
    }

    /**
     * Checks if a keyboard key is used by the calculator.
     * @param {string} key - The keyboard key
     * @returns {boolean} True if the key is used by the calculator
     * @private
     */
    isCalculatorKey(key) {
        return Object.keys(this.buttons).includes(key) ||
               ['Enter', 'Escape', 'Backspace', 'Delete'].includes(key);
    }
} 
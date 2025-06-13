/**
 * @fileoverview Display module for managing calculator display and notifications.
 * Handles all display-related operations including updates, errors, and notifications.
 */

/**
 * Display class for managing calculator display and user feedback.
 * @class Display
 * @example
 * const display = new Display();
 * display.initialize();
 * display.update('123'); // Updates display with "123"
 */
export class Display {
    /**
     * Creates a new Display instance.
     * @constructor
     */
    constructor() {
        /** @private {HTMLInputElement|null} The display input element */
        this.displayElement = null;
        
        /** @private {number|null} Timeout ID for notification removal */
        this.notificationTimeout = null;
    }

    /**
     * Initializes the display by getting the display element.
     * @throws {Error} If display element is not found
     * @example
     * display.initialize();
     */
    initialize() {
        this.displayElement = document.getElementById('display');
        if (!this.displayElement) {
            throw new Error('Display element not found');
        }
    }

    /**
     * Updates the display with a new value.
     * @param {string|number} value - The value to display
     * @example
     * display.update('123'); // Shows "123" on display
     * display.update(45.67); // Shows "45.67" on display
     */
    update(value) {
        if (this.displayElement) {
            this.displayElement.value = value;
            this.displayElement.classList.remove('error');
        }
    }

    /**
     * Clears the display and removes any error state.
     * @example
     * display.clear(); // Clears the display
     */
    clear() {
        if (this.displayElement) {
            this.displayElement.value = '';
            this.displayElement.classList.remove('error');
        }
    }

    /**
     * Gets the current display value.
     * @returns {string} The current display value
     * @example
     * const value = display.getValue(); // Returns current display value
     */
    getValue() {
        return this.displayElement ? this.displayElement.value : '';
    }

    /**
     * Shows an error message on the display.
     * The error state is automatically cleared after 2 seconds.
     * @param {string} message - The error message to display
     * @example
     * display.showError('Division by zero'); // Shows error for 2 seconds
     */
    showError(message) {
        if (this.displayElement) {
            this.displayElement.value = message;
            this.displayElement.classList.add('error');
            
            setTimeout(() => {
                this.displayElement.classList.remove('error');
            }, 2000);
        }
    }

    /**
     * Shows a temporary notification message.
     * The notification is automatically removed after animation.
     * @param {string} message - The notification message
     * @example
     * display.showNotification('M+'); // Shows memory add notification
     */
    showNotification(message) {
        this.clearNotification();

        const notification = document.createElement('div');
        notification.className = 'memory-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        this.notificationTimeout = setTimeout(() => {
            notification.remove();
        }, 1000);
    }

    /**
     * Clears any existing notification.
     * @private
     */
    clearNotification() {
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = null;
        }
        
        const existingNotification = document.querySelector('.memory-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
    }

    /**
     * Formats a number for display with appropriate separators and precision.
     * @param {number} value - The number to format
     * @returns {string} The formatted number string
     * @example
     * display.formatNumber(1234.5678); // Returns "1,234.5678"
     * display.formatNumber(1000000); // Returns "1,000,000"
     */
    formatNumber(value) {
        if (typeof value !== 'number') {
            return value;
        }

        if (Number.isInteger(value)) {
            return value.toLocaleString();
        }

        return value.toLocaleString(undefined, {
            maximumFractionDigits: 8,
            minimumFractionDigits: 0
        });
    }
} 
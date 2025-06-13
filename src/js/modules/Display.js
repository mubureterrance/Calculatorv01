/**
 * @fileoverview Manages the calculator display and notifications.
 */

/**
 * Class representing the calculator display.
 */
export class Display {
    /**
     * Creates a new Display instance.
     */
    constructor() {
        /** @private {HTMLElement|null} The main display element */
        this.displayElement = null;
        
        /** @private {HTMLElement|null} The notification element */
        this.notificationElement = null;
        
        this.initialize();
    }

    /**
     * Initializes the display by getting DOM elements.
     * @private
     */
    initialize() {
        this.displayElement = document.querySelector('.calculator-display');
        this.notificationElement = document.querySelector('.calculator-notification');
        
        if (!this.displayElement) {
            console.error('Display element not found');
        }
        if (!this.notificationElement) {
            console.error('Notification element not found');
        }
    }

    /**
     * Updates the display with a new value.
     * @param {number|string} value - The value to display
     */
    update(value) {
        if (!this.displayElement) return;
        
        const formattedValue = this.formatNumber(value);
        this.displayElement.textContent = formattedValue;
    }

    /**
     * Clears the display.
     */
    clear() {
        if (!this.displayElement) return;
        this.displayElement.textContent = '0';
    }

    /**
     * Gets the current display value.
     * @returns {string} The current display value
     */
    getValue() {
        return this.displayElement ? this.displayElement.textContent : '0';
    }

    /**
     * Shows an error message.
     * @param {string} message - The error message to display
     */
    showError(message) {
        if (!this.notificationElement) return;
        
        this.notificationElement.textContent = message;
        this.notificationElement.classList.add('error');
        this.notificationElement.classList.remove('notification');
        
        // Clear error after 3 seconds
        setTimeout(() => this.clearNotification(), 3000);
    }

    /**
     * Shows a notification message.
     * @param {string} message - The notification message to display
     */
    showNotification(message) {
        if (!this.notificationElement) return;
        
        this.notificationElement.textContent = message;
        this.notificationElement.classList.add('notification');
        this.notificationElement.classList.remove('error');
        
        // Clear notification after 1 second
        setTimeout(() => this.clearNotification(), 1000);
    }

    /**
     * Clears the notification.
     */
    clearNotification() {
        if (!this.notificationElement) return;
        
        this.notificationElement.textContent = '';
        this.notificationElement.classList.remove('notification', 'error');
    }

    /**
     * Formats a number for display.
     * @param {number|string} value - The value to format
     * @returns {string} The formatted number
     * @private
     */
    formatNumber(value) {
        if (typeof value === 'string') {
            return value;
        }
        
        // Handle very large or small numbers
        if (Math.abs(value) >= 1e9 || (Math.abs(value) < 1e-9 && value !== 0)) {
            return value.toExponential(8);
        }
        
        // Format regular numbers
        const formatted = value.toString();
        if (formatted.includes('.')) {
            const [integer, decimal] = formatted.split('.');
            return `${this.formatInteger(integer)}.${decimal}`;
        }
        
        return this.formatInteger(formatted);
    }

    /**
     * Formats an integer with thousands separators.
     * @param {string} integer - The integer to format
     * @returns {string} The formatted integer
     * @private
     */
    formatInteger(integer) {
        const isNegative = integer.startsWith('-');
        const digits = isNegative ? integer.slice(1) : integer;
        
        const parts = [];
        for (let i = digits.length; i > 0; i -= 3) {
            parts.unshift(digits.slice(Math.max(0, i - 3), i));
        }
        
        return (isNegative ? '-' : '') + parts.join(',');
    }
} 
/**
 * @fileoverview Memory module for managing calculator memory operations.
 * Handles memory storage, retrieval, and persistence.
 */

/**
 * Memory class for managing calculator memory operations.
 * Provides functionality for storing, retrieving, and manipulating memory values.
 * @class Memory
 * @example
 * const memory = new Memory();
 * memory.add(5); // Adds 5 to memory
 * memory.recall(); // Returns 5
 */
export class Memory {
    /**
     * Creates a new Memory instance.
     * Initializes memory value and loads any saved value from storage.
     * @constructor
     */
    constructor() {
        /** @private {number} Current memory value */
        this.value = 0;
        this.initialize();
    }

    /**
     * Initializes the memory module.
     * Loads any previously saved memory value from localStorage.
     * @example
     * memory.initialize(); // Loads saved memory value if any
     */
    initialize() {
        // Load memory value from localStorage if available
        const savedMemory = localStorage.getItem('calculatorMemory');
        if (savedMemory !== null) {
            this.value = parseFloat(savedMemory);
        }
    }

    /**
     * Adds a value to the current memory value.
     * @param {number} value - The value to add to memory
     * @example
     * memory.add(10); // Adds 10 to current memory value
     */
    add(value) {
        this.value += value;
        this.save();
    }

    /**
     * Subtracts a value from the current memory value.
     * @param {number} value - The value to subtract from memory
     * @example
     * memory.subtract(5); // Subtracts 5 from current memory value
     */
    subtract(value) {
        this.value -= value;
        this.save();
    }

    /**
     * Recalls the current memory value.
     * @returns {number|null} The current memory value, or null if memory is empty
     * @example
     * const value = memory.recall(); // Returns current memory value
     */
    recall() {
        return this.value !== 0 ? this.value : null;
    }

    /**
     * Clears the memory value.
     * @example
     * memory.clear(); // Resets memory to 0
     */
    clear() {
        this.value = 0;
        this.save();
    }

    /**
     * Saves the current memory value to localStorage.
     * @private
     */
    save() {
        // Save memory value to localStorage
        localStorage.setItem('calculatorMemory', this.value.toString());
    }

    /**
     * Gets the current memory value.
     * @returns {number} The current memory value
     * @example
     * const value = memory.getValue(); // Returns current memory value
     */
    getValue() {
        return this.value;
    }

    /**
     * Checks if memory has a non-zero value.
     * @returns {boolean} True if memory has a non-zero value
     * @example
     * if (memory.hasValue()) {
     *     // Memory contains a value
     * }
     */
    hasValue() {
        return this.value !== 0;
    }
} 
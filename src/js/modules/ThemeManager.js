/**
 * @fileoverview ThemeManager module for handling calculator theme management.
 * Provides functionality for theme switching, persistence, and customization.
 */

/**
 * ThemeManager class for managing calculator themes.
 * Handles theme switching, persistence, and provides theme-related utilities.
 * @class ThemeManager
 * @example
 * const themeManager = new ThemeManager();
 * themeManager.setTheme('dark'); // Switches to dark theme
 * themeManager.toggleTheme(); // Toggles between light and dark themes
 */
export class ThemeManager {
    /**
     * Creates a new ThemeManager instance.
     * Initializes available themes and loads the saved theme preference.
     * @constructor
     */
    constructor() {
        /** @private {Object} Available themes with their CSS variables */
        this.themes = {
            light: {
                '--bg-color': '#ffffff',
                '--text-color': '#333333',
                '--button-bg': '#f0f0f0',
                '--button-hover': '#e0e0e0',
                '--button-active': '#d0d0d0',
                '--operator-bg': '#ffd700',
                '--operator-hover': '#ffed4a',
                '--operator-active': '#ffd700',
                '--equals-bg': '#4CAF50',
                '--equals-hover': '#45a049',
                '--equals-active': '#3d8b40',
                '--clear-bg': '#ff4444',
                '--clear-hover': '#ff6b6b',
                '--clear-active': '#cc0000',
                '--display-bg': '#f8f9fa',
                '--display-text': '#212529',
                '--shadow-color': 'rgba(0, 0, 0, 0.1)'
            },
            dark: {
                '--bg-color': '#1a1a1a',
                '--text-color': '#ffffff',
                '--button-bg': '#333333',
                '--button-hover': '#404040',
                '--button-active': '#4d4d4d',
                '--operator-bg': '#ffd700',
                '--operator-hover': '#ffed4a',
                '--operator-active': '#ffd700',
                '--equals-bg': '#4CAF50',
                '--equals-hover': '#45a049',
                '--equals-active': '#3d8b40',
                '--clear-bg': '#ff4444',
                '--clear-hover': '#ff6b6b',
                '--clear-active': '#cc0000',
                '--display-bg': '#2d2d2d',
                '--display-text': '#ffffff',
                '--shadow-color': 'rgba(0, 0, 0, 0.3)'
            }
        };

        /** @private {string} Current active theme */
        this.currentTheme = 'light';
        this.initialize();
    }

    /**
     * Initializes the theme manager.
     * Loads the saved theme preference and applies it.
     * @example
     * themeManager.initialize(); // Loads and applies saved theme
     */
    initialize() {
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('light');
        }
    }

    /**
     * Sets the calculator theme.
     * @param {string} themeName - The name of the theme to apply ('light' or 'dark')
     * @throws {Error} If the specified theme does not exist
     * @example
     * themeManager.setTheme('dark'); // Applies dark theme
     */
    setTheme(themeName) {
        if (!this.themes[themeName]) {
            throw new Error(`Theme '${themeName}' does not exist`);
        }

        const theme = this.themes[themeName];
        Object.entries(theme).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
        });

        this.currentTheme = themeName;
        localStorage.setItem('calculatorTheme', themeName);
    }

    /**
     * Toggles between light and dark themes.
     * @returns {string} The new active theme name
     * @example
     * const newTheme = themeManager.toggleTheme(); // Switches between light and dark
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }

    /**
     * Gets the current active theme.
     * @returns {string} The name of the current theme
     * @example
     * const currentTheme = themeManager.getCurrentTheme(); // Returns 'light' or 'dark'
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Gets all available themes.
     * @returns {Object} Object containing all available themes
     * @example
     * const themes = themeManager.getAvailableThemes();
     * // Returns { light: {...}, dark: {...} }
     */
    getAvailableThemes() {
        return { ...this.themes };
    }

    /**
     * Adds a new theme to the available themes.
     * @param {string} name - The name of the new theme
     * @param {Object} theme - The theme configuration object
     * @throws {Error} If a theme with the same name already exists
     * @example
     * themeManager.addTheme('custom', {
     *     '--bg-color': '#000000',
     *     '--text-color': '#ffffff'
     *     // ... other theme properties
     * });
     */
    addTheme(name, theme) {
        if (this.themes[name]) {
            throw new Error(`Theme '${name}' already exists`);
        }
        this.themes[name] = theme;
    }

    /**
     * Removes a theme from the available themes.
     * @param {string} name - The name of the theme to remove
     * @throws {Error} If trying to remove the current theme or if theme doesn't exist
     * @example
     * themeManager.removeTheme('custom'); // Removes the custom theme
     */
    removeTheme(name) {
        if (name === this.currentTheme) {
            throw new Error('Cannot remove the current theme');
        }
        if (!this.themes[name]) {
            throw new Error(`Theme '${name}' does not exist`);
        }
        delete this.themes[name];
    }
} 
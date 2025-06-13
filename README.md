# Modern Calculator Application

A feature-rich, modular calculator application built with modern JavaScript. This calculator implements a clean architecture with separate modules for different functionalities, making it maintainable, extensible, and well-documented.

## Features

- 🧮 **Advanced Calculations**

  - Basic arithmetic operations (addition, subtraction, multiplication, division)
  - Percentage calculations
  - Support for decimal numbers
  - Safe expression evaluation using the Shunting Yard algorithm
  - Error handling for invalid expressions

- 🎨 **Theme Support**

  - Light and dark themes
  - Theme persistence across sessions
  - Custom theme support
  - Smooth theme transitions

- 💾 **Memory Functions**

  - Memory storage (M+)
  - Memory recall (MR)
  - Memory clear (MC)
  - Memory persistence across sessions

- ⌨️ **Input Methods**

  - On-screen button interface
  - Full keyboard support
  - Visual feedback for button presses
  - Support for keyboard shortcuts

- 📱 **Responsive Design**
  - Clean, modern interface
  - Responsive layout
  - Accessible design
  - Cross-browser compatibility

## Project Structure

```
calculator/
├── src/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── Calculator.js      # Main calculator controller
│   │   │   ├── CalculatorEngine.js # Mathematical operations
│   │   │   ├── Display.js         # Display management
│   │   │   ├── Keypad.js          # Button and keyboard input
│   │   │   ├── Memory.js          # Memory operations
│   │   │   └── ThemeManager.js    # Theme management
│   │   └── main.js                # Application entry point
│   ├── css/
│   │   └── styles.css            # Styling and themes
│   └── index.html                # Main HTML file
└── README.md                     # Project documentation
```

## Module Documentation

### Calculator

The main controller class that coordinates all calculator operations. It manages the interaction between different modules and maintains the calculator's state.

### CalculatorEngine

Handles all mathematical calculations using the Shunting Yard algorithm for safe expression evaluation. Implements operator precedence and proper handling of mathematical expressions.

### Display

Manages the calculator's display, including:

- Input/output display
- Error messages
- Notifications
- Number formatting

### Keypad

Handles all user input methods:

- Button creation and management
- Click event handling
- Keyboard input mapping
- Visual feedback

### Memory

Manages calculator memory operations:

- Memory storage and retrieval
- Memory persistence
- Memory state management

### ThemeManager

Controls the calculator's appearance:

- Theme switching
- Theme persistence
- Custom theme support
- CSS variable management

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MubureT/calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd calculator
   ```
3. Open `index.html` in your web browser or use a local development server.

### Usage

- **Basic Operations**: Use the on-screen buttons or keyboard

  - Numbers: 0-9 keys
  - Operators: +, -, \*, /
  - Equals: Enter or =
  - Clear: Escape or C
  - Backspace: Backspace or ⌫

- **Memory Operations**

  - M+: Add current value to memory
  - MR: Recall memory value
  - MC: Clear memory

- **Theme Switching**
  - Toggle between light and dark themes
  - Theme preference is saved automatically

## Development

### Adding New Features

The modular architecture makes it easy to add new features:

1. Create a new module in `src/js/modules/`
2. Implement the module following the existing patterns
3. Import and integrate the module in `Calculator.js`

### Custom Themes

To add a custom theme:

1. Define theme variables in `ThemeManager.js`
2. Add the theme to the `themes` object
3. Use the `setTheme()` method to apply the theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shunting Yard Algorithm implementation for safe expression evaluation
- Modern JavaScript best practices
- CSS Variables for theme management
- LocalStorage for persistence

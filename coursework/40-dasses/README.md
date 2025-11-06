# Connect Four - TypeScript Classes Learning Project

This project implements a Connect Four game to demonstrate object-oriented programming concepts in TypeScript.

## Key Learning Concepts

### TypeScript Fundamentals

**Union Types**: Custom type definitions that restrict values to specific options (`type Player = "red" | "yellow"`). This provides type safety beyond basic string types.

**Classes and Object-Oriented Programming**: Classes combine related data (properties) and behavior (methods) into cohesive units. This project demonstrates how to organize game state and logic within a single `ConnectFourGame` class.

**The `this` Keyword**: Accessing instance variables and methods within a class requires the `this` keyword to reference the current instance.

**Access Modifiers**: Use of `private` to encapsulate internal implementation details and `readonly` for constants that shouldn't change after initialization.

### DOM Manipulation

**Element References**: Storing HTML element references in class properties for efficient access throughout the application lifecycle.

**Dynamic Element Creation**: Programmatically creating and appending DOM elements using `createElement` and `appendChild`.

**Event Handling**: Attaching click event listeners to interactive elements using arrow functions.

**CSS Class Manipulation**: Using `classList.add()` and `classList.remove()` to dynamically change element styling based on game state.

### Array Techniques

**2D Arrays**: Representing the game board as a nested array structure (`CellState[][]`).

**Clearing Arrays**: Setting array `length` to 0 as an efficient way to empty an array while maintaining the reference.

**Array Initialization**: Using nested loops to populate multi-dimensional data structures.

### CSS Layout

**CSS Grid**: Using `display: grid` with `grid-template-columns: repeat(7, 1fr)` to create a responsive board layout.

**Flexbox**: Centering content and creating flexible layouts with `display: flex`, `flex-direction`, `align-items`, and `justify-content`.

**Hover Effects**: Providing visual feedback with `:hover` pseudo-class styling.

**Border Radius**: Creating circular cells using `border-radius: 50%`.

### Game Logic Patterns

**State Management**: Tracking game state through class properties (board, current player, game over flag).

**Win Detection Algorithm**: Checking multiple directions (horizontal, vertical, diagonal) from the last played position to detect four connected pieces.

**Bidirectional Search**: Counting connected cells in both directions from a starting point to efficiently detect winning combinations.

**Input Validation**: Checking for valid moves (column not full, game not over) before processing player actions.


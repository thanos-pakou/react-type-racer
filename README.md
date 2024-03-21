## React Type Racer - A Fast-Paced Typing Game ️⌨️

### Description

React Typing Racer is a web-based typing game built with React that challenges you to improve your typing speed and accuracy. Inspired by the classic online game, it offers an engaging experience for players of all skill levels. Project is still on progress.

### Installation

#### Prerequisites:

-   Node.js and npm (or yarn) installed on your system.

#### Steps:

1. Clone the repository:

```bash
git clone https://github.com/thanos-pakou/react-type-racer.git
```

2. Navigate to the project directory:

```bash
cd react-type-racer
```

3. Install dependencies:

```bash
npm install
```

(or)

```bash
yarn install
```

4. Start the development server:

```bash
npm start dev
```

(or)

```bash
yarn start dev
```

This will launch the development server and open the game in your web browser at http://localhost:{port} (the specified port).

### Gameplay

The core gameplay of React Typing Racer revolves around typing out displayed text as quickly and accurately as possible. Here's a breakdown of the key mechanics:

-   **Starting the Game:** Choose your desired difficulty level (e.g., easy, medium, hard) which determines the complexity of the text passages.
-   **Typing Input:** As the text appears on the screen, start typing the characters accurately. Your progress is highlighted as you type correctly.
-   **Evaluating Accuracy:** Each typed character is evaluated for accuracy. Mistakes are highlighted and deducted from your final score.
-   **Tracking Progress:** The game keeps track of your typing speed (words per minute) and accuracy (percentage of correct keystrokes). You will be able to monitor your performance over time to see your progress and improvement.

### Features

-   **Engaging Gameplay:** Race against the clock or yourself to improve your typing skills.
-   **Difficulty Levels:** Cater to all skill levels with adjustable text complexity.
-   **Performance Tracking:** Track your typing speed and accuracy for progress monitoring.
-   **Customization Options:** (Themes, custom texts, style of game)

### Technology Stack

-   #### Fron-end Development

    -   [React](https://react.dev/): The core T library for building user interfaces utilized with typescript.
    -   [Styled-Components](https://styled-components.com/): A library for styling React components with CSS-in-TS.
    -   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
    -   [Twin.Macro](https://github.com/ben-rogerson/twin.macro): Integrates with Tailwind CSS to provide a more ergonomic styling experience within React components.

-   #### Development Tools

    -   [Vite](https://vitejs.dev/): A lightning-fast development server and build tool for modern web applications.
    -   [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript that enables static typing for enhanced code maintainability and developer experience.
    -   [ESLint](https://eslint.org/): Linter that enforces code style and catches potential errors.
    -   [Prettier](https://prettier.io/): Code formatter that automatically formats code according to a specified style guide.

-   #### Testing

    -   [Vitest](https://vitest.dev/): Modern jest-like testing framework built specifically for Vite projects, offering unit, integration, and end-to-end testing capabilities.
    -   [testing-library/react](): Library for writing user-centric React component tests.

### Development Roadmap

This roadmap outlines the planned development stages for React Type Racer.

**Current Stage (v0.1) - Solid Foundation**

-   **✅ Project Setup (Completed):**
    -   Defined the project structure and organized code for maintainability.
    -   Selected appropriate libraries (React, Styled-Components, etc.) to build the game.
    -   Set up and configured these libraries within Vite development environment.
    -   Installed necessary Vite plugins for seamless integration with the chosen libraries.
    -   Established a Git repository for version control.
-   **✅ Core Game Logic (Completed):**
    -   Implemented key functionalities with unit testing:
        -   **Game Initialization:** Establishes initial state using `useGame` hook. (Unit tested)
        -   **State Updates (Specific Functions):** Developed functions within `useGame` to manage game state based on user actions (e.g., starting the game, progressing through characters, handling errors). (Unit tested)
        -   **`useGame` Hook Integration:** Successfully integrated the `useGame` hook with the `gameSession` context to manage game state globally. (Unit tested)
        -   **`useTimer` Hook:** Implemented a separate `useTimer` hook to manage the game timer and its functionality. (Unit tested)

**Next Steps (v1.0) - Engaging Gameplay**

-   ✨ User Interface: Design and implement a user-friendly interface for:
    -   Displaying text passages, typing input, and performance metrics.
    -   Incorporating visual feedback for user interaction (e.g., highlighting progress, displaying errors).
-   Real-time Statistics: Integrate real-time performance data during gameplay, including:
    -   Typing speed (words per minute)
    -   Accuracy percentage
    -   Character-level statistics (optional)
-   Playable Experience: Ensure a smooth and engaging gameplay experience with the implemented features.

**Future Enhancements (v2.0 and beyond)**

-   Advanced Statistics: Develop detailed post-game statistics for analysis and progress tracking, such as:
    -   Word and character accuracy breakdown
    -   Time taken per challenge
    -   Historical performance trends (optional)
-   Leaderboards (optional): Implement a leaderboard system for players to compete and compare their typing skills.
-   Multiplayer Mode (optional): Design and implement a multiplayer mode for competitive typing challenges between players.

**Timeline and Priorities**

-   The development will prioritize core functionalities and user experience for an initial playable version (v1.0).
-   Advanced features like detailed statistics, leaderboards, and multiplayer mode will be considered for later stages based on project progress.
-   I'll update this roadmap regularly to reflect the development status and upcoming features.

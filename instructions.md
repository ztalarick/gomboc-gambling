# Gomboc Gambling Casino

## Project Description
Create a full stack application with a permanent data storage layer using:

- npm
- Node.js
- TypeScript

You can use any database you want but the final project should be possible to run on any local machine using the following commands:

- Install all dependencies: `npm install`
- Run the application in development mode: `npm run dev`
    - Development mode should run the application on TypeScript files.
- Run the application in production mode: `npm start`
    - Production mode should run the application on compiled JavaScript files.

## The Application
The application is a gambling game where the user can bet on the outcome of a dice roll. The user can bet on a number between 1 and 6. If the user guesses the number correctly, 
they win 5 times the amount they bet. If the user guesses the number incorrectly, they lose the amount they bet.

The UI can be as simple as a page showing:

- The user's balance
- An input field for the user to enter the `amount` they want to bet
- An input field for the user to enter the `dice number` they want to bet on
- A `submit` button to submit the bet
- A pop up message showing the result of the bet (win or lose)
- A `withdraw` button to withdraw the balance and reset the game (the user should be able to withdraw the balance only if they have won at least once)
- A `history` button to show the history of bets for all the games played

The application should have a data storage layer to keep track of the user's balance and the history of bets. The user's balance should be updated after each bet.

## Game Rules
- The user should start with a balance of 1000.
- One turn consists of the following steps:
    - The user bets an amount and a dice number
    - The user submits the bet
    - The application shows the result of the dice roll
    - The application shows a message if the user wins or loses and updates the balance
- A user can play as many turns as they want until they press the `withdraw` button or they lose all their money
- The dice roll should be random.
- If the user's balance reaches 0, the game should reset to the initial state.
- If the player press `withdraw` button, the game should reset to the initial state.

### Extra rules
- If the user's balance is greater or equal to 5000, the dice roll should be rigged with the following logic:
    - If the dice roll matches the user bet (before claiming the user win), there is a 30% chance that the server will repeat the roll (a single time) and use the second roll as the final result.
- If the user's balance is greater or equal to 10000, the dice roll should be rigged with the following logic:
    - If the dice roll matches the user bet (before claiming the user win), there is a 50% chance that the server will repeat the roll (a single time) and use the second roll as the final result.

### Extra features
- If the user's balance is greater or equal to 20000 and the user try to press `withdraw` button, the button should move away from the mouse cursor.

## User stories
- As a user I want to be able to bet on a number that represents the outcome of a dice roll
- As a user I want to be able to see the history of all the games I have played

> NOTE: The user stories and the UI are just guidelines. Feel free to implement the application as you see fit.


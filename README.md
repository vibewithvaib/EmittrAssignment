# 😸 Exploding Kitten

This is a single-player web-based card game built with React, Redux, and a Go backend. The objective of the game is to draw cards from a deck while avoiding the "Exploding Kitten" card. Players win by drawing all cards without losing. This guide explains how the app works and provides instructions for running it locally.

## How It Works

### Frontend (React + Redux)
- **Start Page:**
  - The user enters a username and clicks "Start Game" to begin.
  - If the username is valid and unique, the game begins; otherwise, an error is displayed.

- **Game Page:**
  - The player draws cards by clicking the "Draw Card" button.
  - Each card has a specific effect:
    - **Cat Card (😼):** Removed from the deck.
    - **Defuse Card (🙅‍♂️):** Adds a defuse count to counter an Exploding Kitten card.
    - **Shuffle Card (🔀):** Reshuffles the deck.
    - **Exploding Kitten Card (💣):** Ends the game unless the player has a defuse card.
  - Players can restart the game or view the leaderboard after the game ends.

- **Leaderboard:**
  - Displays players ranked by their moves. Players who lose are excluded from the leaderboard.

### Backend (Go + Redis)
- **Endpoints:**
  1. `/start` (POST): Starts a game for a new user.
  2. `/leaderboard` (GET): Fetches the leaderboard data.
  3. `/game/updateScore` (POST): Updates a user's score and moves.

- **Data Storage:**
  - Usernames, scores, and moves are stored in Redis.
  - The leaderboard is dynamically generated based on this data.

## Project Structure

### Frontend
- **Components:**
  - `App.js`: Main application logic and routing.
  - `Game.js`: Core gameplay.
  - `Leaderboard.js`: Displays the leaderboard.
- **State Management:**
  - `userSlice.js`: Handles user login/logout.
  - `gameSlice.js`: Manages the game state.
  - `leaderboardSlice.js`: Manages leaderboard updates.
- **API Calls:**
  - `/services/api.js`: Contains methods to interact with the backend.

### Backend
- **main.go:**
  - Implements all API endpoints using Gorilla Mux.
  - Redis is used for storing user data and scores.

## How to Run Locally

### Prerequisites
- Node.js installed
- Go installed
- Redis installed (or a cloud Redis instance)

### Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

#### 2. Run the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
go mod tidy
```
3. Run the server:
   ```bash
go run main.go
```

The server will start on `http://localhost:8080`.

#### 3. Run the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000` in your browser.

#### 4. Test the Application
- Open `http://localhost:3000`.
- Enter a username to start the game.
- Play the game by drawing cards and observing the effects.
- Check the leaderboard to see rankings.

## Paths Overview

### Frontend
- `/`: Start screen
- `/game`: Game interface

### Backend
- `/start`: Validates and registers the username.
- `/leaderboard`: Fetches the leaderboard.
- `/game/updateScore`: Updates the score and moves for a player.

## Notes
- Ensure Redis is running locally or configure the Redis connection in `main.go`.
- Use `npm install` and `go mod tidy` to handle dependencies.
- The app is not deployed; it runs entirely on your local machine.


import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/gameSlice';
import userReducer from './features/userSlice';
import leaderboardReducer from './features/leaderBoardSlice'; 
const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    leaderboard: leaderboardReducer, 
  },
});

export default store;

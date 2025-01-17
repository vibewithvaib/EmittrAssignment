import { createSlice } from "@reduxjs/toolkit";

export const leaderBoardSlice = createSlice({
  name: "leaderboard",
  initialState: [],
  reducers: {
    addPlayerToLeaderboard: (state, action) => {
      const newPlayer = action.payload;
      state.push(newPlayer);
      // Sort leaderboard by score
      state.sort((a, b) => b.score - a.score);
    },
    clearLeaderboard: (state) => {
      return [];
    },
  },
});

export const { addPlayerToLeaderboard, clearLeaderboard } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;

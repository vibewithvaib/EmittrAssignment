import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    isLoggedIn: false,
  },
  reducers: {
    setUsername: (state, action) => {
      if (action.payload) {
        state.username = action.payload;
        state.isLoggedIn = true;
      }
    },
    logout: (state,action) => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setUsername,logout } = userSlice.actions;
export default userSlice.reducer;

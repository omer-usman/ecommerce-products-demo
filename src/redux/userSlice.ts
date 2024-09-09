import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserState {
  users: { username: string; password: string }[];
  loggedInUser: string | null;
}

const initialState: UserState = {
  users: [{ username: 'admin', password: 'admin' }],
  loggedInUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const user = state.users.find(
        (u) => u.username === action.payload.username && u.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user.username;
      }
    },
    signUp: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.users.push(action.payload);
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { login, signUp, logout } = userSlice.actions;
export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser;
export default userSlice.reducer;
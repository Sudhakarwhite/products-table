import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initalState';

interface LoginProps {
  username: string | null;
  avatar: string; 
  token: string; 
  user: string 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      console.log(action.payload,"action.payload");
      
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.username;      ;
      state.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.avatar = ''; // Reset avatar on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

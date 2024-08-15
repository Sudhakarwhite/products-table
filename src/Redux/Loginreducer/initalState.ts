interface AuthState {
    user: string | null;
    isAuthenticated: boolean;
    token: string | null;
    avatar: string;
  }
  
 export const initialState: AuthState = {
    user: "User",
    avatar: '',
    isAuthenticated: false,
    token: null,
  };
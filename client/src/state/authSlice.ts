import { createSlice } from "@reduxjs/toolkit";
import type {RootState} from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  cnp: string;
  phoneNumber?: string;
};

export interface AuthState {
    user: IUser | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setLogin, setLogout} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

import { fastamoniApi } from "./service";
import { AuthResponse } from "./services.types";

export interface LoginInitialState {
  status: "login" | "login-success" | "login-error" | "idle";
  token: AuthResponse["token"] | null;
  isAuthenticated: boolean;
  username: string;
  email: string;
  job: string;
}

const initState: LoginInitialState = {
  email: "",
  isAuthenticated: false,
  job: "",
  status: "idle",
  token: null,
  username: "",
};

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(fastamoniApi.endpoints.login.matchPending, (state) => {
      state.status = "login";
    });
    builder.addMatcher(
      fastamoniApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { token } = payload;
        if (token === null || token === undefined) {
          state.status = "login-error";
          state.isAuthenticated = false;
          state.token = null;
          return;
        }
        state.status = "login-success";
        state.isAuthenticated = true;
        state.token = token;
      },
    );
    builder.addMatcher(fastamoniApi.endpoints.login.matchRejected, (state) => {
      state.status = "login-error";
      state.isAuthenticated = false;
    });
  },
  initialState: initState,
  name: "userAuth",

  reducers: {
    login: (state) => {
      state.status = "login";
    },
    loginError: (state) => {
      state.status = "login-error";
      state.isAuthenticated = false;
    },
    loginSuccess: (state) => {
      state.status = "login-success";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.job = "";
      state.status = "idle";
    },
    setUserData: (state, { payload }) => {
      const { email, username, job } = payload;
      if (username) state.username = username;
      if (email) state.email = email;
      if (job) state.job = job;
    },
  },
});

export const { logout, login, loginSuccess, loginError, setUserData } =
  userSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export default userSlice.reducer;

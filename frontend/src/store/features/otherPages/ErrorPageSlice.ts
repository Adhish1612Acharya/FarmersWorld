import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

interface statObj {
  showComponent: boolean;
  admin: boolean;
  navLogin: boolean;
  errMsg: any;
}

const initialState = {
  showComponent: false,
  admin: false,
  navLogin: false,
  errMsg: "",
};

export const checkLogin = createAsyncThunk(
  "/loginCheck",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/loginCheck", {
      withCredentials: true,
    });
    return response.data;
  }
);

export const ErrorPageSlice = createSlice({
  name: "errorPage",
  initialState,
  reducers: {
    getErrorMsg: (state, action: PayloadAction<{ error: unknown }>) => {
      const error = action.payload.error;
      if (error instanceof Error) {
        state.errMsg = error.message;
      } else if (typeof error === "string") {
        state.errMsg = error;
      } else {
        state.errMsg = "Page not found";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      if (action.payload === "farmer") {
        state.admin = false;
        state.navLogin = true;
      } else if (action.payload === "admin") {
        state.admin = true;
        state.navLogin = true;
      } else if (action.payload === "notLogin") {
        state.navLogin = false;
      }
      state.showComponent = true;
    });
  },
});

export default ErrorPageSlice.reducer;
export const { getErrorMsg } = ErrorPageSlice.actions;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface statObj {
  showComponent: boolean;
  admin: boolean;
  navLogin: boolean;
}

const initialState: statObj = {
  showComponent: false,
  admin: false,
  navLogin: false,
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
  reducers: {},
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
export const {} = ErrorPageSlice.actions;

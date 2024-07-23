import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { schemeObj } from "../../../types/routesTypes/user/SchemeDetail";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface stateObj {
  navLogin: boolean;
  showComponent: boolean;
  applied: boolean;
  schemeInfo: schemeObj | null;
}

const initialState: stateObj = {
  navLogin: false,
  showComponent: false,
  applied: false,
  schemeInfo: null,
};

interface payLoad {
  navigate: NavigateFunction;
  id: string;
}

export const getSchemeDetail = createAsyncThunk(
  "/getSchemeDetail",
  async ({ navigate, id }: payLoad, thunkAPI) => {
    try {
      const detail = await axios.post(
        `/api/schemes/${id}`,
        { route: window.location.pathname },
        {
          withCredentials: true,
        }
      );
      if (detail.data === "noSchemeFound") {
        toast.warn("No such scheme is available");
        if (detail.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else if (detail.data.role === "admin") {
        toast.warn("You need to log out of admin");
        navigate("/admin");
      } else {
        return detail.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred , try refreshing the page");
      navigate("/");
    }
  }
);

export const SchemeDetailSlice = createSlice({
  name: "schemeDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchemeDetail.fulfilled, (state, action) => {
      state.showComponent = false;
      if (action.payload !== undefined) {
        state.applied = action.payload.applied;
        state.schemeInfo = action.payload.schemeDetail;
        state.navLogin = action.payload.login;
        state.showComponent = true;
      } else if (action.payload === undefined) {
        state.showComponent = false;
      }
    });
    builder.addCase(getSchemeDetail.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getSchemeDetail.rejected, (state, action) => {
      state.schemeInfo = null;
      console.log(action.payload);
    });
  },
});

export default SchemeDetailSlice.reducer;
export const {} = SchemeDetailSlice.actions;

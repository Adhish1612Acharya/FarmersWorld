import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { schemeObj } from "../../../types/componentsTypes/SchemeCard";
import { server } from "../../../server";

interface homeState {
  showComponent: boolean;
  filterLoad: boolean;
  navLogin: boolean;
  schemes: schemeObj[];
  count: number[] | 0;
}

const initialState: homeState = {
  showComponent: false,
  filterLoad: false,
  navLogin: false,
  schemes: [],
  count: 0,
};

interface Payload {
  navigate: NavigateFunction;
  filter: string;
}

export const getSchemesData = createAsyncThunk(
  "/getSchemes",
  async (navigate: NavigateFunction, thunkAPI) => {
    try {
      const schemes = await axios.get(`${server}/api/schemes`, {
        withCredentials: true,
      });
      if (!schemes.data.login) {
        toast.warn("You must Login");
        navigate("/login");
      } else if (schemes.data.role === "farmer") {
        toast.error("Access Denied");
        navigate("/");
      } else {
        return schemes.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error Occurred Please refresh the page");
      navigate("/");
    }
  }
);

export const handleFilterClick = createAsyncThunk(
  "/getFilterSchemes",
  async ({ navigate, filter }: Payload, thunkAPI) => {
    try {
      let schemes: any;

      schemes = await axios.get(`${server}/api/schemes/filter/${filter}`, {
        withCredentials: true,
      });

      return schemes?.data;
    } catch (err) {
      toast.error("Some error Occurred Please refresh the page");
      navigate("/login");
    }
  }
);

export const AdminHomePageSlice = createSlice({
  name: "adminHomePage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchemesData.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.schemes = action.payload.schemes;
        state.count = action.payload.count;
        state.navLogin = true;
        state.showComponent = true;
      }
    });
    builder.addCase(getSchemesData.pending, (state, action) => {
      state.showComponent = false;
      state.filterLoad = false;
    });

    builder.addCase(handleFilterClick.pending, (state, action) => {
      state.filterLoad = true;
    });
    builder.addCase(handleFilterClick.fulfilled, (state, action) => {
      if (action.payload === "noSchemesFound") {
        state.schemes = [];
        toast.warn("no schemes available");
        state.filterLoad = false;
      } else {
        if (action.payload.role === "admin") {
          state.count = action.payload.count;
        }
        state.schemes = action.payload.schemes;
        state.filterLoad = false;
      }
    });
  },
});

export default AdminHomePageSlice.reducer;
export const {} = AdminHomePageSlice.actions;

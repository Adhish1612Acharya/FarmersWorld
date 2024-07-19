import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applicationObj } from "../../../types/routesTypes/user/UserApplications";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { statBtnObj } from "../../../types/componentsTypes/SchemeCard";

export interface stateBtnObj {
  status: string;
  color: string;
}

interface stateObj {
  showComponent: boolean;
  navLogin: boolean;
  filterLoad: boolean;
  applications: applicationObj[];
  applicationType: string;
  statBtn: stateBtnObj[] | statBtnObj;
}

const initialState: stateObj = {
  showComponent: false,
  navLogin: false,
  filterLoad: false,
  applications: [],
  applicationType: "All",
  statBtn: [],
};

interface payLoad {
  navigate: NavigateFunction;
  filter: string;
}

export const getUserApplications = createAsyncThunk(
  "/userApplications",
  async (navigate: NavigateFunction, thunkAPI) => {
    const response = await axios.get("/api/farmers/getApplications", {
      withCredentials: true,
    });
    if (response.data === "notLogin") {
      toast.warn("You must login");
      navigate("/login");
    } else if (response.data === "roleIsAdmin") {
      toast.warn("You need to log out of admin");
      navigate("/admin");
    } else {
      return response.data;
    }
  }
);

export const getFilterApplications = createAsyncThunk(
  "/filterApplications",
  async ({ navigate, filter }: payLoad, thunkAPI) => {
    const response = await axios.get(
      `/api/farmers/getApplications/filter/${filter}`,
      {
        withCredentials: true,
      }
    );
    if (response.data === "notLogin") {
      toast.warn("You must login");
      navigate("/login");
    } else if (response.data === "roleIsAdmin") {
      toast.warn("You need to log out of admin");
      navigate("/admin");
    } else {
      return {
        applications: response.data,
        status: filter,
      };
    }
  }
);

export const UserApplicationSlice = createSlice({
  name: "userApplications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserApplications.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getUserApplications.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.applicationType = "all";
        state.applications = action.payload.applications;
        state.statBtn = action.payload.status;
        state.navLogin = true;
        state.filterLoad = false;
        state.showComponent = true;
      }
    });

    builder.addCase(getFilterApplications.pending, (state, action) => {
      state.filterLoad = true;
    });

    builder.addCase(getFilterApplications.fulfilled, (state, action) => {
      if (action.payload?.applications !== undefined) {
        if (action.payload.applications === "noApplications") {
          state.applications = [];
        } else {
          state.applications = action.payload.applications;
        }
        let status = action.payload.status;
        if (status === "approved") {
          state.statBtn = { status: status, color: "green" };
        } else if (status === "rejected") {
          state.statBtn = { status: status, color: "red" };
        } else {
          state.statBtn = { status: status, color: "yellow" };
        }
        state.applicationType = action.payload.status;
        state.filterLoad = false;
      }
    });
  },
});

export default UserApplicationSlice.reducer;
export const {} = UserApplicationSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applicationObj } from "../../../types/routesTypes/user/ApplicationDetails";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface statusBtnObj {
  status: string;
  color: string;
}

interface stateObj {
  applDetails: applicationObj | string;
  statusBtn: statusBtnObj;
  showComponent: boolean;
  navLogin: boolean;
}

const initialState: stateObj = {
  applDetails: "",
  statusBtn: {
    status: "",
    color: "",
  },
  showComponent: false,
  navLogin: false,
};

interface payLoad {
  navigate: NavigateFunction;
  id: string;
}

export const getApplicationDetail = createAsyncThunk(
  "/applicationDetails",
  async ({ navigate, id }: payLoad, thunkAPI) => {
    try {
      const response = await axios.get(`/api/farmers/getApplications/${id}`, {
        withCredentials: true,
      });
      if (response.data === "notLogin") {
        toast.warn("You must login");
        navigate("/login");
      } else if (response.data === "roleIsAdmin") {
        toast.warn("You need to log out of admin");
        navigate("/admin");
      } else if (response.data === "applicationNotFound") {
        toast.warn("No such application found");
        navigate("/schemes/applications");
      } else {
        return response.data;
      }
    } catch (err) {
      toast.error("Some error occurred , try refreshing the page");
      navigate("/");
    }
  }
);

export const ApplicationDetailSlice = createSlice({
  name: "applicationDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicationDetail.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getApplicationDetail.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.applDetails = action.payload;
        if (action.payload.processing) {
          state.statusBtn = { status: "Processing", color: "yellow" };
        } else if (action.payload.approved) {
          state.statusBtn = { status: "Approved", color: "green" };
        } else {
          state.statusBtn = { status: "Rejected", color: "red" };
        }
        state.navLogin = true;
        state.showComponent = true;
      }
    });
  },
});

export default ApplicationDetailSlice.reducer;
export const {} = ApplicationDetailSlice.actions;

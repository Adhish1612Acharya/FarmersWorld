import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applicationObj } from "../../../types/routesTypes/admin/Applications";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface stateObj {
  heading: string;
  applications: applicationObj[];
  showComponent: boolean;
  navLogin: boolean;
}

const initialState: stateObj = {
  heading: "",
  applications: [],
  showComponent: false,
  navLogin: false,
};

interface payLoad {
  id: string;
  navigate: NavigateFunction;
}

export const getApplications = createAsyncThunk(
  "/applications",
  async ({ id, navigate }: payLoad, thunkAPI) => {
    try {
      const applications = await axios.get(
        `/api/admin/schemes/${id}/applications`,
        {
          withCredentials: true,
        }
      );
      if (applications.data === "notLogin") {
        toast.warn("You must Login");
        navigate("/login");
      } else if (applications.data === "roleIsFarmer") {
        toast.error("Access denied");
        navigate("/");
      } else if (applications.data === "schemeNotFound") {
        toast.warn("No such scheme found");
        navigate("/admin");
      } else {
        return applications.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error Occurred Please refresh the page");
      navigate("/admin");
    }
  }
);

export const ApplicationSlice = createSlice({
  name: "adminApplications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplications.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getApplications.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.applications = action.payload.applications;
        state.heading = action.payload.heading;
        state.navLogin = true;
        state.showComponent = true;
      }
    });
  },
});

export default ApplicationSlice.reducer;
export const {} = ApplicationSlice.actions;

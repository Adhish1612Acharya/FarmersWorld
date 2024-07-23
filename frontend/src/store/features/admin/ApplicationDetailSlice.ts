import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applicationObj } from "../../../types/routesTypes/admin/ApplicationDetail";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface statObj {
  showComponent: boolean;
  navLogin: boolean;
  applDetails: applicationObj | null;
  loading: boolean;
}

const initialState: statObj = {
  showComponent: false,
  navLogin: false,
  applDetails: null,
  loading: false,
};

interface payLoad {
  id: string;
  navigate: NavigateFunction;
}

interface payLoad2 {
  schemeId: string;
  applicationId: string;
  status: string;
  navigate: NavigateFunction;
}

export const getApplicationDetails = createAsyncThunk(
  "/applicationDetails",
  async ({ id, navigate }: payLoad, thunkAPI) => {
    try {
      const details = await axios.get(`/api/admin/schemes/applications/${id}`, {
        withCredentials: true,
      });
      if (details.data === "notLogin") {
        toast.warn("You mustLogin");
        navigate("/login");
      } else if (details.data === "roleIsFarmer") {
        toast.error("Access denied");
        navigate("/");
      } else if (details.data === "applicationNotFound") {
        toast.warn("Application Not Found");
        navigate(`/admin/schemes/admin/schemes/${id}/applications`);
      } else {
        return details.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error Occurred Please refresh the page");
      navigate("/admin");
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "/updateStatus",
  async ({ schemeId, applicationId, status, navigate }: payLoad2, thunkAPI) => {
    const response = await axios.put(
      `/api/admin/schemes/applications/${applicationId}/${status}`,
      {
        withCredentials: true,
      }
    );
    if (response.data === "notLogin") {
      toast.warn("You must Login");
      navigate("/login");
    } else if (response.data === "roleIsFarmer") {
      toast.error("Access denied");
      navigate("/");
    } else if (response.data === "applicationNotFound") {
      toast.warn("No such application found");
      navigate(`/admin/schemes/${schemeId}/applications`);
    } else if (response.data === "approved") {
      toast.success("Application Approved");
      navigate(`/admin/schemes/${schemeId}/applications`);
    } else if (response.data === "rejected") {
      toast.warn("Application Rejected");
      navigate(`/admin/schemes/${schemeId}/applications`);
    }
  }
);

export const ApplicationDetailSlice = createSlice({
  name: "adminApplicationDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicationDetails.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getApplicationDetails.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.applDetails = action.payload;
        state.navLogin = true;
        state.showComponent = true;
      }
    });

    builder.addCase(updateApplicationStatus.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default ApplicationDetailSlice.reducer;
export const {} = ApplicationDetailSlice.actions;

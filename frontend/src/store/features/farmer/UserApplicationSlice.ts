import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationObj } from "../../../types/routesTypes/user/UserApplications";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { statBtnObj } from "../../../types/componentsTypes/SchemeCard";

export interface stateBtnObj {
  status: string;
  color: string;
}

export interface applicationStatNo {
  all: number;
  approved: number;
  rejected: number;
  processing: number;
}

interface stateObj {
  showComponent: boolean;
  navLogin: boolean;
  filterLoad: boolean;
  applications: applicationObj[];
  applicationType: string;
  statBtn: stateBtnObj[] | statBtnObj;
  clicked: boolean;
  btnId: string;
  statNo: applicationStatNo;
}

const initialState: stateObj = {
  showComponent: false,
  navLogin: false,
  filterLoad: false,
  applications: [],
  applicationType: "All",
  statBtn: [],
  clicked: false,
  btnId: "",
  statNo: {
    all: 0,
    approved: 0,
    rejected: 0,
    processing: 0,
  },
};

interface payLoad {
  navigate: NavigateFunction;
  filter: string;
}

export const getUserApplications = createAsyncThunk(
  "/userApplications",
  async (navigate: NavigateFunction, thunkAPI) => {
    thunkAPI.dispatch(setBtnDisable({ clickStatus: true, id: "all" }));
    try {
      localStorage.setItem("applicationFilter", "");
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
    } catch (err) {
      console.log(err);
      toast.error("Some errror occurred Please try refreshing the page");
      navigate("/");
    }
  }
);

export const getFilterApplications = createAsyncThunk(
  "/filterApplications",
  async ({ navigate, filter }: payLoad, thunkAPI) => {
    try {
      localStorage.setItem("applicationFilter", JSON.stringify(filter));
      thunkAPI.dispatch(setBtnDisable({ clickStatus: true, id: filter }));
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
    } catch (err) {
      console.log(err);
      toast.error("Some errror occurred Please try refreshing the page");
      navigate("/");
    }
  }
);

export const UserApplicationSlice = createSlice({
  name: "userApplications",
  initialState,
  reducers: {
    setBtnDisable: (
      state,
      action: PayloadAction<{ clickStatus: boolean; id: string }>
    ) => {
      state.clicked = action.payload.clickStatus;
      state.btnId = action.payload.id;
    },
    setStatNo: (state, action: PayloadAction<applicationStatNo>) => {
      state.statNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserApplications.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getUserApplications.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.applicationType = "all";
        state.applications = action.payload.applications;
        state.statBtn = action.payload.status;
        const statNo = action.payload.statTypeNo;
        state.statNo = {
          all: statNo.all,
          approved: statNo.approved,
          rejected: statNo.rejected,
          processing: statNo.processing,
        };
        const data = {
          all: statNo.all,
          approved: statNo.approved,
          rejected: statNo.rejected,
          processing: statNo.processing,
        };
        localStorage.setItem("applicationTypeNo", JSON.stringify(data));
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
        if (action.payload.applications.details === "noApplications") {
          state.applications = [];
        } else {
          state.applications = action.payload.applications.details;
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
        state.navLogin = action.payload.applications.login;
        state.filterLoad = false;
        state.showComponent = true;
      }
    });
  },
});

export default UserApplicationSlice.reducer;
export const { setBtnDisable, setStatNo } = UserApplicationSlice.actions;

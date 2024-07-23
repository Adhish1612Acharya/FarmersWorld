import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { schemeObj } from "../../../types/routesTypes/user/ApplyScheme";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface stateObj {
  showComponent: boolean;
  navLogin: boolean;
  scheme: schemeObj | null;
}

const initialState: stateObj = {
  showComponent: false,
  navLogin: false,
  scheme: null,
};

interface payLoad {
  navigate: NavigateFunction;
  id: string;
}

export const checkSchemeApplied = createAsyncThunk(
  "/checkingAppliedStatus",
  async ({ navigate, id }: payLoad, thunkAPI) => {
    try {
      const detail = await axios.post(
        `/api/schemes/${id}`,
        { route: window.location.pathname },
        {
          withCredentials: true,
        }
      );
      if (!detail.data.login) {
        if (detail.data === "noSchemeFound") {
          navigate("/");
          toast.warn("No such scheme is available");
        } else {
          navigate("/login");
          toast.warn("You need to login");
        }
      } else if (detail.data.role === "admin") {
        toast.warn("You need to log out of admin");
        navigate("/admin");
      } else if (detail.data === "noSchemeFound") {
        toast.warn("No such scheme is available");
        navigate("/");
      } else if (detail.data.applied) {
        toast.warn(
          "You have already applied and the Application is under processing"
        );
        navigate(`/schemes/${id}`);
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

export const ApplySchemeSlice = createSlice({
  name: "applyScheme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkSchemeApplied.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(checkSchemeApplied.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.scheme = action.payload.schemeDetail;
        state.navLogin = action.payload.login;
        state.showComponent = true;
      } else if (action.payload === undefined) {
        state.showComponent = false;
      }
    });
  },
});

export default ApplySchemeSlice.reducer;
export const {} = ApplySchemeSlice.actions;

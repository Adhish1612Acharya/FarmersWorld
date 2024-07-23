import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { schemeObj } from "../../../types/routesTypes/user/Home";
import axios from "axios";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../store";
import { server } from "../../../server";

interface homeState {
  showComponent: boolean;
  filterLoad: boolean;
  navLogin: boolean;
  schemes: schemeObj[];
  count: number[] | -1;
  clickedFilter: boolean;
  filterIdentifier: string;
}

const initialState: homeState = {
  showComponent: false,
  filterLoad: false,
  navLogin: false,
  schemes: [],
  count: -1,
  clickedFilter: false,
  filterIdentifier: "",
};

interface Payload {
  navigate: NavigateFunction;
  filter: string;
}

export const getSchemesData = createAsyncThunk(
  "/getSchemes",
  async (navigate: NavigateFunction, thunkAPI) => {
    try {
      thunkAPI.dispatch(setFilterStyle({ filter: "", value: false }));
      const schemes = await axios.post(`${server}/api/schemes`, {
        withCredentials: true,
      });
      if (window.location.pathname === "/admin") {
        if (!schemes.data.login) {
          toast.warn("You must Login");
          navigate("/login");
        } else if (schemes.data.role === "farmer") {
          toast.error("Access Denied");
          navigate("/");
        } else {
          return schemes.data;
        }
      } else if (window.location.pathname === "/") {
        if (schemes.data.role === "admin") {
          toast.warn("You need to log out of admin");
          navigate("/admin");
        } else {
          return schemes.data;
        }
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
    thunkAPI.dispatch(setFilterStyle({ filter, value: true }));
    try {
      let schemes: any;

      schemes = await axios.post(`${server}/api/schemes/filter/${filter}`, {
        withCredentials: true,
      });

      return schemes?.data;
    } catch (err) {
      toast.error("Some error Occurred Please refresh the page");
      navigate("/login");
    }
  }
);

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.showComponent = !action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.navLogin = action.payload;
    },
    setFilterStyle: (
      state,
      action: PayloadAction<{ filter: string; value: boolean }>
    ) => {
      state.clickedFilter = action.payload.value;
      state.filterIdentifier = action.payload.filter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSchemesData.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        console.log(getSchemesData);
        console.log(server);
        state.schemes = action.payload?.schemes;
        state.navLogin = action.payload.login;
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

export default HomeSlice.reducer;
export const { setLoading, setLogin, setFilterStyle } = HomeSlice.actions;

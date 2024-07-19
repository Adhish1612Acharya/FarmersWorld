import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  errorObj,
  errorParams,
  valueObj,
} from "../../../types/componentsTypes/LoginForm";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { act } from "react";
import { RootState } from "../../store";

interface statObj {
  showComponent: boolean;
  apiRoute: string;
  value: valueObj;
  error: errorObj;
  textInputErr: boolean;
}

const initialState: statObj = {
  showComponent: false,
  apiRoute: "farmers/login",
  value: {
    username: "",
    password: "",
  },
  error: {
    username: {
      valid: true,
      errMsg: "",
    },
    password: {
      valid: true,
      errMsg: "",
    },
  },
  textInputErr: false,
};

interface payLoad {
  apiRoute: string;
  value: valueObj;
  navigate: NavigateFunction;
}

export const checkLogin = createAsyncThunk(
  "/loginCheck",
  async (navigate: NavigateFunction, thunkAPI) => {
    const response = await axios.get("/api/loginCheck", {
      withCredentials: true,
    });
    if (response.data === "farmer") {
      toast.warn("You are already logged in");
      navigate("/");
    } else if (response.data === "admin") {
      toast.warn("You are already logged in");
      navigate("/admin");
    } else {
      return response.data;
    }
  }
);

export const login = createAsyncThunk(
  "/loginRoute",
  async ({ apiRoute, value, navigate }: payLoad, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const textIputError = state.loginPage.textInputErr;
      if (!textIputError) {
        const response = await axios.post(`/api/${apiRoute}`, value, {
          withCredentials: true,
        });
        if (response.data.loginStatus === "successLogin") {
          toast.success("Logged in successfully ");
          navigate(`${response.data.redirect}`);
        } else if (response.data.loginStatus === "directLogin") {
          toast.success("Logged in successfully ");
          navigate(`${response.data.redirect}`);
        } else if (response.data === "failureLogin") {
          toast.error("Either username or password is not valid");
          return response.data;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred try refreshing the page");
    }
  }
);

export const LoginPageSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {
    setApiRoute: (state, action: PayloadAction<string>) => {
      state.apiRoute = action.payload;
    },
    setFormData: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.error[action.payload.name] = { valid: true, errMsg: "" };
      state.value[action.payload.name] = action.payload.value;
    },
    validateForm: (
      state,
      action: PayloadAction<{
        loginData: valueObj;
        error: errorObj;
      }>
    ) => {
      const regex = /^[^\s]+$/;
      let err = false;
      if (!regex.test(action.payload.loginData.username)) {
        state.error.username = {
          errMsg: "Enter a valid username",
          valid: false,
        };
        err = true;
      }
      if (!regex.test(action.payload.loginData.password)) {
        state.error.password = {
          errMsg: "Enter a valid password",
          valid: false,
        };
        err = true;
      }
      state.textInputErr = err;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state, action) => {
      (state.value = {
        username: "",
        password: "",
      }),
        (state.error = {
          username: {
            valid: true,
            errMsg: "",
          },
          password: {
            valid: true,
            errMsg: "",
          },
        });
      state.textInputErr = false;
      state.apiRoute = "farmers/login";
      state.showComponent = false;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        if (action.payload === "notLogin") {
          state.showComponent = true;
        }
      }
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload !== "failureLogin") {
        if (!state.textInputErr) {
          state.value = {
            username: "",
            password: "",
          };
        }
      }
    });
  },
});

export default LoginPageSlice.reducer;
export const { setApiRoute, setFormData, validateForm } =
  LoginPageSlice.actions;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorObj, valueObj } from "../../../types/componentsTypes/LoginForm";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";

interface statObj {
  showComponent: boolean;
  apiRoute: string;
  value: valueObj;
  error: errorObj;
  textInputErr: boolean;
  signUpLoad: boolean;
}

const initialState: statObj = {
  showComponent: false,
  apiRoute: "farmers/signUp",
  value: {
    username: "",
    email: "",
    password: "",
  },
  error: {
    username: {
      valid: false,
      errMsg: "",
    },
    email: {
      valid: true,
      errMsg: "",
    },
    password: {
      valid: true,
      errMsg: "",
    },
  },
  textInputErr: false,
  signUpLoad: false,
};

interface payLoad {
  apiRoute: string;
  value: valueObj;
  navigate: NavigateFunction;
}

export const checkLogin = createAsyncThunk(
  "/loginCheck",
  async (navigate: NavigateFunction, thunkAPI) => {
    try {
      localStorage.setItem("filter", "");
      localStorage.setItem("profilePhoto", "");
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
    } catch (err) {
      console.log(err);
      toast.error("Spme error occured please try refreshing the page");
      navigate("/");
    }
  }
);

export const signUp = createAsyncThunk(
  "/signUpRoute",
  async ({ apiRoute, value, navigate }: payLoad, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const textIputError = state.signUpPage.textInputErr;
      if (!textIputError) {
        thunkAPI.dispatch(setSignUpLoad(true));
        const response = await axios.post(`/api/${apiRoute}`, value, {
          withCredentials: true,
        });
        if (response.data.signUpStatus === "success signUp") {
          localStorage.setItem(
            "profilePhoto",
            JSON.stringify(response.data.profilePhoto)
          );
          toast.success("Logged in successfully ");
          navigate(`/profile`);
        } else if (response.data.redirect === "/admin") {
          toast.success("Logged in successfully ");
          navigate(`/admin`);
        } else if (response.data === "signUpError") {
          toast.error("Username  already exists");
          return response.data;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred try refreshing the page");
      navigate("/");
    }
  }
);

export const SignUpPageSlice = createSlice({
  name: "signUpPage",
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
      }>
    ) => {
      const regex = /^\S+$/;
      const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/;
      let err = false;
      if (!regex.test(action.payload.loginData.username)) {
        state.error.username = {
          errMsg: "Enter a valid username",
          valid: false,
        };
        err = true;
      }
      if (!emailRegex.test(action.payload.loginData.email)) {
        state.error.email = {
          errMsg: "Enter a valid email",
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
    setSignUpLoad: (state, action: PayloadAction<boolean>) => {
      state.signUpLoad = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state, action) => {
      (state.value = {
        username: "",
        password: "",
        email: "",
      }),
        (state.error = {
          username: {
            valid: true,
            errMsg: "",
          },
          email: {
            valid: true,
            errMsg: "",
          },
          password: {
            valid: true,
            errMsg: "",
          },
        });
      state.textInputErr = false;
      state.apiRoute = "farmers/signUp";
      state.showComponent = false;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        if (action.payload === "notLogin") {
          state.showComponent = true;
        }
      }
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.signUpLoad = false;
      if (action.payload !== undefined && action.payload !== "signUpError") {
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

export default SignUpPageSlice.reducer;
export const { setApiRoute, setFormData, validateForm, setSignUpLoad } =
  SignUpPageSlice.actions;

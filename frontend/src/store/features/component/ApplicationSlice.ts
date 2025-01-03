import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";
import { RootState } from "../../store";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

interface valueObj {
  [key: string]: string | File;
}

interface errorKeyParams {
  errMsg: string;
  valid: boolean;
}

interface errorObj {
  [key: string]: errorKeyParams;
}

interface statObj {
  value: valueObj;
  errors: errorObj;
  textInptError: boolean;
  imagePreview: any;
  submitLoad: boolean;
}

interface payLoad {
  imageFile: File | "";
  id: string;
  navigate: NavigateFunction;
}

const initialState: statObj = {
  value: {
    adhaar: "",
    farmersId: "",
    image: "",
  },
  errors: {
    adhaar: { errMsg: "", valid: true },
    farmersId: { errMsg: "", valid: true },
    image: { errMsg: "", valid: true },
  },
  textInptError: false,
  imagePreview: "",
  submitLoad: false,
};

export const applyScheme = createAsyncThunk(
  "/apply",
  async ({ imageFile, id, navigate }: payLoad, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      if (!state.application.textInptError) {
        thunkAPI.dispatch(setSubmitLoad(true));
        let data = new FormData();
        data.append("adhaar", state.application.value.adhaar);
        data.append("farmersId", state.application.value.farmersId);
        data.append("image", imageFile);
        const response = await axios.post(`/api/schemes/${id}/apply`, data, {
          withCredentials: true,
        });
        if (response.data === "notLogin") {
          toast.warn("You must be Logged in");
          navigate("/login");
        } else if (response.data.role === "roleIsAdmin") {
          toast.error("Access denied");
          navigate(`/admin`);
        } else if (response.data === "alreadyApplied") {
          toast.warn(
            "You have already applied and the Application is under processing"
          );
          navigate(`/schemes/${id}`);
        } else if (response.data.status === "applied") {
          toast.success("Applied successfully");
          navigate(`/schemes/applications/${response.data.id}`);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occured try refreshing the page");
      navigate("/");
    }
  }
);

export const ApplicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setInputData: (
      state,
      action: PayloadAction<{ name: string; value: string | File }>
    ) => {
      state.errors[action.payload.name] = { errMsg: "", valid: true };
      if (action.payload.name === "image") {
        state.imagePreview = "";
        state.value[action.payload.name] = action.payload.value;
      } else {
        state.value[action.payload.name] = action.payload.value;
      }
    },
    validation: (state, action: PayloadAction<{ data: valueObj }>) => {
      const NumberRegex = /^\d{12}$/;
      const imageRegex = /^[^\s]+$/;
      let err = false;
      if (
        typeof action.payload.data.adhaar === "string" &&
        typeof action.payload.data.farmersId === "string"
      ) {
        if (!NumberRegex.test(action.payload.data.adhaar)) {
          state.errors.adhaar = {
            errMsg: "Enter a valid 12 digit adhaar Number",
            valid: false,
          };
          err = true;
        }
        if (
          !NumberRegex.test(action.payload.data.farmersId) ||
          action.payload.data.farmersId === action.payload.data.adhaar
        ) {
          state.errors.farmersId = {
            errMsg: "Enter a valid 12 digit farmersId",
            valid: false,
          };
          err = true;
        }
      }
      if (
        typeof action.payload.data.image === "string" &&
        !imageRegex.test(action.payload.data.image)
      ) {
        state.errors.image = {
          errMsg: "Enter a passport size photo",
          valid: false,
        };
        err = true;
      }
      state.textInptError = err;
    },
    fileReader: (state, action: PayloadAction<any>) => {
      state.imagePreview = action.payload;
    },
    setSubmitLoad: (state, action: PayloadAction<boolean>) => {
      state.submitLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(applyScheme.fulfilled, (state, action) => {
      state.submitLoad = false;
    });
  },
});

export default ApplicationSlice.reducer;
export const { setInputData, validation, fileReader, setSubmitLoad } =
  ApplicationSlice.actions;

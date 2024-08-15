import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { schemeObj } from "../../../types/routesTypes/user/ApplyScheme";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";

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

interface payLoad2 {
  imageFile: File | "";
  id: string;
  navigate: NavigateFunction;
}

interface stateObj {
  showComponent: boolean;
  navLogin: boolean;
  scheme: schemeObj | null;
  value: valueObj;
  errors: errorObj;
  textInptError: boolean;
  imagePreview: any;
  submitLoad: boolean;
}

const initialState: stateObj = {
  showComponent: false,
  navLogin: false,
  scheme: null,
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

interface payLoad1 {
  navigate: NavigateFunction;
  id: string;
}

export const getApplicationInfo = createAsyncThunk(
  "/getProfileInfo",
  async ({ navigate, id }: payLoad1, thunkAPI) => {
    try {
      localStorage.setItem("filter", "");
      const detail = await axios.get(
        `/api/schemes/${id}?route=${window.location.pathname}`,
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
      } else if (!detail.data.profileInfo.profileComplete) {
        toast.warn("You need to complete your profile first");
        navigate("/profile");
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

export const applyScheme = createAsyncThunk(
  "/apply",
  async ({ imageFile, id, navigate }: payLoad2, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      if (!state.applyScheme.textInptError) {
        console.log("requset sent");
        thunkAPI.dispatch(setSubmitLoad(true));
        let data = new FormData();
        const adhaarNo = Number(state.applyScheme.value.adhaar);
        const farmersId = Number(state.applyScheme.value.farmersId);
        const image =
          imageFile === "" ? state.applyScheme.value.image : imageFile;
        data.append("adhaar", JSON.stringify(adhaarNo));
        data.append("farmersId", JSON.stringify(farmersId));
        data.append("image", image);
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

export const ApplySchemeSlice = createSlice({
  name: "applyScheme",
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
      const imageRegex = /^.+$/;
      let err = false;

      if (!NumberRegex.test(action.payload.data.adhaar.toString())) {
        state.errors.adhaar = {
          errMsg: "Enter a valid 12 digit adhaar Number",
          valid: false,
        };
        err = true;
      }
      if (
        !NumberRegex.test(action.payload.data.farmersId.toString()) ||
        action.payload.data.farmersId === action.payload.data.adhaar.toString()
      ) {
        state.errors.farmersId = {
          errMsg: "Enter a valid 12 digit farmersId",
          valid: false,
        };
        err = true;
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
    builder.addCase(getApplicationInfo.pending, (state, action) => {
      state.showComponent = false;
    });
    builder.addCase(getApplicationInfo.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.scheme = action.payload.schemeDetail;
        state.value = {
          adhaar: action.payload.profileInfo.adhaar,
          farmersId: action.payload.profileInfo.farmersId,
          image: action.payload.profileInfo.image,
        };
        state.imagePreview = action.payload.profileInfo.image;
        state.navLogin = action.payload.login;
        state.showComponent = true;
      } else if (action.payload === undefined) {
        state.showComponent = false;
      }
    });

    builder.addCase(applyScheme.fulfilled, (state, action) => {
      state.submitLoad = false;
    });
  },
});

export default ApplySchemeSlice.reducer;
export const { setInputData, validation, fileReader, setSubmitLoad } =
  ApplySchemeSlice.actions;

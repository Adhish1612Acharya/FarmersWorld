import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileDataObj } from "../../../types/routesTypes/user/Profile";
import { Form, NavigateFunction } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { act } from "react";
import { RootState } from "../../store";

interface valueObj {
  [key: string]: string;
}

interface errorParams {
  errMsg: string;
  valid: boolean;
}

interface errorObj {
  [key: string]: errorParams;
}

interface stateObj {
  showComponent: boolean;
  navLogin: boolean;
  profileData: valueObj;
  error: errorObj;
  textInputError: boolean;
  editProfileLoad: boolean;
  passportPhotoPreview: string;
  email: string;
  edit: boolean;
  photoDialogEdit: boolean;
  dialogOpen: boolean;
  profilePhoto: string;
  saveProfilePhotoLoad: boolean;
  profilePhotoPreview: string;
  deleteProfilePhotoLoad: boolean;
  applicationStatNo: {
    all: number;
    approved: number;
    processing: number;
    rejected: number;
  };
}

interface payload {
  navigate: NavigateFunction;
  profileData: valueObj;
  passportSizePhoto: File | string;
  profilePhoto: File | string;
}

interface payload2 {
  image: File | string;
  navigate: NavigateFunction;
}

const initialState: stateObj = {
  showComponent: true,
  navLogin: false,
  profileData: {
    profilePhoto: "",
    userAccountName: "",
    name: "",
    adhaarNo: "",
    fuid: "",
    passportSizePhoto: "",
    phoneContact: "",
  },
  error: {
    name: {
      errMsg: "",
      valid: true,
    },
    adhaarNo: {
      errMsg: "",
      valid: true,
    },
    fuid: {
      errMsg: "",
      valid: true,
    },
    passportSizePhoto: {
      errMsg: "",
      valid: true,
    },
    phoneContact: {
      errMsg: "",
      valid: true,
    },
  },
  applicationStatNo: {
    all: 0,
    approved: 0,
    processing: 0,
    rejected: 0,
  },
  email: "",
  textInputError: false,
  editProfileLoad: false,
  passportPhotoPreview: "",
  edit: false,
  photoDialogEdit: false,
  dialogOpen: false,
  profilePhoto: "",
  saveProfilePhotoLoad: false,
  profilePhotoPreview: "",
  deleteProfilePhotoLoad: false,
};

export const getProfileInfo = createAsyncThunk(
  "/profileInfo",
  async (navigate: NavigateFunction, thunkAPI) => {
    try {
      const profileData = await axios.get(`${server}/api/farmers/profile`, {
        withCredentials: true,
      });
      if (profileData.data === "notLogin") {
        toast.warn("You need to login");
        navigate("/login");
      } else if (profileData.data === "roleIsAdmin") {
        toast.error("Access denied !!!");
        navigate("/admin");
      } else if (profileData.data.message === "profileInfoSent") {
        return profileData.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occured try refreshing the page");
      navigate("/");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/updateProfile",
  async (
    { navigate, profileData, passportSizePhoto, profilePhoto }: payload,
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      if (!state.farmerProfile.textInputError) {
        let reqBody = new FormData(); // creating e new form data
        const adhaar = {
          number: Number(profileData.adhaarNo),
          name: profileData.name.trim(),
        };
        const farmersId = Number(profileData.fuid);
        reqBody.append("username", profileData.userAccountName);
        reqBody.append("adhaar", JSON.stringify(adhaar));
        reqBody.append("farmersId", JSON.stringify(farmersId));
        reqBody.append("passportSizePhoto", passportSizePhoto);
        reqBody.append("contactNo", profileData.phoneContact);

        let data = await axios.put(`${server}/api/farmers/profile`, reqBody, {
          withCredentials: true,
        });
        if (data.data === "notLogin") {
          toast.warn("You need to login");
          navigate("/login");
        } else if (data.data === "roleIsAdmin") {
          toast.error("Access denied");
          navigate("/admin");
        } else if (data.data.message === "profileEdited") {
          toast.success("profile edited successfully");
          return data.data.profileInfo;
        }
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error occurred please try refreshing the page");
      navigate("/");
    }
  }
);

export const editProfilePhoto = createAsyncThunk(
  "updateProfilePhoto",
  async ({ image, navigate }: payload2, thunkAPI) => {
    if (image !== "") {
      console.log("request sent");
      let data = new FormData();
      data.append("image", image);
      const response = await axios.patch(
        `${server}/api/farmers/profile/photo`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data === "notLogin") {
        toast.warn("You need to login");
        navigate("/login");
      } else if (response.data === "roleIsAdmin") {
        toast.error("Access denied");
        navigate("/admin");
      } else if (response.data.message === "profilePhotoUpdated") {
        toast.success("profile photo updated successfuly");
        return response.data;
      }
    }
  }
);

export const deleteProfilePhoto = createAsyncThunk(
  "/deleteProfilePhoto",
  async (navigate: NavigateFunction, thunkAPI) => {
    const response = await axios.delete(`${server}/api/farmers/profile/photo`, {
      withCredentials: true,
    });
    if (response.data === "notLogin") {
      toast.warn("You need to login");
      navigate("/login");
    } else if (response.data === "roleIsAdmin") {
      toast.error("Access denied");
      navigate("/admin");
    } else if (response.data.message === "profilePhotoDeleted") {
      toast.success("profile photo deleted successfuly");
      return response.data.message;
    }
  }
);

const FarmerProfileSlice = createSlice({
  name: "farmerProfile",
  initialState,
  reducers: {
    setProfilePhotoPreview: (state, action: PayloadAction<string>) => {
      state.profilePhotoPreview = action.payload;
    },
    setDialogOpen: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.dialogOpen = action.payload;
        state.profilePhotoPreview = "";
      } else {
        state.dialogOpen = action.payload;
      }
    },
    setDialogEdit: (state, action: PayloadAction<boolean>) => {
      state.photoDialogEdit = action.payload;
    },
    setEditStatus: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    setProfileData: (
      state,
      action: PayloadAction<{ profileData: valueObj }>
    ) => {
      state.profileData = action.payload.profileData;
    },
    handleAvatarClick: (state, action: PayloadAction) => {
      const fileInput = document.getElementsByClassName(
        "fileField"
      )[0] as HTMLInputElement;
      fileInput.click();
    },

    handleInputField: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.error[action.payload.name] = { errMsg: "", valid: true };
      state.profileData[action.payload.name] = action.payload.value;
    },

    handleShowComponent: (
      state,
      action: PayloadAction<{ componentStatus: boolean }>
    ) => {
      state.navLogin = true;
      state.showComponent = action.payload.componentStatus;
    },
    profileFileReader: (state, action: PayloadAction<string>) => {
      state.passportPhotoPreview = action.payload;
    },

    validation: (state, action: PayloadAction<{ data: valueObj }>) => {
      const numberRegex = /^[1-9]\d{11}$/;
      const imageRegex = /^.+$/;
      const adhaarNameRegex = /^(?!.*\d)(?!\s)(?!.*\s$).+/;
      const phoneRegex = /^(?!(\d)\1{9})[6,7,8,9]\d{9}$/;
      let err = false;
      if (!numberRegex.test(action.payload.data.adhaarNo)) {
        state.error.adhaarNo = {
          errMsg: "Enter a valid 12 digit adhaar No.",
          valid: false,
        };
        err = true;
      }
      if (!numberRegex.test(action.payload.data.fuid)) {
        state.error.fuid = {
          errMsg: "Enter a valid 12 digit fuid No.",
          valid: false,
        };
        err = true;
      }
      if (!adhaarNameRegex.test(action.payload.data.name.trim())) {
        state.error.name = {
          errMsg: "Enter a valid adhaar name",
          valid: false,
        };
        err = true;
      }
      if (!imageRegex.test(action.payload.data.passportSizePhoto)) {
        state.error.passportSizePhoto = {
          errMsg: "Enter a valid passport size image",
          valid: false,
        };
        err = true;
      }
      if (!phoneRegex.test(action.payload.data.phoneContact)) {
        state.error.phoneContact = {
          errMsg: "Enter a valid 10 digit phone number",
          valid: false,
        };
        err = true;
      }
      state.textInputError = err;
    },
    setEditProfileLoad: (state, action: PayloadAction<boolean>) => {
      state.editProfileLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileInfo.pending, (state, action) => {
      (state.error = {
        name: {
          errMsg: "",
          valid: true,
        },
        adhaarNo: {
          errMsg: "",
          valid: true,
        },
        fuid: {
          errMsg: "",
          valid: true,
        },
        passportSizePhoto: {
          errMsg: "",
          valid: true,
        },
        phoneContact: {
          errMsg: "",
          valid: true,
        },
      }),
        (state.navLogin = false);
      state.showComponent = false;
    });

    builder.addCase(getProfileInfo.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.profileData = action.payload.profileInfo;
        state.email = action.payload.profileInfo.email;
        state.profilePhoto = action.payload.profileInfo.profilePhoto;
        state.passportPhotoPreview =
          action.payload.profileInfo.passportSizePhoto;
        state.applicationStatNo = action.payload.profileInfo.applicationStatNo;
        state.edit = !action.payload.profileCompleteStatus;
      }

      state.navLogin = true;
      state.showComponent = true;
    });

    builder.addCase(getProfileInfo.rejected, (state, action) => {
      state.navLogin = false;
      state.showComponent = false;
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      state.editProfileLoad = true;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.profileData = action.payload;
        state.edit = false;
      }

      state.editProfileLoad = false;
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.editProfileLoad = false;
    });

    builder.addCase(editProfilePhoto.pending, (state, action) => {
      state.saveProfilePhotoLoad = true;
    });
    builder.addCase(editProfilePhoto.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.profilePhoto = action.payload.updatedProfilePhoto;
        localStorage.setItem(
          "profilePhoto",
          JSON.stringify(action.payload.updatedProfilePhoto)
        );
      }
      state.saveProfilePhotoLoad = false;
      state.photoDialogEdit = false;
      state.dialogOpen = false;
    });

    builder.addCase(deleteProfilePhoto.pending, (state, action) => {
      state.deleteProfilePhotoLoad = true;
    });

    builder.addCase(deleteProfilePhoto.fulfilled, (state, action) => {
      if (action.payload != undefined) {
        state.deleteProfilePhotoLoad = false;
      }
      state.profilePhoto = "";
      localStorage.setItem("profilePhoto", JSON.stringify(""));
      state.dialogOpen = false;
      state.profilePhotoPreview = "";
      state.profilePhoto = "";
    });

    builder.addCase(deleteProfilePhoto.rejected, (state, action) => {
      state.deleteProfilePhotoLoad = false;
    });
  },
});

export default FarmerProfileSlice.reducer;
export const {
  handleAvatarClick,
  handleInputField,
  handleShowComponent,
  validation,
  profileFileReader,
  setEditProfileLoad,
  setEditStatus,
  setDialogOpen,
  setDialogEdit,
  setProfilePhotoPreview,
} = FarmerProfileSlice.actions;

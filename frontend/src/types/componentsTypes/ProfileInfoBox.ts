import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { errorObj, valueObj } from "../routesTypes/user/Profile";

export interface Action {
  type: string;
}

export interface profileInfoBoxObj {
  profileData: valueObj;
  edit: boolean;
  error: errorObj;
  setTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  editProfileLoad: boolean;
  passportPhotoPreview: string;
  email: string;
  dispatch: ThunkDispatch<RootState, undefined, Action>;
}

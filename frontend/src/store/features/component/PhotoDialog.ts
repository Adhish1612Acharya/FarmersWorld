import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Action {
  type: string;
}

export interface profileDialogObj {
  open: boolean;
  editProfilePhoto: boolean;
  dispatch: ThunkDispatch<RootState, undefined, Action>;
  photoLink: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setHiddenInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveProfilePhotoLoad: boolean;
  photoPreview: string;
  deleteProfilePhotoLoad: boolean;
  deleteProfilePhoto: () => void;
}

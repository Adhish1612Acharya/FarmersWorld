import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ChangeEvent } from "react";

export interface hiddenFileInputObj {
  setHiddenInput: (event: ChangeEvent<HTMLInputElement>) => void;
  saveProfilePhotoLoad: boolean;
}

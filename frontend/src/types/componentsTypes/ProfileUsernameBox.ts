import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface profileUsernameBoxObj {
  username: string;
  email: string;
  dispatch: ThunkDispatch<RootState, undefined, Action>;
  profilePhotoLink: string;
  applicationStatNo: {
    all: number;
    approved: number;
    rejected: number;
    processing: number;
  };
}

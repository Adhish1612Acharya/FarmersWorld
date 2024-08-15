import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface showRejectReasonDialog {
  open: boolean;
  dispatch: ThunkDispatch<RootState, undefined, Action>;
  rejectReason: string;
}

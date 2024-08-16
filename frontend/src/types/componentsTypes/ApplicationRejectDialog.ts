import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent } from "react";
import { RootState } from "../../store/store";

export interface applicationRejectDialogObj {
  open: boolean;
  value: string;
  setTextField: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error: boolean;
  dispatch: ThunkDispatch<RootState, undefined, Action>;
  rejectReasonLoad: boolean;
}

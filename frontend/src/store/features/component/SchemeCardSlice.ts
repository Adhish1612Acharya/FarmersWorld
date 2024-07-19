import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  applicationObj,
  schemeObj,
} from "../../../types/componentsTypes/SchemeCard";

interface statBtnObj {
  status: string;
  color: string;
}

interface stateObj {
  statBtn: statBtnObj;
  count: number;
}

const initialState: stateObj = {
  statBtn: {
    status: "",
    color: "",
  },
  count: 0,
};

export const SchemeCardSlice = createSlice({
  name: "schemCard",
  initialState,
  reducers: {
    updateStatBtn: (
      state,
      action: PayloadAction<{
        application: applicationObj | undefined;
      }>
    ) => {
      const application = action.payload.application;
      if (application?.processing === true) {
        state.statBtn = { status: "Processing", color: "yellow" };
      } else if (application?.approved === true) {
        state.statBtn = { status: "Approved", color: "green" };
      } else if (
        application?.approved === false &&
        application?.processing === false
      ) {
        state.statBtn = { status: "Rejected", color: "red" };
      }
    },
    getNoOfApplications: (
      state,
      action: PayloadAction<{ scheme: schemeObj }>
    ) => {
      let value = 0;
      console.log("noOfApplications");
      for (let application of action.payload.scheme.applications) {
        if (
          typeof application !== "string" &&
          application.processing === true
        ) {
          value++;
        }
      }
      console.log(value);
      state.count = value;
    },
  },
});

export default SchemeCardSlice.reducer;
export const { updateStatBtn, getNoOfApplications } = SchemeCardSlice.actions;

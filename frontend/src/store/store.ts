import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import homeReducer from "./features/farmer/HomeSlice";
import schemeDetailReducer from "./features/farmer/SchemeDetailSlice";
import applySchemeReducer from "./features/farmer/ApplySchemeSlice";
import applicationDetailReducer from "./features/farmer/ApplicationDetailSlice";
import userApplicationsReducer from "./features/farmer/UserApplicationSlice";
import schemeCardReducer from "./features/component/SchemeCardSlice";
import adminbHomePageReducer from "./features/admin/AdminHomePageSlice";
import adminApplicationsReducer from "./features/admin/ApplicationSlice";
import adminApplicationDetailReducer from "./features/admin/ApplicationDetailSlice";
import LoginPageSliceReducer from "./features/otherPages/LoginPageSlice";
import SignUpPageSliceReducer from "./features/otherPages/SignUpPageSlice";
import ErrorPageSliceReducer from "./features/otherPages/ErrorPageSlice";
import SchemeApplyReducer from "./features/component/ApplicationSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    schemeDetail: schemeDetailReducer,
    applyScheme: applySchemeReducer,
    applicationDetail: applicationDetailReducer,
    userApplications: userApplicationsReducer,
    schemeCard: schemeCardReducer,
    adminHomePage: adminbHomePageReducer,
    adminApplications: adminApplicationsReducer,
    adminApplicationDetail: adminApplicationDetailReducer,
    loginPage: LoginPageSliceReducer,
    signUpPage: SignUpPageSliceReducer,
    errorPage: ErrorPageSliceReducer,
    application: SchemeApplyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

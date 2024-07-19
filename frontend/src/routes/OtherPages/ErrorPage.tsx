import { useRouteError } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { CircularProgress, ThemeProvider } from "@mui/material";
import {
  checkLogin,
  getErrorMsg,
} from "../../store/features/otherPages/ErrorPageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";

const ErrorPage: FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector((state) => state.errorPage.showComponent);
  let navLogin = useAppSelector((state) => state.errorPage.navLogin);
  let admin = useAppSelector((state) => state.errorPage.admin);
  let errMsg = useAppSelector((state) => state.errorPage.errMsg);

  useEffect(() => {
    dispatch(checkLogin());
    dispatch(getErrorMsg({ error }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <div className="errorPage">
            <NavBar login={navLogin} admin={admin} />
            <Alert severity="error">
              {" "}
              <h1>Oops there was an error</h1>
            </Alert>
            <p>
              <b>`{errMsg}`</b>
            </p>
          </div>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default ErrorPage;

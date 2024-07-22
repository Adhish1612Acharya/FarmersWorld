import { useRouteError } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { checkLogin } from "../../store/features/otherPages/ErrorPageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";
import {
  getErrorPageType,
  ErrorType,
} from "../../types/routesTypes/OtherPages/ErrorPage";

const ErrorPage: FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector((state) => state.errorPage.showComponent);
  let navLogin = useAppSelector((state) => state.errorPage.navLogin);
  let admin = useAppSelector((state) => state.errorPage.admin);
  let [errMsg, setErrMsg] = useState<any>("");
  let home = window.location.pathname;

  const getErrorMsg: getErrorPageType = (error: ErrorType) => {
    if (error instanceof Error) {
      setErrMsg(error.message);
    } else if (typeof error === "string") {
      setErrMsg(error);
    } else {
      setErrMsg("Page not found");
    }
  };

  useEffect(() => {
    dispatch(checkLogin());
    getErrorMsg(error);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <div className="errorPage">
            <NavBar
              login={navLogin}
              admin={admin}
              homePage={home == "/" ? true : false}
              navigate={navigate}
            />
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

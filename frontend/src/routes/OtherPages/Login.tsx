import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";
import { Button, ThemeProvider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../serv";
import {
  checkLogin,
  setApiRoute,
} from "../../store/features/otherPages/LoginPageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";

const Login: FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector((state) => state.loginPage.showComponent);
  let apiRoute = useAppSelector((state) => state.loginPage.apiRoute);

  useEffect(() => {
    dispatch(checkLogin(navigate));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar login={false} />
            <h1>
              Login as{" "}
              {apiRoute === "farmers/login" ? (
                <span>Farmer</span>
              ) : (
                <span>Admin</span>
              )}
            </h1>
            {apiRoute === "farmers/login" ? (
              <>
                <Button
                  variant="contained"
                  disabled
                  style={{ backgroundColor: "#1976d2", color: "white" }}
                >
                  <b>Farmer</b>
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(setApiRoute("admin/login"));
                  }}
                  style={{ backgroundColor: "#BDBDBD", color: "black" }}
                >
                  Admin
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(setApiRoute("farmers/login"));
                  }}
                  style={{ backgroundColor: "#BDBDBD", color: "black" }}
                >
                  Farmer
                </Button>
                <Button
                  variant="contained"
                  disabled
                  style={{ backgroundColor: "#1976d2", color: "white" }}
                >
                  <b>Admin</b>
                </Button>
              </>
            )}
            <LoginForm route={apiRoute} />
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default Login;

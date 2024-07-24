import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";
import { Button, ThemeProvider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
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
            <NavBar
              login={false}
              admin={false}
              homePage={false}
              navigate={navigate}
            />
            <div className="loginForm">
              <div className="heading">
                <h1>
                  Login as{" "}
                  {apiRoute === "farmers/login" ? (
                    <span>Farmer</span>
                  ) : (
                    <span>Admin</span>
                  )}
                </h1>
              </div>
              <div className="buttons">
                {apiRoute === "farmers/login" ? (
                  <>
                    <Button
                      variant="contained"
                      disabled
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        margin: "1rem",
                      }}
                    >
                      <b>Farmer</b>
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(setApiRoute("admin/login"));
                      }}
                      style={{
                        backgroundColor: "#BDBDBD",
                        color: "black",
                        margin: "1rem",
                      }}
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
                      style={{
                        backgroundColor: "#BDBDBD",
                        color: "black",
                        margin: "1rem",
                      }}
                    >
                      Farmer
                    </Button>
                    <Button
                      variant="contained"
                      disabled
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        margin: "1rem",
                      }}
                    >
                      <b>Admin</b>
                    </Button>
                  </>
                )}
              </div>
              <LoginForm route={apiRoute} />
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default Login;

import NavBar from "../../components/NavBar";
import SignUpForm from "../../components/SignUpForm";
import { Button, ThemeProvider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../serv";
import {
  checkLogin,
  setApiRoute,
} from "../../store/features/otherPages/SignUpPageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";

const SignUp: FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector((state) => state.signUpPage.showComponent);
  let apiRoute = useAppSelector((state) => state.signUpPage.apiRoute);

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
              SignUp as{" "}
              {apiRoute === "farmers/signUp" ? (
                <span>Farmer</span>
              ) : (
                <span>Admin</span>
              )}
            </h1>
            {apiRoute === "farmers/signUp" ? (
              <>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#1976d2", color: "white" }}
                  disabled
                >
                  <b>Farmer</b>
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#BDBDBD", color: "black" }}
                  onClick={() => {
                    dispatch(setApiRoute("admin/signUp"));
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
                    dispatch(setApiRoute("farmers/signUp"));
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
            <SignUpForm route={apiRoute} />
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default SignUp;

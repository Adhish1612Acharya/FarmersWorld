import NavBar from "../../components/NavBar";
import SignUpForm from "../../components/SignUpForm";
import { Button, ThemeProvider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import {
  checkLogin,
  setApiRoute,
} from "../../store/features/otherPages/SignUpPageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";
import "../../styles/Form.css";

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
            <NavBar
              login={false}
              admin={false}
              homePage={false}
              navigate={navigate}
            />
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

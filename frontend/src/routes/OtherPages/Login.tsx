import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import {
  checkLogin,
  setApiRoute,
} from "../../store/features/otherPages/LoginPageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to={"/"} color="inherit">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

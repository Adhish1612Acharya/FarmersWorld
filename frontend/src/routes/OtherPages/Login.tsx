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
            {/* <NavBar
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
              <Grid item style={{ marginTop: "1rem" }}>
                <Link to="/signUp" style={{ textDecoration: "underline" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </div> */}
            <Grid container component="main" sx={{ height: "100vh" }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage:
                    'url("https://tse1.mm.bing.net/th?id=OIP.453aldmS-1zjZKymdeK8GAHaE9&pid=Api")',

                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <NavBar
                  login={false}
                  admin={false}
                  homePage={false}
                  navigate={navigate}
                />
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
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
                  <Box
                    component="form"
                    noValidate
                    // onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link to="/signUp">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default Login;

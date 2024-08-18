import { Link } from "react-router-dom";
import "../styles/Form.css";
import { FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormProps } from "../types/componentsTypes/LoginForm";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  login,
  setFormData,
  validateForm,
} from "../store/features/otherPages/LoginPageSlice";
import theme from "../theme";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { setApiRoute } from "../store/features/otherPages/LoginPageSlice";
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
        FarmersWorld
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginForm: FC<loginFormProps> = ({ route }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let value = useAppSelector((state) => state.loginPage.value);
  let error = useAppSelector((state) => state.loginPage.error);
  let loginLoad = useAppSelector((state) => state.loginPage.loginLoad);

  let setInputData = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      setFormData({ name: event.target.name, value: event.target.value })
    );
  };

  let preventFormDefault = async (
    event: React.FormEvent<HTMLFormElement>,
    apiRoute: string
  ): Promise<void> => {
    event.preventDefault();
    dispatch(validateForm({ loginData: value }));

    dispatch(login({ apiRoute, value, navigate }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              route === "farmers/login"
                ? "url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPJE-W8GqloneY1by63uPPTnK_6abrG1Y_hDxmBda4BUQmOB7-ejxc7za10h65n2z2D0IudXZxc205WmxmV7hZwW8YpM406qUQOkzSrqDQg1dGq4pS_8ZkI0zFzADUNZwWoL4VeRbYyStkfLe2zEZs1ob1sFtdtrEETPm1GtpaVyWpmTGu6r17mqEP8OA/s3072/InShot_20240521_002930682.jpg)"
                : "url(https://icon-library.com/images/admin-icon/admin-icon-12.jpg)",

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            transform: "scale(0.6)",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Login
            </Typography>
            <div className="heading">
              <h1>
                Login as{" "}
                {route === "farmers/login" ? (
                  <span>Farmer</span>
                ) : (
                  <span>Admin</span>
                )}
              </h1>
            </div>
            <div className="buttons">
              {route === "farmers/login" ? (
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
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                preventFormDefault(event, route);
              }}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setInputData(event)
                }
                value={value.username}
                error={!error.username.valid}
                helperText={error.username.errMsg}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setInputData(event)
                }
                value={value.password}
                error={!error.password.valid}
                helperText={error.password.errMsg}
              />
              {!loginLoad ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              ) : (
                <LoadingButton
                  fullWidth
                  loading={true}
                  variant="contained"
                  disabled
                  sx={{ mt: 3, mb: 2 }}
                >
                  <span>disabled</span>
                </LoadingButton>
              )}

              <Grid container>
                <Grid item>
                  <Link to="/signUp">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;

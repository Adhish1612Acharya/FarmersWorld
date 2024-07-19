import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Filter from "./Filter";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { server } from "../serv";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { navbarProps } from "../types/componentsTypes/NavBar";
import {
  getSchemesData,
  setLoading,
  setLogin,
} from "../store/features/farmer/HomeSlice";
import { useAppDispatch } from "../store/store";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

const NavBar: React.FC<navbarProps> = ({ homePage, login, admin }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pages = [
    {
      name: "All Schemes",
      to: admin ? "/admin" : "/",
    },
    {
      name: "Login",
      to: "/login",
    },
    {
      name: "SignUp",
      to: "/signUp",
    },
  ];

  const settings = ["Profile", "Applications", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (link: string): void => {
    if (link === "Logout") {
      logoutFunction();
    } else if (link === "Applications") {
      navigate("/schemes/applications");
    }
    setAnchorElUser(null);
  };

  let logoutFunction = async (): Promise<void> => {
    dispatch(setLoading(true));
    await axios
      .get(`/api/logOut`, { withCredentials: true })
      .then((res) => {
        if (res.data === "loggedOut") {
          dispatch(setLogin(false));
          toast.success("Successfully Logged Out");
          if (window.location.pathname === "/") {
            dispatch(getSchemesData(navigate));
            dispatch(setLoading(false));
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          className="navbar"
        >
          <AppBar position="static">
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "25%",
                  justifyContent: "space-evenly",
                  mr: "5rem",
                }}
              >
                <Avatar
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  alt="Remy Sharp"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPJE-W8GqloneY1by63uPPTnK_6abrG1Y_hDxmBda4BUQmOB7-ejxc7za10h65n2z2D0IudXZxc205WmxmV7hZwW8YpM406qUQOkzSrqDQg1dGq4pS_8ZkI0zFzADUNZwWoL4VeRbYyStkfLe2zEZs1ob1sFtdtrEETPm1GtpaVyWpmTGu6r17mqEP8OA/s3072/InShot_20240521_002930682.jpg"
                />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    fontFamily: "Rubic",
                    fontWeight: 700,
                    letterSpacing: "0.1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  FarmersWorld
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {pages.map((page) => (
                  <div key={page.name}>
                    {page.name === "Login" || page.name === "SignUp" ? (
                      <>
                        {!login ? (
                          <Link
                            to={page.to}
                            key={page.name}
                            style={{ color: "white" }}
                          >
                            {page.name}
                          </Link>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {page.name === "All Schemes" ? (
                          <>
                            {admin ? (
                              <>
                                {window.location.pathname === "/admin" ? (
                                  <Link
                                    to={page.to}
                                    onClick={() =>
                                      dispatch(getSchemesData(navigate))
                                    }
                                    key={page.name}
                                    style={{ color: "white" }}
                                  >
                                    {page.name}
                                  </Link>
                                ) : (
                                  <Link
                                    to={page.to}
                                    key={page.name}
                                    style={{ color: "white" }}
                                  >
                                    {page.name}
                                  </Link>
                                )}
                              </>
                            ) : (
                              <>
                                {window.location.pathname === "/" ? (
                                  <Link
                                    to={page.to}
                                    onClick={() =>
                                      dispatch(getSchemesData(navigate))
                                    }
                                    key={page.name}
                                    style={{ color: "white" }}
                                  >
                                    {page.name}
                                  </Link>
                                ) : (
                                  <Link
                                    to={page.to}
                                    key={page.name}
                                    style={{ color: "white" }}
                                  >
                                    {page.name}
                                  </Link>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <Link
                            to={page.to}
                            key={page.name}
                            style={{ color: "white" }}
                          >
                            {page.name}
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </Box>

              {login ? (
                <>
                  <Box sx={{ flexGrow: 1 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu(setting);
                          }}
                        >
                          {setting === "Applications" ? (
                            !admin ? (
                              <Typography textAlign="center">
                                {setting}
                              </Typography>
                            ) : null
                          ) : (
                            <Typography textAlign="center">
                              {setting}
                            </Typography>
                          )}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              ) : null}
            </Toolbar>
          </AppBar>
          {homePage ? (
            <Box
              sx={{
                backgroundColor: "rgba(240,240,240,1)",
                width: "100vw",
                height: "4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Filter
                filters={["schemes", "subsidies", "products", "newTech"]}
              />
            </Box>
          ) : null}
        </Box>
      </>
    </ThemeProvider>
  );
};

export default NavBar;

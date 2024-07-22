import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { navbarProps } from "../types/componentsTypes/NavBar";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import "../styles/NavBar.css";
import { useAppDispatch } from "../store/store";
import {
  getSchemesData,
  setLoading,
  setLogin,
} from "../store/features/farmer/HomeSlice";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar: React.FC<navbarProps> = ({
  homePage,
  login,
  admin,
  navigate,
}) => {
  const dispatch = useAppDispatch();
  let pages;
  {
    !login
      ? (pages = [
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
        ])
      : (pages = [
          {
            name: "All Schemes",
            to: admin ? "/admin" : "/",
          },
        ]);
  }
  const settings = admin
    ? ["Profile", "Logout"]
    : ["Profile", "Applications", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (
    navigate: NavigateFunction,
    link?: string
  ): void => {
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
    <Box
      sx={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}
      className="navbar"
    >
      <AppBar
        position="static"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "flex" },
                height: "100%",
                width: "50%",
                alignItems: "center",
                justifyContent: { xs: "space-evenly", md: "start" },
              }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "flex", md: "none" },
                  marginRight: "1rem",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{
                    display: { xs: "block", md: "none" },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {pages.map((page) =>
                    (page.name === "All Schemes" &&
                      window.location.pathname === "/") ||
                    window.location.pathname === "/admin" ? (
                      <Link
                        to={page.to}
                        onClick={() => dispatch(getSchemesData(navigate))}
                        style={{ color: "black", display: "block" }}
                        key={page.name}
                      >
                        <MenuItem key={page.name}>
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ) : (
                      <Link
                        to={page.to}
                        style={{ color: "black", display: "block" }}
                        key={page.name}
                      >
                        <MenuItem key={page.name}>
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        </MenuItem>
                      </Link>
                    )
                  )}
                </Menu>
              </Box>
              <Avatar
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: "20%",
                  ml: "5%",
                  p: 0,
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                alt="Remy Sharp"
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPJE-W8GqloneY1by63uPPTnK_6abrG1Y_hDxmBda4BUQmOB7-ejxc7za10h65n2z2D0IudXZxc205WmxmV7hZwW8YpM406qUQOkzSrqDQg1dGq4pS_8ZkI0zFzADUNZwWoL4VeRbYyStkfLe2zEZs1ob1sFtdtrEETPm1GtpaVyWpmTGu6r17mqEP8OA/s3072/InShot_20240521_002930682.jpg"
              />

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                FarmersWorld
              </Typography>

              <Avatar
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 2,
                  p: 0,
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                alt="Remy Sharp"
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPJE-W8GqloneY1by63uPPTnK_6abrG1Y_hDxmBda4BUQmOB7-ejxc7za10h65n2z2D0IudXZxc205WmxmV7hZwW8YpM406qUQOkzSrqDQg1dGq4pS_8ZkI0zFzADUNZwWoL4VeRbYyStkfLe2zEZs1ob1sFtdtrEETPm1GtpaVyWpmTGu6r17mqEP8OA/s3072/InShot_20240521_002930682.jpg"
              />

              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "sans-serif",
                  fontSize: "medium",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                FarmersWorld
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "100%",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  display: {
                    flexGrow: 1,
                    xs: "none",
                    md: "flex",
                    marginRight: "2rem",
                    justifyContent: "space-evenly",
                  },
                }}
              >
                {pages.map((page) =>
                  (page.name === "All Schemes" &&
                    window.location.pathname === "/") ||
                  window.location.pathname === "/admin" ? (
                    <Link
                      key={page.name}
                      to={page.to}
                      onClick={() => dispatch(getSchemesData(navigate))}
                      style={{ color: "white", display: "block" }}
                    >
                      {page.name}
                    </Link>
                  ) : (
                    <Link
                      key={page.name}
                      to={page.to}
                      style={{ color: "white", display: "block" }}
                    >
                      {page.name}
                    </Link>
                  )
                )}
              </Box>
              {login ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
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
                    onClose={() => handleCloseUserMenu(navigate)}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          handleCloseUserMenu(navigate, setting);
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {homePage ? (
        <Box
          sx={{
            backgroundColor: "rgba(240,240,240,1)",
            width: "100%",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Filter filters={["schemes", "subsidies", "products", "newTech"]} />
        </Box>
      ) : null}
    </Box>
  );
};

export default NavBar;

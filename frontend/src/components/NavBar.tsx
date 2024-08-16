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
  setLogoutLoad,
} from "../store/features/farmer/HomeSlice";
import axios from "axios";
import { toast } from "react-toastify";
import InputIcon from "@mui/icons-material/Input";

const NavBar: React.FC<navbarProps> = ({
  homePage,
  login,
  admin,
  navigate,
}) => {
  const dispatch = useAppDispatch();

  const storageData: string | null = localStorage.getItem("profilePhoto");
  let profilePhoto: string = storageData ? JSON.parse(storageData) : "";
  let pages;
  {
    !login
      ? (pages = [
          {
            name: "All Schemes",
            to: admin ? "/admin" : "/",
            icon: <i className="fas fa-th-list"></i>,
          },
          {
            name: "Login",
            to: "/login",
            icon: <i className="fas fa-sign-in-alt"></i>,
          },
          {
            name: "SignUp",
            to: "/signUp",
            icon: <i className="fas fa-user-plus"></i>,
          },
        ])
      : (pages = [
          {
            name: "All Schemes",
            to: admin ? "/admin" : "/",
            icon: <i className="fas fa-th-list"></i>,
          },
        ]);
  }
  const settings = admin
    ? [
        {
          type: "Logout",
          icon: <i className="fas fa-sign-out-alt"></i>,
        },
      ]
    : [
        {
          type: "Profile",
          to: "/profile",
          icon: <i className="fas fa-user-circle"></i>,
        },
        {
          type: "Applications",
          to: "/schemes/applications",
          icon: <i className="fas fa-file-alt"></i>,
        },
        {
          type: "Logout",
          icon: <i className="fas fa-sign-out-alt"></i>,
        },
      ];

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
    link?: string,
    to?: string
  ): void => {
    if (link === "Logout") {
      logoutFunction();
    } else {
      if (to) {
        navigate(to);
      }
    }
    setAnchorElUser(null);
  };

  let logoutFunction = async (): Promise<void> => {
    localStorage.setItem("filter", "");
    localStorage.setItem("applicationTypeNo", "");
    localStorage.setItem("applicationFilter", "");
    localStorage.setItem("profilePhoto", "");
    dispatch(setLoading(true));
    dispatch(setLogoutLoad(true));
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
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
      }}
      className="navbar"
    >
      <AppBar
        position="static"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#ffffff",
          color: "#1c1c1c",
          borderBottom: "1px solid #e0e0e0",
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
                    color: "black",
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
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page.icon} &nbsp;{page.name}
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
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page.icon}&nbsp; {page.name}
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
                alt=""
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
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
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
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
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
                      onClick={() => {
                        localStorage.setItem("filter", "");
                        dispatch(getSchemesData(navigate));
                      }}
                      style={{ color: "black", display: "block" }}
                    >
                      {page.icon}&nbsp; {page.name}
                    </Link>
                  ) : (
                    <Link
                      key={page.name}
                      to={page.to}
                      onClick={() => {
                        localStorage.setItem("filter", "");
                      }}
                      style={{ color: "black", display: "block" }}
                    >
                      {page.icon} &nbsp;
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
                      <Avatar alt="" src={profilePhoto} />
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
                        key={setting.type}
                        onClick={() => {
                          handleCloseUserMenu(
                            navigate,
                            setting.type,
                            setting.to
                          );
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.icon}&nbsp;
                          {setting.type}
                        </Typography>
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

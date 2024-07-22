import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, CircularProgress, ThemeProvider } from "@mui/material";
import NavBar from "../../components/NavBar";
import SchemeCard from "../../components/SchemeCard";
import {
  getUserApplications,
  getFilterApplications,
} from "../../store/features/farmer/UserApplicationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { stateBtnObj } from "../../store/features/farmer/UserApplicationSlice";
import theme from "../../theme";

const UserApplications: FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector(
    (state) => state.userApplications.showComponent
  );
  let navLogin = useAppSelector((state) => state.userApplications.navLogin);
  let applications = useAppSelector(
    (state) => state.userApplications.applications
  );
  let applicationType = useAppSelector(
    (state) => state.userApplications.applicationType
  );
  let filterLoad = useAppSelector((state) => state.userApplications.filterLoad);
  let statBtns = useAppSelector((state) => state.userApplications.statBtn);

  let clicked = useAppSelector((state) => state.userApplications.clicked);
  let btnId = useAppSelector((state) => state.userApplications.btnId);
  let statNo = useAppSelector((state) => state.userApplications.statNo);

  useEffect(() => {
    dispatch(getUserApplications(navigate));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar
              login={navLogin}
              admin={false}
              homePage={false}
              navigate={navigate}
            />

            {!filterLoad ? (
              <>
                <div className="btns">
                  <h2 style={{ marginTop: "3rem" }}>
                    {applicationType.toUpperCase()} APPLICATIONS
                  </h2>
                  <Badge
                    badgeContent={statNo.all}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    color="primary"
                    showZero
                  >
                    <Button
                      onClick={() => dispatch(getUserApplications(navigate))}
                      variant="contained"
                      id="all"
                      style={{
                        marginRight: "1rem",
                        color: btnId === "all" ? "black" : "",
                        backgroundColor:
                          clicked && btnId === "all" ? "#BDBDBD" : "orange",
                      }}
                      disabled={clicked && btnId === "all" ? true : false}
                    >
                      All Applications
                    </Button>
                  </Badge>
                  <Badge
                    badgeContent={statNo.approved}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    color="primary"
                    showZero
                  >
                    <Button
                      onClick={() =>
                        dispatch(
                          getFilterApplications({
                            navigate,
                            filter: "approved",
                          })
                        )
                      }
                      variant="contained"
                      color="success"
                      style={{
                        marginRight: "1rem",
                        color: btnId === "approved" ? "black" : "",
                      }}
                      disabled={clicked && btnId === "approved" ? true : false}
                    >
                      Approved
                    </Button>
                  </Badge>
                  <Badge
                    badgeContent={statNo.rejected}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    color="primary"
                    showZero
                  >
                    <Button
                      onClick={() =>
                        dispatch(
                          getFilterApplications({
                            navigate,
                            filter: "rejected",
                          })
                        )
                      }
                      variant="contained"
                      color="error"
                      style={{
                        marginRight: "1rem",
                        color: btnId === "rejected" ? "black" : "",
                      }}
                      disabled={clicked && btnId === "rejected" ? true : false}
                    >
                      Rejected
                    </Button>
                  </Badge>
                  <Badge
                    badgeContent={statNo.processing}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    color="primary"
                    showZero
                  >
                    <Button
                      onClick={() =>
                        dispatch(
                          getFilterApplications({
                            navigate,
                            filter: "processing",
                          })
                        )
                      }
                      variant="contained"
                      color="secondary"
                      style={{
                        marginRight: "1rem",
                        color: btnId === "processing" ? "black" : "",
                      }}
                      disabled={
                        clicked && btnId === "processing" ? true : false
                      }
                    >
                      Processing
                    </Button>
                  </Badge>
                </div>

                {applications?.length === 0 ? (
                  <h1>
                    NO APPLICATIONS{" "}
                    {applicationType === "processing"
                      ? "UNDER PROCESSING"
                      : applicationType === "all"
                      ? ""
                      : applicationType.toUpperCase()}
                  </h1>
                ) : null}
                {applications.map((application, index) => {
                  return (
                    <a
                      href={`/schemes/applications/${application._id}`}
                      key={application._id}
                      style={{ textDecoration: "none" }}
                    >
                      <SchemeCard
                        key={application._id}
                        scheme={application.schemeName}
                        isApplication={true}
                        home={false}
                        statBtn={
                          Array.isArray(statBtns) ? statBtns[index] : statBtns
                        }
                      />
                    </a>
                  );
                })}
              </>
            ) : (
              <CircularProgress style={{ position: "fixed", left: "50%" }} />
            )}
          </>
        ) : (
          <CircularProgress style={{ position: "fixed", left: "50%" }} />
        )}
      </>
    </ThemeProvider>
  );
};

export default UserApplications;

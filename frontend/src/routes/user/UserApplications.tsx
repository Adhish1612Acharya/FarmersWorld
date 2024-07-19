import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
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

  useEffect(() => {
    dispatch(getUserApplications(navigate));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar login={navLogin} admin={false} homePage={false} />

            {!filterLoad ? (
              <>
                <div className="btns">
                  <h2 style={{ marginTop: "3rem" }}>
                    {applicationType} Applications
                  </h2>
                  <Button
                    onClick={() => dispatch(getUserApplications(navigate))}
                    variant="contained"
                    id="all"
                    style={{ marginRight: "1rem" }}
                  >
                    All Applications
                  </Button>
                  <Button
                    onClick={() =>
                      dispatch(
                        getFilterApplications({ navigate, filter: "approved" })
                      )
                    }
                    variant="contained"
                    color="success"
                    style={{ marginRight: "1rem" }}
                  >
                    Approved
                  </Button>
                  <Button
                    onClick={() =>
                      dispatch(
                        getFilterApplications({ navigate, filter: "rejected" })
                      )
                    }
                    variant="contained"
                    color="error"
                    style={{ marginRight: "1rem" }}
                  >
                    Rejected
                  </Button>
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
                    style={{ marginRight: "1rem" }}
                  >
                    Processing
                  </Button>
                </div>

                {applications?.length === 0 ? (
                  <h1>No applications {applicationType}</h1>
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

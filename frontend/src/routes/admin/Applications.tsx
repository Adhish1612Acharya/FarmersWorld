import CheckAppl from "../../components/CheckAppl";
import NavBar from "../../components/NavBar";
import { useEffect, FC } from "react";
import {
  useNavigate,
  useLoaderData,
  LoaderFunction,
  LoaderFunctionArgs,
  Link,
} from "react-router-dom";
import { Avatar, CircularProgress, ThemeProvider } from "@mui/material";
import { server } from "../../server";
import { getApplications } from "../../store/features/admin/ApplicationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";
import { deepOrange } from "@mui/material/colors";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FooterDiv from "../../components/FooterDiv";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { schemeId } = params as { schemeId: string };
  return { schemeId };
};

const Applications: FC = () => {
  const { schemeId } = useLoaderData() as { schemeId: string };
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  let showComponent = useAppSelector(
    (state) => state.adminApplications.showComponent
  );
  let navLogin = useAppSelector((state) => state.adminApplications.navLogin);
  let applications = useAppSelector(
    (state) => state.adminApplications.applications
  );
  let heading = useAppSelector((state) => state.adminApplications.heading);
  let logoutLoad = useAppSelector((state) => state.home.logoutLoad);

  useEffect(() => {
    dispatch(getApplications({ id: schemeId, navigate }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          !logoutLoad ? (
            <>
              <NavBar
                login={navLogin}
                homePage={false}
                admin={true}
                navigate={navigate}
              />
              <h1 style={{ marginTop: "4rem" }}>{heading}</h1>
              <Link to="/admin" style={{ color: "black" }}>
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  style={{ marginLeft: "10%" }}
                  variant="rounded"
                >
                  <KeyboardBackspaceIcon />
                </Avatar>
              </Link>
              <div
                style={{
                  height: "max-content",
                  marginTop: "6rem",
                  width: "100%",
                  margin: "auto",
                }}
              >
                {applications.length === 0 ? (
                  <CheckAppl key={"none"} />
                ) : (
                  applications.map((application) => {
                    return (
                      <a
                        href={`/admin/schemes/${schemeId}/applications/${application._id}`}
                        key={application._id}
                        style={{ textDecoration: "none" }}
                      >
                        <CheckAppl
                          key={application._id}
                          application={application}
                        />
                      </a>
                    );
                  })
                )}
              </div>
              <FooterDiv />
            </>
          ) : (
            <CircularProgress />
          )
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default Applications;

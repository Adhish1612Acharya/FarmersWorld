import Application from "../../components/Application";
import NavBar from "../../components/NavBar";
import { useEffect, FC } from "react";
import {
  useNavigate,
  useLoaderData,
  LoaderFunction,
  LoaderFunctionArgs,
} from "react-router-dom";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { server } from "../../server";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getApplicationInfo } from "../../store/features/farmer/ApplySchemeSlice";
import theme from "../../theme";
import FooterDiv from "../../components/FooterDiv";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { id } = params as { id: string };
  let schemeId: string = id;
  return { schemeId };
};

const ApplyScheme: FC = () => {
  const { schemeId } = useLoaderData() as {
    schemeId: string;
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector(
    (state) => state.applyScheme.showComponent
  );
  let navLogin = useAppSelector((state) => state.applyScheme.navLogin);
  let scheme = useAppSelector((state) => state.applyScheme.scheme);
  let logoutLoad = useAppSelector((state) => state.home.logoutLoad);

  useEffect(() => {
    dispatch(getApplicationInfo({ navigate, id: schemeId }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          !logoutLoad ? (
            <>
              <NavBar
                login={navLogin}
                admin={false}
                homePage={false}
                navigate={navigate}
              />
              <div style={{ margin: "auto" }}>
                <h1 style={{ wordWrap: "break-word", marginTop: "64px" }}>
                  Application for : {scheme ? scheme.heading : null}
                </h1>
                <Application schemeId={schemeId} navigate={navigate} />
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

export default ApplyScheme;

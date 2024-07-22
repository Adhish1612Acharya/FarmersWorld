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
import { checkSchemeApplied } from "../../store/features/farmer/ApplySchemeSlice";
import theme from "../../theme";

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

  useEffect(() => {
    dispatch(checkSchemeApplied({ navigate, id: schemeId }));
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
            <h1>Application for : {scheme ? scheme.heading : null}</h1>
            <Application schemeId={schemeId} navigate={navigate} />
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default ApplyScheme;

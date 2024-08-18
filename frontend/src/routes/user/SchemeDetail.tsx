import NavBar from "../../components/NavBar";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import SchemeInfo from "../../components/SchemeInfo";
import { server } from "../../server";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { getSchemeDetail } from "../../store/features/farmer/SchemeDetailSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";
import FooterDiv from "../../components/FooterDiv";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { id } = params as { id: string };
  return { id };
};

const SchemeDetail: FC = () => {
  const { id } = useLoaderData() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let navLogin = useAppSelector((state) => state.schemeDetail.navLogin);
  let showComponent = useAppSelector(
    (state) => state.schemeDetail.showComponent
  );
  let applied = useAppSelector((state) => state.schemeDetail.applied);
  let schemeInfo = useAppSelector((state) => state.schemeDetail.schemeInfo);
  let logoutLoad = useAppSelector((state) => state.home.logoutLoad);

  useEffect(() => {
    dispatch(getSchemeDetail({ navigate, id }));
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
                admin={false}
                navigate={navigate}
              />
              <div
                style={{
                  width: "100%",
                  height: "max-content",
                  backgroundColor: "white",
                }}
              >
                <SchemeInfo
                  info={schemeInfo}
                  applied={applied}
                  navigate={navigate}
                />
              </div>
            </>
          ) : (
            <CircularProgress style={{ margin: "auto" }} />
          )
        ) : (
          <CircularProgress style={{ margin: "auto" }} />
        )}
      </>
    </ThemeProvider>
  );
};

export default SchemeDetail;

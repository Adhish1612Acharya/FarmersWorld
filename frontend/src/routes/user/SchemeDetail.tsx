import NavBar from "../../components/NavBar";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import SchemeInfo from "../../components/SchemeInfo";
import { server } from "../../serv";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { getSchemeDetail } from "../../store/features/farmer/SchemeDetailSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";

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

  useEffect(() => {
    dispatch(getSchemeDetail({ navigate, id }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar login={navLogin} homePage={false} admin={false} />
            <SchemeInfo
              info={schemeInfo}
              applied={applied}
              navigate={navigate}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default SchemeDetail;

import NavBar from "../../components/NavBar";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useEffect, FC } from "react";
import DetailsTable from "../../components/DetailsTable";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import ApplStatusBtn from "../../components/ApplStatusBtn";
import { server } from "../../server";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getApplicationDetail } from "../../store/features/farmer/ApplicationDetailSlice";
import theme from "../../theme";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { applicationId } = params as { applicationId: string };
  return { applicationId };
};

const ApplicationDetails: FC = () => {
  const { applicationId } = useLoaderData() as { applicationId: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const applDetails = useAppSelector(
    (state) => state.applicationDetail.applDetails
  );
  const statusBtn = useAppSelector(
    (state) => state.applicationDetail.statusBtn
  );
  const showComponent = useAppSelector(
    (state) => state.applicationDetail.showComponent
  );
  const navLogin = useAppSelector((state) => state.applicationDetail.navLogin);

  useEffect(() => {
    dispatch(getApplicationDetail({ navigate, id: applicationId }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar
              login={navLogin}
              navigate={navigate}
              admin={false}
              homePage={false}
            />
            <h3 style={{ display: "flex" }}>
              Application Status :{" "}
              {
                <ApplStatusBtn
                  color={statusBtn.color}
                  status={statusBtn.status}
                />
              }
            </h3>
            <DetailsTable
              adhaarNumber={
                typeof applDetails !== "string" ? applDetails.adhaar : ""
              }
              farmersUniqueNumber={
                typeof applDetails !== "string" ? applDetails.farmersId : ""
              }
              imageLink={
                typeof applDetails !== "string" ? applDetails.image : ""
              }
              schemeName={
                typeof applDetails !== "string"
                  ? applDetails.schemeName.heading
                  : ""
              }
              applicationId={
                typeof applDetails !== "string" ? applDetails._id : ""
              }
              admin={false}
            />
            <Button
              variant="contained"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/schemes/applications")}
            >
              Back
            </Button>
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default ApplicationDetails;

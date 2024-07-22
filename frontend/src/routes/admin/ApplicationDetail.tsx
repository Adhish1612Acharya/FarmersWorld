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
import { server } from "../../server";
import { loaderReturnObj } from "../../types/routesTypes/admin/ApplicationDetail";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {
  updateApplicationStatus,
  getApplicationDetails,
} from "../../store/features/admin/ApplicationDetailSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { applicationId, schemeId } = params as {
    applicationId: string;
    schemeId: string;
  };
  return { applicationId, schemeId };
};

const ApplicationDetail: FC = () => {
  const data = useLoaderData() as loaderReturnObj;
  const { applicationId, schemeId } = data;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let applDetails = useAppSelector(
    (state) => state.adminApplicationDetail.applDetails
  );
  let loading = useAppSelector((state) => state.adminApplicationDetail.loading);
  let showComponent = useAppSelector(
    (state) => state.adminApplicationDetail.showComponent
  );
  let navLogin = useAppSelector(
    (state) => state.adminApplicationDetail.navLogin
  );

  useEffect(() => {
    dispatch(getApplicationDetails({ id: applicationId, navigate }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar
              login={navLogin}
              homePage={false}
              admin={true}
              navigate={navigate}
            />
            {!loading ? (
              <>
                <Button
                  onClick={() =>
                    dispatch(
                      updateApplicationStatus({
                        schemeId: schemeId,
                        applicationId: applicationId,
                        status: "approved",
                        navigate: navigate,
                      })
                    )
                  }
                  variant="outlined"
                  color="success"
                  style={{ margin: "1rem" }}
                >
                  Approve Application
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      updateApplicationStatus({
                        schemeId: schemeId,
                        applicationId: applicationId,
                        status: "rejected",
                        navigate: navigate,
                      })
                    )
                  }
                  variant="outlined"
                  color="error"
                  style={{ margin: "1rem" }}
                >
                  Reject Application
                </Button>
              </>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ marginBottom: "1rem" }}
              >
                Processing
              </LoadingButton>
            )}

            <DetailsTable
              adhaarNumber={applDetails ? applDetails.adhaar : ""}
              farmersUniqueNumber={applDetails ? applDetails.farmersId : ""}
              imageLink={applDetails ? applDetails.image : ""}
              schemeName={applDetails ? applDetails.schemeName.heading : ""}
              applicationId={applDetails ? applDetails._id : ""}
              admin={true}
            />
            <Button
              variant="contained"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate(-1)}
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

export default ApplicationDetail;

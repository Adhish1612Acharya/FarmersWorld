import NavBar from "../../components/NavBar";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useEffect, FC, ChangeEvent } from "react";
import DetailsTable from "../../components/DetailsTable";
import { Button, CircularProgress, ThemeProvider } from "@mui/material";
import { server } from "../../server";
import { loaderReturnObj } from "../../types/routesTypes/admin/ApplicationDetail";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {
  updateApplicationStatus,
  getApplicationDetails,
  setRejectDialogOpen,
  setError,
  setRejectReason,
} from "../../store/features/admin/ApplicationDetailSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import theme from "../../theme";
import ApplicationRejectDialog from "../../components/ApplicationRejectDialog";
import FooterDiv from "../../components/FooterDiv";

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
  const applDetails = useAppSelector(
    (state) => state.adminApplicationDetail.applDetails
  );
  const loading = useAppSelector(
    (state) => state.adminApplicationDetail.loading
  );
  const showComponent = useAppSelector(
    (state) => state.adminApplicationDetail.showComponent
  );
  const navLogin = useAppSelector(
    (state) => state.adminApplicationDetail.navLogin
  );
  const logoutLoad = useAppSelector((state) => state.home.logoutLoad);
  const rejectReason = useAppSelector(
    (state) => state.adminApplicationDetail.rejectReason
  );
  const openRejectDialog = useAppSelector(
    (state) => state.adminApplicationDetail.openRejectDialog
  );
  const validateNotification = useAppSelector(
    (state) => state.adminApplicationDetail.validateNotification
  );
  const error = useAppSelector((state) => state.adminApplicationDetail.error);

  const setTextField = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setRejectReason(event.target.value));
  };

  const handleRejectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (/^(?!\s*$).+/.test(rejectReason)) {
      dispatch(
        updateApplicationStatus({
          schemeId: schemeId,
          applicationId: applicationId,
          status: "rejected",
          navigate: navigate,
          rejectReason: rejectReason,
        })
      );
    } else {
      dispatch(setError(true));
    }
  };

  useEffect(() => {
    dispatch(getApplicationDetails({ id: applicationId, navigate }));
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
              {!loading ? (
                <>
                  <div
                    className="approvalBtns"
                    style={{
                      display: "flex",
                      marginRight: " auto",
                      marginLeft: " auto",
                      marginTop: "64px",
                    }}
                  >
                    <Button
                      onClick={() =>
                        dispatch(
                          updateApplicationStatus({
                            schemeId: schemeId,
                            applicationId: applicationId,
                            status: "approved",
                            navigate: navigate,
                            rejectReason: "",
                          })
                        )
                      }
                      variant="outlined"
                      color="success"
                      style={{ margin: "1rem auto" }}
                    >
                      Approve Application
                    </Button>
                    <Button
                      onClick={() => dispatch(setRejectDialogOpen(true))}
                      variant="outlined"
                      color="error"
                      style={{ margin: "1rem" }}
                    >
                      Reject Application
                    </Button>
                  </div>
                </>
              ) : (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  style={{ margin: "1rem auto" }}
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
                admin={"true"}
                name={applDetails ? applDetails?.applicant.adhaar.name : ""}
                contactNo={applDetails ? applDetails?.applicant.contactNo : ""}
              />
              <Button
                variant="contained"
                style={{ width: "50%", margin: "1rem auto" }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <ApplicationRejectDialog
                open={openRejectDialog}
                value={rejectReason}
                error={error}
                setTextField={setTextField}
                handleSubmit={handleRejectSubmit}
                dispatch={dispatch}
              />
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

export default ApplicationDetail;

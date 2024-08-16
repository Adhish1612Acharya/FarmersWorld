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
import {
  getApplicationDetail,
  showFarmerRejectReasonDialog,
} from "../../store/features/farmer/ApplicationDetailSlice";
import theme from "../../theme";
import "../../styles/Table.css";
import ShowRejectReasonDialog from "../../components/ShowRejectReasonDialog";
import FooterDiv from "../../components/FooterDiv";

export const loader: LoaderFunction = ({ params }: LoaderFunctionArgs<any>) => {
  const { applicationId } = params as { applicationId: string };
  return { applicationId };
};

const ApplicationDetails: FC = () => {
  const { applicationId } = useLoaderData() as { applicationId: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const applDetails = useAppSelector(
    (state) => state.applicationDetail?.applDetails
  );
  const statusBtn = useAppSelector(
    (state) => state.applicationDetail?.statusBtn
  );
  const showComponent = useAppSelector(
    (state) => state.applicationDetail?.showComponent
  );
  const navLogin = useAppSelector((state) => state.applicationDetail.navLogin);
  const logoutLoad = useAppSelector((state) => state.home.logoutLoad);

  const rejectReasonDialog = useAppSelector(
    (state) => state.applicationDetail.rejectReasonDialog
  );

  useEffect(() => {
    dispatch(getApplicationDetail({ navigate, id: applicationId }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          !logoutLoad ? (
            <>
              <NavBar
                login={navLogin}
                navigate={navigate}
                admin={false}
                homePage={false}
              />
              <div className="status">
                {
                  <ApplStatusBtn
                    color={statusBtn.color}
                    status={statusBtn.status}
                  />
                }
                {typeof applDetails !== "string" &&
                applDetails.processing == false &&
                applDetails.approved == false ? (
                  <Button
                    style={{ margin: "2rem" }}
                    onClick={() => dispatch(showFarmerRejectReasonDialog(true))}
                    color="secondary"
                    variant="contained"
                  >
                    View Reason
                  </Button>
                ) : null}
              </div>

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
                  typeof applDetails !== "string" ? applDetails.schemeName : ""
                }
                applicationId={
                  typeof applDetails !== "string" ? applDetails._id : ""
                }
                admin={"false"}
                name={typeof applDetails !== "string" ? applDetails.name : ""}
                contactNo={
                  typeof applDetails !== "string" ? applDetails.contactNo : ""
                }
              />
              <Button
                variant="contained"
                style={{
                  width: "50%",
                  margin: "1rem auto",
                }}
                onClick={() => navigate("/schemes/applications")}
              >
                Back
              </Button>
              <ShowRejectReasonDialog
                open={rejectReasonDialog}
                rejectReason={
                  typeof applDetails !== "string"
                    ? applDetails.rejectReason
                    : ""
                }
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

export default ApplicationDetails;

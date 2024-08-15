import { FC } from "react";
import {
  Alert,
  Avatar,
  Box,
  IconButton,
  Paper,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { profileInfoBoxObj } from "../types/componentsTypes/ProfileInfoBox";
import ProfileForm from "./ProfileForm";
import { deepOrange, green, pink } from "@mui/material/colors";
import ProfileAccordian from "./ProfileAccordian";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../theme";
import { setEditStatus } from "../store/features/farmer/FarmerProfileSlice";

const ProfileInfoBox: FC<profileInfoBoxObj> = ({
  profileData,
  edit,
  error,
  setTextField,
  handleFormSubmit,
  editProfileLoad,
  passportPhotoPreview,
  email,
  dispatch,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={6}
        square={false}
        style={{
          width: "75%",
          height: "max-content",
          padding: "2rem",
          margin: "0rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",

          backgroundColor: edit ? "white" : "#D3D3D3",
        }}
      >
        <Box
          style={{
            width: "100%",
            marginBottom: "5rem",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Alert variant="filled" severity="error">
            Below Information is used for applying of schemes. Hence ensure that
            it is correct
          </Alert>
          {!edit ? (
            <Tooltip
              title="Edit Profile"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                aria-label="close"
                onClick={() => dispatch(setEditStatus(true))}
                sx={{
                  color: pink[500],
                }}
              >
                <Avatar sx={{ bgcolor: pink[500] }}>
                  <EditIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>
        <Box style={{ width: "100%" }}>
          {!edit ? (
            <>
              <ProfileAccordian
                name={profileData.name}
                adhaarNo={profileData.adhaarNo}
                fuid={profileData.fuid}
                passportSizePhoto={passportPhotoPreview}
                contactNo={profileData.phoneContact}
              />
            </>
          ) : (
            <ProfileForm
              profileData={profileData}
              error={error}
              handleInputChange={setTextField}
              handleFormSubmit={handleFormSubmit}
              submitLoad={editProfileLoad}
              passportPhotoPreview={passportPhotoPreview}
              email={email}
            />
            //   <p>profileForm</p>
          )}
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ProfileInfoBox;

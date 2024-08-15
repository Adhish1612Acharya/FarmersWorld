import { FC } from "react";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { profileUsernameBoxObj } from "../types/componentsTypes/ProfileUsernameBox";
import "../styles/Profile.css";
import { setDialogOpen } from "../store/features/farmer/FarmerProfileSlice";

const ProfileUsernameBox: FC<profileUsernameBoxObj> = ({
  username,
  email,
  dispatch,
  profilePhotoLink,
  applicationStatNo,
}) => {
  return (
    <>
      <Paper elevation={16} square={false} className="profileUsernameBox">
        <Box
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Avatar
            src={profilePhotoLink}
            onClick={() => dispatch(setDialogOpen(true))}
            sx={{ width: 120, height: 120, cursor: "pointer" }}
          />
          <Typography variant="h6" gutterBottom>
            {username}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <i
              className="fa-solid fa-envelope"
              style={{ marginRight: "0.5rem", fontSize: "larger" }}
            ></i>
            {email}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Badge badgeContent={applicationStatNo.all} color="primary" showZero>
            <Chip
              label="Total Applications"
              color="secondary"
              style={{ marginBottom: "1rem", width: "153px" }}
            />
          </Badge>

          <Badge
            badgeContent={applicationStatNo.approved}
            color="primary"
            showZero
          >
            <Chip
              label="Approved Applications"
              color="success"
              style={{ marginBottom: "1rem", width: "153px" }}
            />
          </Badge>

          <Badge
            badgeContent={applicationStatNo.rejected}
            color="primary"
            showZero
          >
            <Chip
              label="Rejected Applications"
              color="error"
              style={{ marginBottom: "1rem", width: "153px" }}
            />
          </Badge>

          <Badge
            badgeContent={applicationStatNo.processing}
            color="primary"
            showZero
          >
            <Chip
              label="Processing Applications"
              color="warning"
              style={{ marginBottom: "1rem" }}
            />
          </Badge>
        </Box>
      </Paper>
    </>
  );
};

export default ProfileUsernameBox;

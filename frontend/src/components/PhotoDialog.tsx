import { FC } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { profileDialogObj } from "../store/features/component/PhotoDialog";
import { Avatar, IconButton, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  setDialogEdit,
  setDialogOpen,
} from "../store/features/farmer/FarmerProfileSlice";
import theme from "../theme";
import { Form } from "react-router-dom";
import styled from "@emotion/styled";
import HiddenFileInput from "./HIddenFileInput";

import { LoadingButton } from "@mui/lab";

const PhotoDialog: FC<profileDialogObj> = ({
  open,
  editProfilePhoto,
  dispatch,
  photoLink,
  photoPreview,
  handleSubmit,
  setHiddenInput,
  saveProfilePhotoLoad,
  deleteProfilePhotoLoad,
  deleteProfilePhoto,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} fullWidth={true}>
        <IconButton
          aria-label="close"
          onClick={() => {
            dispatch(setDialogEdit(false));
            dispatch(setDialogOpen(false));
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Profile Photo</DialogTitle>
        <DialogContent>
          <Avatar
            alt=""
            src={photoPreview !== "" ? photoPreview : photoLink}
            onClick={() => dispatch(setDialogOpen(true))}
            sx={{
              width: 200,
              height: 200,
              margin: "1rem auto",
              maxWidth: "100%",
            }}
          />
          <Form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              handleSubmit(event)
            }
          >
            <DialogActions>
              {editProfilePhoto ? (
                <>
                  {!saveProfilePhotoLoad ? (
                    <HiddenFileInput
                      setHiddenInput={setHiddenInput}
                      saveProfilePhotoLoad={saveProfilePhotoLoad}
                    />
                  ) : null}

                  {!saveProfilePhotoLoad ? (
                    <Button type="submit" variant={"contained"}>
                      Save
                    </Button>
                  ) : (
                    <LoadingButton
                      size="small"
                      loading={true}
                      variant="contained"
                      disabled
                    >
                      <span>disabled</span>
                    </LoadingButton>
                  )}
                </>
              ) : (
                <>
                  {!deleteProfilePhotoLoad ? (
                    <>
                      <Button
                        style={{ marginRight: "auto" }}
                        onClick={() => deleteProfilePhoto()}
                        variant="outlined"
                      >
                        <i className="fa-solid fa-trash"></i> &nbsp; Delete
                      </Button>
                      <Button
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onClick={() => dispatch(setDialogEdit(true))}
                        variant="outlined"
                      >
                        <i
                          style={{ fontSize: "larger" }}
                          className="fa-regular fa-pen-to-square"
                        ></i>
                        &nbsp; Edit
                      </Button>
                    </>
                  ) : (
                    <LoadingButton
                      size="small"
                      loading={true}
                      variant="contained"
                      disabled
                    >
                      <span>disabled</span>
                    </LoadingButton>
                  )}
                </>
              )}
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default PhotoDialog;

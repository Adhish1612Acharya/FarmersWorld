import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
// import Button from "@mui/joy/Button";
import React, { ChangeEvent, FC } from "react";
import Textarea from "@mui/joy/Textarea";
import { Form } from "react-router-dom";
import { applicationRejectDialogObj } from "../types/componentsTypes/ApplicationRejectDialog";
import CloseIcon from "@mui/icons-material/Close";
import {
  setError,
  setRejectDialogOpen,
} from "../store/features/admin/ApplicationDetailSlice";
import { LoadingButton } from "@mui/lab";

const ApplicationRejectDialog: FC<applicationRejectDialogObj> = ({
  open,
  value,
  setTextField,
  handleSubmit,
  error,
  dispatch,
  rejectReasonLoad,
}) => {
  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle>Reason for Rejection</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            dispatch(setError(false));
            dispatch(setRejectDialogOpen(false));
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

        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(event)
          }
          encType="multipart/form-data"
        >
          <DialogContent>
            <TextField
              placeholder="Type the reason here"
              value={value}
              error={error}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setTextField(event);
              }}
              multiline
              fullWidth
              name="rejectReason"
            />
          </DialogContent>
          <DialogActions>
            {rejectReasonLoad ? (
              <LoadingButton
                size="small"
                loading={true}
                variant="contained"
                disabled
              >
                <span>disabled</span>
              </LoadingButton>
            ) : (
              <Button type="submit">Reject Application</Button>
            )}
          </DialogActions>
        </Form>
      </Dialog>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={error}
          autoHideDuration={2000}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            Please fill the reason for application rejection
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ApplicationRejectDialog;

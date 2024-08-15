import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { showRejectReasonDialog } from "../types/componentsTypes/ShowRejectReasonDialog";
import { showFarmerRejectReasonDialog } from "../store/features/farmer/ApplicationDetailSlice";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShowRejectReasonDialog: React.FC<showRejectReasonDialog> = ({
  open,
  dispatch,
  rejectReason,
}) => {
  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Reason for Application getting rejected
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => dispatch(showFarmerRejectReasonDialog(false))}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{rejectReason}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default ShowRejectReasonDialog;

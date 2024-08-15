import { Button } from "@mui/material";
import { FC } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { hiddenFileInputObj } from "../types/componentsTypes/HiddenFileInput";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const HiddenFileInput: FC<hiddenFileInputObj> = ({
  setHiddenInput,
  saveProfilePhotoLoad,
}) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      disabled={saveProfilePhotoLoad ? true : false}
      style={{ marginRight: "auto" }}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setHiddenInput(event);
        }}
      />
    </Button>
  );
};

export default HiddenFileInput;

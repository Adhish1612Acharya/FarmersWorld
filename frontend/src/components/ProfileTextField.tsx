import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC } from "react";
import { profileProps } from "../types/routesTypes/user/Profile";
import "../styles/ProfileDetail.css";

const ProfileTextField: FC<profileProps> = ({
  type,
  label,
  helperText,
  error,
  value,
  handleChange,
  name,
  readOnlyStatus,
}) => {
  return (
    <>
      <TextField
        id="input-with-sx"
        type={type}
        label={label}
        variant={type !== "file" ? "filled" : "standard"}
        fullWidth
        style={{ marginTop: "2rem" }}
        helperText={helperText ? helperText : error?.errMsg}
        error={error ? !error?.valid : false}
        onChange={
          handleChange !== undefined
            ? (event: ChangeEvent<HTMLInputElement>) => handleChange(event)
            : undefined
        }
        value={value || ""}
        name={name}
        InputProps={{
          readOnly: readOnlyStatus,
        }}
        className="profileTextField"
      />
    </>
  );
};

export default ProfileTextField;

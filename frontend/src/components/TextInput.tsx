import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, KeyboardEvent } from "react";
import { textInputStatProps } from "../types/componentsTypes/TextInput";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import "../styles/Form.css";

const TextInput: FC<textInputStatProps> = ({
  labelText,
  typeValue,
  name,
  value,
  outerLabel,
  setForm,
  errors,
  disabled,
  readOnlyStatus,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="textField">
        <label
          htmlFor={name}
          style={{ margin: "1rem", fontWeight: "bolder", color: "black" }}
        >
          {outerLabel}
        </label>
        <TextField
          id="outlined-size-small"
          size="small"
          label={labelText}
          type={typeValue}
          name={name}
          value={value}
          onChange={setForm}
          error={!errors?.valid}
          helperText={errors?.errMsg}
          onKeyDown={handleKeyDown}
          style={{ maxWidth: "100%" }}
          disabled={disabled}
          InputProps={{
            readOnly: readOnlyStatus,
          }}
          variant={typeValue !== "file" ? "filled" : "standard"}
        />
      </div>
    </ThemeProvider>
  );
};

export default TextInput;

import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, KeyboardEvent } from "react";
import { textInputStatProps } from "../types/componentsTypes/TextInput";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

const TextInput: FC<textInputStatProps> = ({
  labelText,
  typeValue,
  name,
  value,
  outerLabel,
  setForm,
  errors,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="textField" style={{ margin: "2rem" }}>
        <label htmlFor={name} style={{ marginRight: "1rem" }}>
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
        />
      </div>
    </ThemeProvider>
  );
};

export default TextInput;

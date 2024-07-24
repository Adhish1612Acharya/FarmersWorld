import { Paper, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { appliStatusProps } from "../types/componentsTypes/ApplStatusBtn";
import theme from "../theme";

const ApplStatusBtn: FC<appliStatusProps> = ({ color, status, ht }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={8}
        style={{
          height: !ht ? "2rem" : ht,
          width: "max-content",
          padding: "0.5rem",
          backgroundColor: color,
          marginLeft: "2rem",
        }}
      >
        <b style={{ whiteSpace: "nowrap", display: "inline-block" }}>
          {status}
        </b>
      </Paper>
    </ThemeProvider>
  );
};

export default ApplStatusBtn;

import { Paper, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { appliStatusProps } from "../types/componentsTypes/ApplStatusBtn";
import theme from "../theme";

const ApplStatusBtn: FC<appliStatusProps> = ({ color, status, ht, admin }) => {
  return (
    <ThemeProvider theme={theme}>
      {!admin ? (
        <h3 style={{ display: "inline-block" }}>Application Status :&nbsp;</h3>
      ) : null}

      <Paper
        elevation={8}
        style={{
          height: !ht ? "2rem" : ht,
          width: "max-content",
          padding: "0.5rem",
          backgroundColor: color,
          marginLeft: "auto",
          marginRight: "auto",
          display: "inline-block",
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

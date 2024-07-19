import Paper from "@mui/material/Paper";
import { Box, ThemeProvider } from "@mui/material";
import { FC } from "react";
import "../styles/Paper.css";
import { applicationProps } from "../types/componentsTypes/CheckAppl";
import theme from "../theme";

const CheckAppl: FC<applicationProps> = ({ application }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={8}
        style={{
          width: "50rem",
          height: "max-content",
          display: "flex",
          justifyContent: "space-evenly",
          padding: "2rem",
          borderRadius: "20px",
          marginTop: "2rem",
        }}
        className="paper"
      >
        {!application ? (
          <h1>No Applications</h1>
        ) : (
          <>
            <Box sx={{ margin: "15px", textAlign: "center" }}>
              <h3>Application Id : {application?._id}</h3>
            </Box>
            <Box sx={{ width: "20rem" }}>
              <img
                style={{ borderRadius: "20px", width: "50%", height: "8rem" }}
                src={application?.image}
                alt="img"
              />
            </Box>
          </>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default CheckAppl;

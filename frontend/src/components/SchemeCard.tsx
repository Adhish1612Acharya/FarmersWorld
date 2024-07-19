import Paper from "@mui/material/Paper";
import { Box, ThemeProvider } from "@mui/material";
import ApplStatusBtn from "./ApplStatusBtn";
import "../styles/Paper.css";
import { FC } from "react";
import { schemeCardProps } from "../types/componentsTypes/SchemeCard";
import theme from "../theme";

const SchemeCard: FC<schemeCardProps> = ({
  scheme,
  home,
  isApplication,
  statBtn,
  count,
}) => {
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
          margin: "20px",
        }}
        className="paper"
      >
        {!home ? (
          <>
            {isApplication ? (
              <ApplStatusBtn status={statBtn?.status} color={statBtn?.color} />
            ) : (
              <ApplStatusBtn
                status={`${count} Applications`}
                ht="max-content"
                color={"orange"}
              />
            )}
          </>
        ) : null}

        <Box sx={{ margin: "15px", textAlign: "center" }}>
          <h1>{scheme?.heading}</h1>
          <p>{scheme?.shortDescription}</p>
        </Box>
        <Box sx={{ width: "20rem" }}>
          <img
            style={{ borderRadius: "20px", width: "100%" }}
            src={scheme?.image}
            alt="img"
          />
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default SchemeCard;

import { Avatar, Paper, ThemeProvider } from "@mui/material";
import "../styles/SchemeInfo.css";
import Button from "@mui/material/Button";
import { FC } from "react";
import { schemeInfoProps } from "../types/componentsTypes/SchemeInfo";
import theme from "../theme";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { deepOrange } from "@mui/material/colors";
import FooterDiv from "./FooterDiv";

const SchemeInfo: FC<schemeInfoProps> = ({ info, applied, navigate }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Paper className="schemeInfo" elevation={8}>
          <div className="infoHeader">
            <Link to="/" style={{ color: "black" }}>
              <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
                <KeyboardBackspaceIcon />
              </Avatar>
            </Link>

            <h2 style={{ display: "inline-block" }}>{info?.heading}</h2>
            {!applied ? (
              <Button
                variant="contained"
                color="success"
                style={{
                  marginLeft: "2rem",
                }}
                onClick={() => {
                  navigate ? navigate(`/schemes/${info?._id}/apply`) : null;
                }}
              >
                Apply
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                style={{
                  marginLeft: "2rem",
                  boxShadow: "2px 2px 5px black",
                }}
                disabled
              >
                <b style={{ color: "black" }}>Applied</b>
              </Button>
            )}
          </div>

          <div className="info">
            <img
              style={{
                width: "50%",
                margin: "1rem",
                border: "2px solid black",
                borderRadius: "1rem",
              }}
              src={info?.image}
              alt="scheme"
            />
            <p>{info?.description}</p>
          </div>
        </Paper>
      </>
    </ThemeProvider>
  );
};

export default SchemeInfo;

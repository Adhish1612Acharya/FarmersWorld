import NavBar from "./NavBar";
import { Paper, ThemeProvider } from "@mui/material";
import "../styles/SchemeInfo.css";
import Button from "@mui/material/Button";
import Application from "./Application";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { schemeInfoProps } from "../types/componentsTypes/SchemeInfo";
import theme from "../theme";

const SchemeInfo: FC<schemeInfoProps> = ({ info, applied, navigate }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Paper
          className="schemeInfo"
          style={{ marginTop: "2rem" }}
          elevation={8}
        >
          <div className="infoHeader">
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

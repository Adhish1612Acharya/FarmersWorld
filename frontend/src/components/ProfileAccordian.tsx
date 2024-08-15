import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { profileAccordianObj } from "../types/componentsTypes/ProfileAccordian";
import { deepOrange } from "@mui/material/colors";
import { Avatar, Box, Paper } from "@mui/material";

const ProfileAccordian: React.FC<profileAccordianObj> = ({
  name,
  adhaarNo,
  fuid,
  passportSizePhoto,
  contactNo,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Paper style={{ width: "100%" }} elevation={16}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{
          borderBottom: "3px solid black",
          borderTop: "3px solid black",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], marginRight: "2rem" }}
            variant="rounded"
          >
            <i className="fa-solid fa-user"></i>
          </Avatar>

          <Typography variant="h6">Name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{name}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ borderBottom: "3px solid black" }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], marginRight: "2rem" }}
            variant="rounded"
          >
            <i className="fa-solid fa-address-card"></i>
          </Avatar>
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            Adhaar No.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{adhaarNo}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        style={{ borderBottom: "3px solid black" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], marginRight: "2rem" }}
            variant="rounded"
          >
            <i className="fa-solid fa-address-card"></i>
          </Avatar>

          <Typography variant="h6">FUID</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{fuid}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        style={{ borderBottom: "3px solid black" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], marginRight: "2rem" }}
            variant="rounded"
          >
            <i className="fa-solid fa-image-portrait"></i>
          </Avatar>

          <Typography variant="h6">Passport Size Image</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <img
              src={passportSizePhoto}
              style={{ width: "250px", height: "220px", maxWidth: "100%" }}
              alt="Your passport size photot"
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        style={{ borderBottom: "3px solid black" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], marginRight: "2rem" }}
            variant="rounded"
          >
            <i className="fa-solid fa-phone"></i>
          </Avatar>

          <Typography variant="h6">Contact No</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <a>{contactNo}</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ProfileAccordian;

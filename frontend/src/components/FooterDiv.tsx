import React from "react";
import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FC } from "react";

const FooterDiv: FC = () => {
  return (
    <footer>
      <div className="footer">
        <div className="socialMedia">
          <InstagramIcon style={{ color: "black", marginRight: "1rem" }} />
          <FacebookIcon style={{ color: "black", marginRight: "1rem" }} />
          <LinkedInIcon style={{ color: "black", marginRight: "1rem" }} />
        </div>
        <div className="companyName">&copy; FarmersWorld Private Limited</div>
        <div className="privacyPolicies">
          <a>Privacy</a>
          <a>Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterDiv;

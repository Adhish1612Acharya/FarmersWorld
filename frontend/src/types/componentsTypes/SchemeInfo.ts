import { NavigateFunction } from "react-router-dom";

export interface schemeObj {
  _id: string;
  applications: string[];
  heading: string;
  image: string;
  schemeType: string;
  shortDescription: string;
  description: string;
}

export interface schemeInfoProps {
  info: schemeObj | null;
  applied: boolean;
  navigate?: NavigateFunction;
}

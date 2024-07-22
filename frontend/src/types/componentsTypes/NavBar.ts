import { NavigateFunction } from "react-router-dom";

export interface navbarProps {
  homePage?: boolean;
  login: boolean;
  admin?: boolean;
  navigate: NavigateFunction;
}

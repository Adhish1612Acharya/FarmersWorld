import { NavigateFunction } from "react-router-dom";

export interface ApplicationProps {
  schemeId: string;
  navigate: NavigateFunction;
}

export interface errorKey {
  errMsg: string;
  valid: boolean;
}

export interface newError {
  adhaar: errorKey;
  farmersId: errorKey;
}

export interface value {
  adhaar: string;
  farmersId: string;
  image: string;
}

export interface imageErrors {
  errMsg: string;
  valid: boolean;
}

export interface loginFormProps {
  route: string;
}

export interface valueObj {
  [key: string]: string;
}

export interface errorParams {
  valid: boolean;
  errMsg: string;
}

export interface errorObj {
  [key: string]: errorParams;
}

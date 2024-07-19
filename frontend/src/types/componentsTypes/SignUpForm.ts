export interface signUpFormProps {
  route: string;
}

export interface valueObj {
  username: string;
  email: string;
  password: string;
}

export interface errorParams {
  valid: boolean;
  errMsg: string;
}

export interface errorObj {
  username: errorParams;
  email: errorParams;
  password: errorParams;
}

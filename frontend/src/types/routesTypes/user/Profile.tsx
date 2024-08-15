export interface valueObj {
  [key: string]: any;
}

export interface errorParams {
  errMsg: string;
  valid: boolean;
}

export interface errorObj {
  [key: string]: {
    errMsg: string;
    valid: boolean;
  };
}

export interface profileProps {
  type: string;
  label?: string;
  helperText?: string;
  error?: errorParams;
  value?: string | number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  readOnlyStatus?: boolean;
}

export interface profileDataObj {
  profilePhoto: string;
  userAccountName: string;
  name: string;
  adhaarNo: number | "";
  fuid: number | "";
  passportSizePhoto: string;
  phoneContact: number | "";
}

export interface profileFormDataProps {
  profileData: valueObj;
  error: errorObj;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLoad: boolean;
  passportPhotoPreview: string;
  email: string;
}

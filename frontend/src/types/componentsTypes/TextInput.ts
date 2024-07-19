export type setFormType = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface errors {
  errMsg: string;
  valid: boolean;
}

export interface textInputStatProps {
  labelText?: string;
  typeValue?: string;
  name?: string;
  value?: string | File | number;
  outerLabel?: string;
  setForm?: setFormType | undefined;
  errors?: errors;
}

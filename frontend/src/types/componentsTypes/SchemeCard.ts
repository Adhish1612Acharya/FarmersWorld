export interface applicationObj {
  _id: string;
  adhaar: string;
  applicant: string;
  approved: boolean;
  processing: boolean;
  farmersId: string;
  image: string;
  schemeName: string | schemeObj;
}

export interface schemeObj {
  _id: string;
  applications: applicationObj[] | string[];
  heading: string;
  image: string;
  schemeType: string;
  shortDescription: string;
  description: string;
}

export interface statBtnObj {
  status: string;
  color: string;
}

export interface schemeCardProps {
  scheme: schemeObj;
  home: boolean;
  isApplication: boolean;
  statBtn?: statBtnObj;
  count?: number | 0;
}

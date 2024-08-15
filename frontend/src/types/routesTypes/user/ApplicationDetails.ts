export interface schemeObj {
  _id: string;
  applications: applicationObj[];
  heading: string;
  image: string;
  schemeType: string;
  shortDescription: string;
  description: string;
}

export interface applicationObj {
  _id: string;
  adhaar: string;
  farmersId: string;
  image: string;
  applicant: string;
  schemeName: string;
  approved: boolean;
  processing: boolean;
  name: string;
  contactNo: string;
  rejectReason: string;
}

export type checkLoginType = () => Promise<void>;

export interface statusObj {
  status: string;
  color: string;
}

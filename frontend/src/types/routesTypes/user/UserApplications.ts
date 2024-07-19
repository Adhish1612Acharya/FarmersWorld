export interface schemeObj {
  _id: string;
  applications: string[];
  heading: string;
  image: string;
  schemeType: string;
  shortDescription: string;
  description: string;
}

export interface applicationObj {
  _id: string;
  adhaar: string;
  applicant: string;
  approved: boolean;
  processing: boolean;
  farmersId: string;
  image: string;
  schemeName: schemeObj;
}

export type getFilterApplicationsType = (status: string) => Promise<void>;

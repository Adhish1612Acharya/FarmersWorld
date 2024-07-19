export interface applicationObj {
  _id: string;
  adhaar: string;
  applicant: string;
  approved: boolean;
  processing: boolean;
  farmersId: string;
  image: string;
  schemeName: string;
}

export interface schemeObj {
  _id: string;
  applications: applicationObj[];
  heading: string;
  image: string;
  schemeType: string;
  shortDescription: string;
  description: string;
}

export type handleFilterClickType = (filter: string) => Promise<void>;

export type getDataType = () => Promise<void>;

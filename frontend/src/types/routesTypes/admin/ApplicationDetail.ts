export interface loaderReturnObj {
  applicationId: string;
  schemeId: string;
}

export interface applicationObj {
  _id: string;
  adhaar: string;
  applicant: {
    adhaar: {
      name: string;
    };
    contactNo: string;
  };
  approved: boolean;
  processing: boolean;
  farmersId: string;
  image: string;
  schemeName: schemeObj;
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

export type checkLoginType = () => Promise<void>;

export type updateApplicationType = (status: string) => Promise<void>;

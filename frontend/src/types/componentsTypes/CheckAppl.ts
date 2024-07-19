export interface applicationObj {
  _id: string;
  adhaar: string;
  farmersId: string;
  image: string;
  applicant: string;
  schemeName: string;
  approved: boolean;
  processing: boolean;
}

export interface applicationProps {
  application?: applicationObj;
}

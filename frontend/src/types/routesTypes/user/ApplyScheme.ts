export interface schemeObj {
  _id: string;
  applications: string[];
  heading: string;
  image: string;
  schemeType: string;
  shortDescription: string;
  description: string;
}

export type checkLoginType = () => Promise<void>;

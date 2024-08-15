export type createDataObj = (
  details: string,
  givenDetails: string
) => { details: string; givenDetails: string };

export interface detailsTablePops {
  applicationId: string;
  schemeName: string;
  adhaarNumber: string;
  farmersUniqueNumber: string;
  imageLink: string;
  admin: string;
  name: string;
  contactNo: string;
}

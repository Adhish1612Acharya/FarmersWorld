import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC } from "react";
import {
  createDataObj,
  detailsTablePops,
} from "../types/componentsTypes/Details";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

const DetailsTable: FC<detailsTablePops> = ({
  applicationId,
  schemeName,
  adhaarNumber,
  farmersUniqueNumber,
  imageLink,
  admin,
}) => {
  const createData: createDataObj = (details: string, givenDetails: string) => {
    return { details, givenDetails };
  };

  const rows = [
    createData("Application Id :", applicationId),
    createData("Scheme applied :", schemeName),
    createData("Adhaar Number :", adhaarNumber),
    createData("Farmers Unique Number :", farmersUniqueNumber),
    createData("Passport size Image : ", imageLink),
  ];

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} elevation={8}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          {!admin ? (
            <caption>
              For Queries Contact :{" "}
              <a style={{ textDecoration: "none" }}>8354637289</a>
            </caption>
          ) : null}
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Information Type</b>
              </TableCell>
              <TableCell align="right">
                <b>Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.details}>
                <TableCell component="th" scope="row">
                  {row.details}
                </TableCell>
                <TableCell align="right">
                  {row.givenDetails === imageLink ? (
                    <img
                      src={row.givenDetails}
                      alt="passport image"
                      style={{ height: "6rem" }}
                    />
                  ) : (
                    row.givenDetails
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default DetailsTable;

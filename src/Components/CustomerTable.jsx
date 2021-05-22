import React from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow,
} from "@material-ui/core";

function CustomerTable({ rows, columns, tableType, sortingOn }) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => {
                <TableCell
                  key={col.id}
                  align={col.align}
                  style={{ minWidth: col.minWidth }}
                >
                  {col.id === "bidValue" || col.id === "amount" ? (
                    <>
                      <TableSortLabel>{col.label}</TableSortLabel>
                    </>
                  ) : (
                    <>{col.label}</>
                  )}
                </TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableType === "Merchant List" &&
              rows.map((row) => {
                return (
                  <TableRow key={row.id} hover>
                    <TableCell component="th" scope="row">
                      <Avatar alt={row.name} src={row.avatarUrl} />
                      <div>&nbsp;&nbsp;{row.name}</div>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.bidValue}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomerTable;

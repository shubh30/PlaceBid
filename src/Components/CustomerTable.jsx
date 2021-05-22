import React, { useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    maxHeight: 440,
  },
  containerClass: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  hoverClass: {
    cursor: "pointer",
  },
});

function CustomerTable({ rows, columns, tableType, sortingOn }) {
  const [pagination, setPagination] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const styleClass = useStyle();

  const handleChangePage = (event, newPage) => {
    setPagination(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPagination(0);
  };

  return (
    <>
      <TableContainer className={styleClass.container}>
        <Table stickyHeader aria-label="sticky table">
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
                      <TableSortLabel active>{col.label}</TableSortLabel>
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
              rows
                .slice(pagination * pageSize, pagination * pageSize + pageSize)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      className={styleClass.hoverClass}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={styleClass.containerClass}
                      >
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pagination}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CustomerTable;

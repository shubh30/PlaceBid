import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Paper,
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
  root: {
    width: "100%",
  },
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
  const [sortOrder, setSortOrder] = useState("asc");

  const styleClass = useStyle();

  let history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPagination(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPagination(0);
  };

  const sortData = (sortBy, sortOrder) => {
    let itemsArrayToSort = rows;
    let sortedItemsArray = [];
    let compareFunction = null;
    switch (sortBy) {
      case "bidValue":
        compareFunction = (i, j) => {
          if (i.bidValue < j.bidValue) {
            return sortOrder === "asc" ? -1 : 1;
          } else {
            if (i.bidValue > j.bidValue) {
              return sortOrder === "asc" ? 1 : -1;
            } else {
              return 0;
            }
          }
        };
        break;

      case "amount":
        compareFunction = (i, j) => {
          if (i.amount < j.amount) {
            return sortOrder === "asc" ? -1 : 1;
          } else {
            if (i.amount > j.amount) {
              return sortOrder === "asc" ? 1 : -1;
            } else {
              return 0;
            }
          }
        };
        break;

      default:
        break;
    }
    sortedItemsArray = itemsArrayToSort.sort(compareFunction);
    return sortedItemsArray;
  };

  const handleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const getUserDetails = (id) => {
    history.push(`/${id}`);
  };

  return (
    <Paper className={styleClass.root}>
      {sortData(sortingOn, sortOrder) && (
        <>
          <TableContainer className={styleClass.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((col) => {
                    <TableCell
                      key={col.id}
                      align="right"
                      style={{ minWidth: col.minWidth }}
                    >
                      {true ? (
                        <>
                          <TableSortLabel
                            active
                            direction={sortOrder}
                            onClick={() => handleSort()}
                          >
                            {col.label}
                          </TableSortLabel>
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
                    .slice(
                      pagination * pageSize,
                      pagination * pageSize + pageSize
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          hover
                          className={styleClass.hoverClass}
                          onClick={() => getUserDetails(row.id)}
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
      )}
    </Paper>
  );
}

export default CustomerTable;

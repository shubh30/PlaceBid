import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerTable from "../Components/CustomerTable";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

function CustomerDetails() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  let { id } = useParams();

  const formatDate = (value) => {
    const dateObject = new Date(parseInt(value));

    const date = dateObject.getDay().toString();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours() + 1;
    const minutes = dateObject.getMinutes() + 1;
    const seconds = dateObject.getSeconds() + 1;

    return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    fetch(`https://intense-tor-76305.herokuapp.com/merchants/${id}`)
      .then((response) => response.json())
      .then((result) => {
        if (Object.keys(result).length > 0) {
          const customerDetails = result.bids.map((value) => {
            return {
              id: value.id,
              carTitle: value.carTitle,
              amount: value.amount,
              created: formatDate(value.created),
            };
          });
          setUserDetails({
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
            avatarUrl: result.avatarUrl,
            email: result.email,
            phone: result.phone,
          });
          setRows(customerDetails);
          setColumns([
            { id: "carTitle", label: "Car Brand" },
            { id: "amount", label: "Amount" },
            { id: "created", label: "Created On" },
          ]);
        }
      });
  }, [id]);

  return (
    <>
      <div>
        <Grid container spacing={3}>
          {userDetails && (
            <>
              <Grid item xs={12} sm={4}>
                <Paper>
                  <Card variant="outlined">
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={`${userDetails.firstname} ${userDetails.lastname}`}
                          src={userDetails.avatarUrl}
                        />
                      }
                      title={`${userDetails.firstname} ${userDetails.lastname}`}
                      subHeader={`${userDetails.email}`}
                    />
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Phone: <span>{userDetails.phone}</span>
                      </Typography>
                      <br />
                      <Typography color="textSecondary" gutterBottom>
                        Total Bids: <span>{rows.length}</span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={8}>
                {rows.length > 0 && (
                  <Paper>
                    <CustomerTable
                      rows={rows}
                      columns={columns}
                      sortingOn="amount"
                      tableType="Merchant Details List"
                    />
                  </Paper>
                )}
                {rows.length === 0 && (
                  <h2>Customer didn't place any Bid yet.</h2>
                )}
              </Grid>
            </>
          )}
          {!userDetails && (
            <Grid item xs={12} sm={12}>
              No Data
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}

export default CustomerDetails;

import React, { useEffect, useState } from "react";
import { Grid, Switch, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomerTable from "../Components/CustomerTable";

const useStyle = makeStyles({
  gridClass: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
});

const HomeView = () => {
  const [merchantData, setMerchantData] = useState([]);
  const [isShowMaxFirst, setIsShowMaxFirst] = useState(true);
  const [tableData, setTableData] = useState([]);

  const styleClass = useStyle();

  const getMaximumBidFirst = (data) => {
    if (data.length > 0) {
      return data.reduce(
        (max, value) => (value.amount > max ? value.amount : max),
        data[0].amount
      );
    } else {
      return null;
    }
  };

  const getMinimumBidFirst = (data) => {
    if (data.length > 0) {
      return data.reduce(
        (min, value) => (value.amount < min ? value.amount : min),
        data[0].amount
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants")
      .then((response) => response.json())
      .then((result) => {
        const merchData = result.map((data) => {
          return {
            id: data.id,
            avatarUrl: data.avatarUrl,
            bidValue: isShowMaxFirst
              ? getMaximumBidFirst(data.bids)
              : getMinimumBidFirst(data.bids),
            email: data.email,
            name: `${data.firstname} ${data.lastname}`,
            phone: data.phone,
          };
        });

        setMerchantData([...merchData]);

        if (isShowMaxFirst) {
          setTableData([
            { id: "customer_name", label: "Customer Name", minWidth: 200 },
            { id: "email", label: "Email" },
            { id: "phone", label: "Phone" },
            { id: "bidValue", label: "Max Bid" },
          ]);
        } else {
          setTableData([
            { id: "customer_name", label: "Customer Name", minWidth: 200 },
            { id: "email", label: "Email" },
            { id: "phone", label: "Phone" },
            { id: "bidValue", label: "Min Bid" },
          ]);
        }
      });
  }, [isShowMaxFirst]);

  return (
    <>
      <Grid
        component="label"
        container
        alignItems="center"
        spacing={1}
        className={styleClass.gridClass}
      >
        <Grid item>
          <Typography>Minimum Bid</Typography>
        </Grid>
        <Grid item>
          <Switch
            color="primary"
            checked={isShowMaxFirst}
            onChange={() => setIsShowMaxFirst(!isShowMaxFirst)}
            name="toggle"
          />
        </Grid>
        <Grid item>
          <Typography>Maximum Bid</Typography>
        </Grid>
        <CustomerTable
          rows={merchantData}
          columns={tableData}
          sortingOn="bidValue"
          tableType="Merchant List"
        />
      </Grid>
    </>
  );
};

export default HomeView;

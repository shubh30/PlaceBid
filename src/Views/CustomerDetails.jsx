import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function CustomerDetails() {
  let { id } = useParams();

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
              created: value.created,
            };
          });
          console.log(customerDetails);
        }
      });
  }, []);

  return (
    <div>
      <h1>Detail View</h1>
    </div>
  );
}

export default CustomerDetails;

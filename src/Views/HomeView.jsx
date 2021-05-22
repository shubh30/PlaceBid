import React, { useEffect, useState } from "react";

const HomeView = () => {
  const [merchantData, setMerchantData] = useState([]);
  const [isShowMaxFirst, setIsShowMaxFirst] = useState(false);

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
      });
  }, [isShowMaxFirst]);

  return (
    <div>
      {merchantData?.map((data) => {
        return (
          <div>
            <p>{data.name}</p>
            <p>{data.bidValue}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomeView;

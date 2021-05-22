import React, { useEffect, useState } from "react";

const HomeView = () => {
  const [merchantData, setMerchantData] = useState([]);

  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants")
      .then((response) => response.json())
      .then((result) => {
        const merchData = result.map((data) => {
          return {
            id: data.id,
            avatarUrl: data.avatarUrl,
            email: data.email,
            name: `${data.firstname} ${data.lastname}`,
            phone: data.phone,
          };
        });

        setMerchantData([...merchData]);
      });
  }, []);

  return (
    <div>
      {merchantData?.map((data) => {
        return <h1>{data.name}</h1>;
      })}
    </div>
  );
};

export default HomeView;

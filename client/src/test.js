import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array

  useEffect(() => {
    const fetchData = () => {
      fetch("https://dummyjson.com/products?limit=100")
        .then((res) => res.json())
        .then((data) => {
          const filters = Array.from(
            new Set(data.products.map((product) => product.brand))
          );
          setData(filters);
        })

        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  // Create filters based on the data
  const brand = data.map((name) => {
    return {
      value: name,
      label: name,
      checked: false,
    };
  });

  console.log(brand);
  return <div></div>;
};

export default Test;

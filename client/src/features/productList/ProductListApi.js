// Api Function to fetch All the Products
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`http://localhost:8080/products`);
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

// api call for fetching products by filtering
export const fetchProductsByfilter = async (filteredObject) => {
  console.log(`inside the filterd API`);
  // loop through the object and construct query string
  let queryString = "";
  for (let key in filteredObject) {
    queryString += `${key}=${filteredObject[key]}`;
  }

  try {
    const res = await fetch(`http://localhost:8080/products?${queryString}`);
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsBySorting = async (sortedObj) => {
  const { sort, order } = sortedObj;
  let queryString = `_sort=${sort}&_order=${order}`;
  try {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const resJson = response.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

// api call for fetching products by filtering
export const fetchProductsByFilter = async (
  filteredObject,
  sortObject,
  pagination
) => {
  // Initialize the query string
  console.log("inside Api Call Function");
  let queryString = "";

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // Loop through the sortObject to add sorting parameters to the query string
  if (Object.keys(sortObject).length > 0) {
    for (let key in sortObject) {
      queryString += `${key}=${sortObject[key]}&`;
    }
  }

  // Check if there are any filteredObject parameters to include
  if (Object.keys(filteredObject).length > 0) {
    // Loop through the filteredObject
    for (let key in filteredObject) {
      // Check if the filteredObject[key] array is not empty
      if (filteredObject[key].length > 0) {
        // Get the last value from the array
        let catValuesArr = filteredObject[key];
        let value = catValuesArr[catValuesArr.length - 1];

        // Append the parameter to the query string
        queryString += `${key}=${value}&`;
      }
    }
  }

  console.log(`query string is ${queryString}`);

  try {
    // Make an API request using the constructed query string
    const res = await fetch(`http://localhost:8080/products?${queryString}`);
    const resJson = await res.json();
    const totalPages = await res.headers.get("X-Total-Count");
    return { resJson, totalPages };
  } catch (error) {
    // Handle and log any errors that occur during the request
    console.error(error);
  }
};

// function for fetching Categories
export const fetchCategoriesApi = async () => {
  try {
    const fetchCategories = await fetch(`http://localhost:8080/categories`);
    const responseJson = await fetchCategories.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
};

// function for fetching Barnds
export const fetchBrandsApi = async () => {
  try {
    const fetchCategories = await fetch(`http://localhost:8080/brands`);
    const responseJson = await fetchCategories.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
};

// function to get single product by id
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8080/products/${productId}`);

    if (!response.ok) {
      // If the response status is not OK (e.g., 404 Not Found), throw an error
      throw new Error(`Failed to fetch product with ID ${productId}`);
    }

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    // You might want to rethrow the error here or handle it in some other way
    throw error;
  }
};

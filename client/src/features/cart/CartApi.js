// function to add to cart
export const addTocartApi = async (item) => {
  try {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok)
      throw new Error(" some thing went http error", response.status);
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsByUserIdApi = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/cart?userId=${userId}`);
    if (!response.ok) throw new Error("error while fetching Products ByuserId");
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    throw error;
  }
};

// function to update products
export const updateCartApi = async (updatedItem) => {
  console.log(updatedItem);
  try {
    const response = await fetch(
      `http://localhost:8080/cart/${updatedItem.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      }
    );
    if (!response.ok)
      throw new Error(" some thing went http error", response.status);
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    throw error;
  }
};

// function to delete item from cart
export const deleteItemFromCartApi = async (itemId) => {
  try {
    const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(" some thing went http error", response.status);
    return itemId;
  } catch (error) {
    throw error;
  }
};

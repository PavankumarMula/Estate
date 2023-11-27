// api function create a user
const url = "http://localhost:8080/users";

export const createUserApi = async (userData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Convert the data to a JSON string
    });
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    throw error;
  }
};

export const checkUserApi = async (data) => {
  const { email, password } = data;
  try {
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const resJson = await response.json();
    if (resJson.length > 0) {
      if (resJson[0].email === email && resJson[0].password === password) {
        return resJson[0];
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

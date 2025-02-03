// CREATE
export const createUser = async (name, mail, password) => {
  console.log("⚠️createUser");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mail, password }),
    });

    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};

// READ ONE BY EMAIL
export const getUserFromEmail = async (email) => {
  console.log("⚠️getUserFromEmail");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/users?mail=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// CREATE
export const createTask = async ( title, content, task_status, user_id) => {
  console.log("⚠️createTask");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl + "/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, task_status, user_id }),
    });

    return response;
  } catch (error) {
    console.error(error);
    return response
  }

}

// READ ALL
export const getAllTasks = async () => {
  console.log("⚠️getAllTasks");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl + "/api/tasks", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { tasks: data };
  } catch (error) {
    console.error(error);
    return { tasks: [] };
  }
};

// DELETE
export const removeTask = async (id) => {
  console.log("⚠️removeTask");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/tasks?id=${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
}
// UPDATE
export const updateTask = async (id, task) => {
  console.log("⚠️updateTask");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// READ ONE
export const getTaskFromId = async (id) => {
  console.log("⚠️getTaskFromId");
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
      cache: "no-store",
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

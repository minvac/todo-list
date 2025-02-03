// CREATE
export const createSubTask = async (title, subtask_status, task_id) => {
  console.log("⚠️createSubTask");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl + "/api/subtasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, subtask_status, task_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to create subtask");
    }

    return response;
  } catch (error) {
    console.error("Error in createSubTask:", error);
    return { error: error.message };
  }
};

// READ ALL BY TASK_ID
export const getAllSubTasks = async (taskId) => {
  console.log("⚠️getAllSubTasks");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/subtasks?taskId=${taskId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { subtasks: data };
  } catch (error) {
    console.error(error);
    return { subtasks: [] };
  }
};

// DELETE
export const removeSubTask = async (id) => {
  console.log("⚠️removeSubTask");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/subtasks?id=${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};

// UPDATE
export const updateSubTask = async (id, subtask) => {
  console.log("⚠️updateSubTask");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/subtasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subtask),
    });

    if (!response.ok) {
      throw new Error("Failed to update subtask");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const areAllSubTasksCompleted = async (taskId) => {
  const { subtasks } = await getAllSubTasks(taskId);
  return subtasks.every((subtask) => subtask.subtask_status === true);
};

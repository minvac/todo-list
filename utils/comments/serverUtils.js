// CREATE
export const createComment = async (content, comment_status, task_id) => {
  console.log("⚠️createComment");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl + "/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, comment_status, task_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }

    return response;
  } catch (error) {
    console.error("Error in createComment:", error);
    return { error: error.message };
  }
};

// READ ALL BY TASK_ID
export const getAllComments = async (taskId) => {
  console.log("⚠️getAllComments");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/comments?taskId=${taskId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { comments: data };
  } catch (error) {
    console.error(error);
    return { comments: [] };
  }
};

// DELETE
export const removeComment = async (id) => {
  console.log("⚠️removeComment");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/comments?id=${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.error(error);
    return response;
  }
};

// UPDATE
export const updateComment = async (id, comment) => {
  console.log("⚠️updateComment");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      throw new Error("Failed to update comment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

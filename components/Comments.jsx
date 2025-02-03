import React, { useState, useEffect } from "react";
import { Trash2, Edit3, Save } from "lucide-react";
import {
  createComment,
  getAllComments,
  removeComment,
  updateComment,
} from "../utils/comments/serverUtils";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const { comments } = await getAllComments(id);
    setComments(comments);
  };

  const addComment = async () => {
    const response = await createComment(newComment, false, id);
    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setNewComment("");
    } else {
      console.error("Failed to create comment:", response.error);
    }
  };

  const deleteComment = async (index) => {
    const response = await removeComment(comments[index]._id);
    if (response.ok) {
      const updatedComments = comments.filter((_, i) => i !== index);
      setComments(updatedComments);
    }
  };

  const saveEditing = async (index) => {
    const updatedComment = { ...comments[index], content: editingText };
    const response = await updateComment(comments[index]._id, updatedComment);
    if (!response.error) {
      const updatedComments = comments.map((comment, i) =>
        i === index ? updatedComment : comment
      );
      setComments(updatedComments);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  return (
    <div className="my-4 p-4">
      <input
        type="text"
        className="border border-gray-500 px-8 py-2 w-full"
        placeholder="Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="my-4 font-bold text-white bg-green-600 py-3 px-6 w-fit"
        onClick={addComment}
      >
        Add Comment
      </button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEditing(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEditing(index);
                }}
              />
            ) : (
              <label>{comment.content}</label>
            )}
            <button onClick={() => deleteComment(index)}>
              <Trash2 size={16} />
            </button>
            <button
              onClick={() =>
                editingIndex === index
                  ? saveEditing(index)
                  : setEditingIndex(index) && setEditingText(comment.content)
              }
            >
              {editingIndex === index ? (
                <Save size={16} />
              ) : (
                <Edit3 size={16} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;

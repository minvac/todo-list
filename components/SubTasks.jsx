import { Trash2, Edit3, Save } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  createSubTask,
  getAllSubTasks,
  removeSubTask,
  updateSubTask,
} from "../utils/subtasks/serverUtils";

const SubTasks = ({ id }) => {
  const [subTasks, setSubTasks] = useState([]);
  const [newSubTask, setNewSubTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchSubTasks();
  }, [id]);

  const fetchSubTasks = async () => {
    const { subtasks } = await getAllSubTasks(id);
    setSubTasks(subtasks);
  };

  const addSubTask = async () => {
    const response = await createSubTask(newSubTask, false, id);
    if (response.ok) {
      const newTask = await response.json();
      setSubTasks([...subTasks, newTask]);
      setNewSubTask("");
    } else {
      console.error("Failed to create subtask:", response.error);
    }
  };

  const toggleSubTaskStatus = async (index) => {
    const updatedTask = {
      ...subTasks[index],
      subtask_status: !subTasks[index].subtask_status,
    };
    const response = await updateSubTask(subTasks[index]._id, updatedTask);
    if (!response.error) {
      const updatedSubTasks = subTasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setSubTasks(updatedSubTasks);
    }
  };

  const deleteSubTask = async (index) => {
    const response = await removeSubTask(subTasks[index]._id);
    if (response.ok) {
      const updatedSubTasks = subTasks.filter((_, i) => i !== index);
      setSubTasks(updatedSubTasks);
    }
  };

  const saveEditing = async (index) => {
    const updatedTask = { ...subTasks[index], title: editingText };
    const response = await updateSubTask(subTasks[index]._id, updatedTask);
    if (!response.error) {
      const updatedSubTasks = subTasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setSubTasks(updatedSubTasks);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  return (
    <div className="my-4 border-b border-gray-300 p-4">
      <input
        type="text"
        className="border border-gray-500 px-8 py-2 w-full"
        placeholder="Sub Task"
        value={newSubTask}
        onChange={(e) => setNewSubTask(e.target.value)}
      />
      <button
        className="my-4 font-bold text-white bg-green-600 py-3 px-6 w-fit"
        onClick={addSubTask}
      >
        Add SubTask
      </button>
      <ul>
        {subTasks.map((task, index) => (
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
              <label>
                <input
                  type="checkbox"
                  checked={task.subtask_status}
                  onChange={() => toggleSubTaskStatus(index)}
                />
                {task.subtask_status ? "Completed" : "Pending"} - {task.title}
              </label>
            )}
            <button onClick={() => deleteSubTask(index)}>
              <Trash2 size={16} />
            </button>
            <button
              onClick={() =>
                editingIndex === index
                  ? saveEditing(index)
                  : setEditingIndex(index) && setEditingText(task.title)
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

export default SubTasks;

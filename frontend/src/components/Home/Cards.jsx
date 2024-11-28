import React from 'react';
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, setUpdateData }) => {
  const headers = { id: localStorage.getItem('id') };

  // Update Task Completion Status
  const handleTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {}, // Empty body
        { headers }
      );
      alert(response.data.message || "Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  // Update Task Priority
  const handlePriority = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-priority-task/${id}`,
        {}, // Empty body
        { headers }
      );
      alert(response.data.message || "Priority updated successfully.");
    } catch (error) {
      console.error("Error updating priority:", error.message);
    }
  };

  // Handle Update Task Button
  const handleUpdate = (id, title, desc) => {
    if (!id || !title || !desc) {
      console.error("Invalid update data:", { id, title, desc });
      alert("Cannot update task. Missing data.");
      return;
    }
    setInputDiv("fixed");
    setUpdateData({ id:id, title:title, desc:desc });
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,
        { headers }
      );
      alert(response.data.message || "Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data && data.map((item, i) => (
        <div
          key={item._id || i}
          className="flex flex-col justify-between bg-gray-800 rounded-md p-4"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-300 my-2">{item.desc}</p>
          </div>
          <div className="mt-4 w-full flex items-center">
            <button
              className={`${item.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/6 hover:scale-90 hover:cursor-pointer transition-all duration-200`}
              onClick={() => handleTask(item._id)}
            >
              {item.complete === true ? "Completed" : "Pending"}
            </button>
            <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
              <button onClick={() => handlePriority(item._id)}>
                {item.priority === false ? <CiHeart /> : <FaHeart className="text-red-600" />}
              </button>
              {home !== false && (
                <button onClick={() => handleUpdate(item._id, item.title, item.desc)}>
                <MdEditDocument />
              </button>
              )}
              <button onClick={() => deleteTask(item._id)}>
                <RiDeleteBin6Fill />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 rounded-md p-4 text-gray-400 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoMdAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards
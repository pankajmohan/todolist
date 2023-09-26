"use client";
import React, { useState, useEffect } from "react";
import "./App.css"; // Import your custom CSS file

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Retrieve task data from local storage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Save task data to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">My To-Do List</h1>
      <form onSubmit={addTask} className="mb-5">
        <input
          type="text"
          placeholder="Enter Title"
          className="block w-full p-2 border rounded-md "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          className="block w-full p-2 border rounded-md mt-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="p-4 mb-4 bg-white rounded-md shadow-md flex justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.desc}</p>
            </div>
            <button
              className="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

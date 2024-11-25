// app/page.js
'use client'
import { useState, useEffect } from "react";
import TaskList from '@/components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks/index");
    const data = await response.json();
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, time }),
    });
    if (response.ok) {
      fetchTasks();
      setTitle("");
      setDate("");
      setTime("");
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch("/api/tasks/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) fetchTasks();
  };

  const handleToggleComplete = async (id, completed) => {
    const response = await fetch("/api/tasks/complete", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });
    if (response.ok) fetchTasks();
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-600 font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleAddTask} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {/* <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <TaskList tasks={tasks} onDelete={handleDelete} onToggleComplete={handleToggleComplete} /> */}
    </div>
  );
};

export default Home;

// app/completed/page.js
'use client'
import { useState, useEffect } from "react";
import TaskList from '@/components/TaskList';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks/index");
    const data = await response.json();
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <TaskList tasks={tasks} onDelete={handleDelete} onToggleComplete={handleToggleComplete} />
    </div>
  );
};

export default CompletedTasks;


'use client';

import { useEffect, useState } from 'react';
import TaskList from './TaskList'; 

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const response = await fetch("/api/tasks/index");
        const data = await response.json();
        setTasks(
          data.tasks.filter(
            (task) => new Date(task.date) > new Date() // Filter for upcoming tasks only
          )
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchUpcomingTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/tasks/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await fetch("/api/tasks/complete", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed }),
      });
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold mb-4">Upcoming Tasks</h1>
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default UpcomingTasks;

// app/components/TaskList.js
import { format } from "date-fns";

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
  return (
    <ul className="space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li
            key={task._id}
            className={`flex items-center justify-between p-3 border rounded hover:shadow-md ${
              task.completed ? "bg-gray-200 text-gray-500 line-through" : "bg-gray-50 text-gray-700"
            }`}
          >
            <div>
              <h2 className="text-lg font-medium">{task.title}</h2>
              <p className="text-sm">
                {format(new Date(task.date), "dd/MM/yyyy")} at {task.time}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task._id, !task.completed)}
                className="h-5 w-5"
              />
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <li className="text-gray-500 text-center">No tasks available</li>
      )}
    </ul>
  );
};

export default TaskList;

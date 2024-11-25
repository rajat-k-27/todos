// app/components/Sidebar.js
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-xl font-bold mb-6">To-Do App</h1>
      <ul>
        <li>
          <Link href="/" className="block py-2 px-4 hover:bg-gray-600 rounded">
            Add Task
          </Link>
        </li>
        <li>
          <Link href="/completed" className="block py-2 px-4 hover:bg-gray-600 rounded">
            View Tasks
          </Link>
        </li>
        <li>
          <Link href="/upcoming-tasks" className="block py-2 px-4 hover:bg-gray-600 rounded">
            Upcoming Tasks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

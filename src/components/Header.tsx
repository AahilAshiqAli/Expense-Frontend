import { Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
        <p className="text-gray-500">Track your spending and save more</p>
      </div>

      <div className="mt-4 flex space-x-3 md:mt-0">
        <Link to="/add">
          <button className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </button>
        </Link>
        <Link to="/income">
          <button className="flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Income
          </button>
        </Link>
      </div>
    </div>
  );
}

import { Search } from 'lucide-react';

const NoTransactions = () => {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="mb-4 rounded-full bg-gray-50 p-4">
        <Search size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-700">No transactions found</h3>
      <p className="mt-1 text-sm text-gray-500">Add a new transaction to get started</p>
    </div>
  );
};

export default NoTransactions;

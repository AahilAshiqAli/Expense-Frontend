import { createLazyFileRoute } from '@tanstack/react-router';
import { Currency } from '@/utils/Currency';

export const Route = createLazyFileRoute('/transactions')({
  component: TransactionsPage,
});

function TransactionsPage() {
  // This would be replaced with actual data from useExpenseStore()
  const allTransactions: Transaction[] = [
    {
      id: 1,
      name: 'Groceries',
      price: 85.42,
      date: new Date('2025-04-02'),
      category: 'Food',
      type: 'expense',
    },
    {
      id: 2,
      name: 'Salary',
      price: 2500.0,
      date: new Date('2025-04-01'),
      category: 'Income',
      type: 'income',
    },
    {
      id: 3,
      name: 'Restaurant',
      price: 64.3,
      date: new Date('2025-03-30'),
      category: 'Food',
      type: 'expense',
    },
    {
      id: 4,
      name: 'Gas',
      price: 45.0,
      date: new Date('2025-03-29'),
      category: 'Transportation',
      type: 'expense',
    },
    {
      id: 5,
      name: 'Movie tickets',
      price: 24.0,
      date: new Date('2025-03-27'),
      category: 'Entertainment',
      type: 'expense',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        {/* Summary card */}
        <div className="border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-800">{Currency(2381)}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm font-medium text-green-600">Income</p>
              <p className="text-2xl font-bold text-gray-800">$2,500.00</p>
            </div>
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">Expenses</p>
              <p className="text-2xl font-bold text-gray-800">$118.72</p>
            </div>
          </div>
        </div>

        {/* Transaction list */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {allTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                      ${
                        transaction.category === 'Food'
                          ? 'bg-yellow-100 text-yellow-800'
                          : transaction.category === 'Transportation'
                            ? 'bg-blue-100 text-blue-800'
                            : transaction.category === 'Entertainment'
                              ? 'bg-purple-100 text-purple-800'
                              : transaction.category === 'Income'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={`whitespace-nowrap px-6 py-4 text-right text-sm font-medium
                    ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(transaction.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">5</span> of <span className="font-medium">5</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

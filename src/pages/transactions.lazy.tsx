import { createLazyFileRoute } from '@tanstack/react-router';
import { Currency } from '@/utils/Currency';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { calculateBalance, calculateIncome, calculateExpenses } from '@/utils/calculateHeader';
import useCategories from '@/hooks/useCategories';
import { useNavigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/transactions')({
  component: TransactionsPage,
});

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGQwNzc4NWRhMGUwNTdhMTBjY2NhNiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTc0NTY4NDM0NCwiZXhwIjoxNzQ4Mjc2MzQ0fQ.JWuxQ0F-weWkxrnAsqXbJgzx2oELp-FtUxYnQFEYXto';

// whenever anything inside queryKey changes, then query will be re-run
function TransactionsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['transactions-paginated', { page }],
    queryFn: async () => {
      const response = await axios.get<Transaction[]>(
        `http://localhost:3000/api/v1/expense/transactions-paginated/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
          },
        },
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      if (data === undefined && page > 1) {
        alert('No more transactions to show');
        setPage(page - 1);
      } else if (data === undefined && page === 1) {
        alert('No transactions found. Redirecting to home page.');
        navigate({ to: '/', replace: true });
      }
    }
  }, [isSuccess, data]);

  let transactions: Transaction[] = [];

  const { data: categories } = useCategories();

  const categoryColors: { [key: string]: string } = {};
  if (categories) {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800 ',
      'bg-pink-500 text-pink-800',
      'bg-yellow-100 text-yellow-800',
    ];
    for (let i = 0; i < categories.length; i++) {
      categoryColors[categories[i].name] = colors[i % colors.length];
    }
  }

  if (data) {
    transactions = data;
  }

  if (isLoading) {
    return (
      <div>
        <h2>Loading...........</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        {/* Summary card */}
        <div className="border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-800">
                {Currency(calculateBalance(transactions))}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm font-medium text-green-600">Income</p>
              <p className="text-2xl font-bold text-gray-800">
                {Currency(calculateIncome(transactions))}
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">Expenses</p>
              <p className="text-2xl font-bold text-gray-800">
                {Currency(calculateExpenses(transactions))}
              </p>
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
              {transactions.map((transaction) => (
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
                      ${categoryColors[transaction.category] || 'bg-blue-500'}`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={`whitespace-nowrap px-6 py-4 text-right text-sm font-medium
                    ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(transaction.amount).toFixed(2)}
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
            {transactions.length > 0 && (
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{' '}
                  <span className="font-medium">{(page - 1) * 10 + transactions.length}</span>
                </p>
              </div>
            )}
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                >
                  <span className="sr-only"></span>
                  &larr;
                </button>
                <button className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {page}
                </button>
                <button
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= 10}
                >
                  <span className="sr-only"></span>
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

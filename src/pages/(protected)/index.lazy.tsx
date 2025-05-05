import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import {
  ChevronDown,
  DollarSign,
  Calendar,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  // Filter,
} from 'lucide-react';
import BarChart from '@/components/BarChart';
import calculateSpendingByCategory from '@/utils/spendingByCategory';
import { Currency, Currency1 } from '@/utils/Currency';
import { Link } from '@tanstack/react-router';
import FormatDate from '@/utils/FormatDate';
import Colors from '@/utils/Colors';
import useAllTransactions from '@/hooks/useAllTransactions';
import { ChartData } from '@/components/BarChart';
import calculateByMonth from '@/utils/CalculateByMonth';
import {
  calculateBalance,
  calculateExpenses,
  calculateIncome,
  calculateSavingRate,
} from '@/utils/calculateHeader';
import categoryUtils from '@/utils/categoryUtils';
import useCategories from '@/hooks/useCategories';
import NoTransaction from '@/components/ui/NoTransaction';

export const Route = createLazyFileRoute('/(protected)/')({
  component: ExpenseTracker,
});

function ExpenseTracker() {
  const { data: transactions = [] } = useAllTransactions();
  const activePeriod = useState('This Month')[0];

  const category = categoryUtils(transactions);
  const { data: categories } = useCategories();

  const budgetByCategory: Record<string, number> = {};

  if (!categories) return <div>Loading...</div>;
  for (let i = 0; i < categories.length; i++) {
    budgetByCategory[categories[i].name] = categories[i].monthlyLimit;
  }

  const spendingByCategory: Record<string, number> = calculateSpendingByCategory(transactions);

  // only used for expenses becuase it is used multiple times in the code and not sustainable to calculate each time on the fly
  const expenses = useMemo(() => calculateExpenses(transactions || []), [transactions]);

  const chartData: ChartData[] = calculateByMonth(transactions || []);
  const categoryColors: Record<string, string> = {};
  if (category) {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'];
    for (let i = 0; i < category.length; i++) {
      categoryColors[category[i]] = colors[i % colors.length];
    }
  }

  console.log(transactions);

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-blue-50 p-2">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" /> 8.1%
            </span>
          </div>
          <h3 className="mb-1 text-sm text-gray-500">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-800">
            {Currency(calculateBalance(transactions || []))}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-red-50 p-2">
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
            <span className="flex items-center text-sm font-medium text-red-500">
              <ArrowUpRight className="mr-1 h-4 w-4" /> 12.4%
            </span>
          </div>
          <h3 className="mb-1 text-sm text-gray-500">Total Expenses</h3>
          <p className="text-2xl font-bold text-gray-800">{Currency(expenses)}</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-green-50 p-2">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" /> 3.2%
            </span>
          </div>
          <h3 className="mb-1 text-sm text-gray-500">Total Income</h3>
          <p className="text-2xl font-bold text-gray-800">
            {Currency(calculateIncome(transactions || []))}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-purple-50 p-2">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700">
                {activePeriod} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          <h3 className="mb-1 text-sm text-gray-500">Savings Rate</h3>
          <p className="text-2xl font-bold text-gray-800">
            {calculateSavingRate(transactions || [])}%{' '}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Expense Chart */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Expense Overview</h2>
              <button className="flex items-center text-sm text-gray-500">
                This Month <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="flex justify-center">
              <BarChart className="h-4/5 w-4/5 text-gray-300" chartData={chartData} />
              <div className="ml-4 flex flex-col justify-start gap-2 text-black">
                <div className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: '#ff6444' }}
                  ></div>
                  <span className="text-gray-500">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: '#089c94' }}
                  ></div>
                  <span className="text-gray-500">Expenses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <Link to="/transactions">
                <button className="text-sm font-medium text-indigo-600">View All</button>
              </Link>
            </div>

            <div className="space-y-4">
              {transactions ? (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-800">{transaction.name}</p>
                        <p className="text-xs text-gray-500">
                          {FormatDate(transaction.date)} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {Currency(transaction.amount) || Currency(0)}
                    </span>
                  </div>
                ))
              ) : (
                <NoTransaction />
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Category Breakdown */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Spending by Category</h2>
              <button className="flex items-center text-sm text-gray-500">
                This Month <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="relative h-32 w-32">
                <PieChart className="h-full w-full text-gray-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{Currency1(expenses)}</span>
                  <span className="text-xs text-gray-500">Total Spent</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-black">
              {category
                .filter((category) => spendingByCategory[category] > 0)
                .map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`h-3 w-3 rounded-full ${categoryColors[category] || 'bg-blue-500'}`}
                      ></div>
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-800">
                        {Currency1(spendingByCategory[category])}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({Math.abs((spendingByCategory[category] / expenses) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Budgets */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Budget Status</h2>
              <button className="flex items-center text-sm text-gray-500">
                This Month <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5">
              {Object.entries(budgetByCategory)
                .filter(([cat]) => spendingByCategory[cat] > 0)
                .map(([cat, budget]) => {
                  const spending = spendingByCategory[cat];
                  const percentage = Math.min((spending / budget) * 100, 100); // Cap at 100%
                  return (
                    <div key={cat}>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm text-gray-700">{cat}</span>
                        <span className="text-sm font-medium text-gray-800">
                          {Currency1(spending)} / {Currency1(budget)}
                        </span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-2.5 ${Colors(spending, budget)} rounded-full ${categoryColors[cat] || 'bg-green-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}

              <Link to="/budget">
                <button className="mt-2 w-full rounded-lg border border-gray-200 py-3 text-center text-sm font-medium text-indigo-600">
                  Manage Budgets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

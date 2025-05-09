import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useCreateTransaction } from '@/mutations/useCreateTransaction';
import useAllTransactions from '@/hooks/useAllTransactions';
import useCategories from '@/hooks/useCategories';
import useAuth from '@/hooks/useAuth';

export const Route = createLazyFileRoute('/(protected)/add')({
  component: AddExpense,
});

function AddExpense() {
  const mutationTransaction = useCreateTransaction();
  const { data: transactions } = useAllTransactions();
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });
  const { data } = useCategories();
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setShowNewCategory(true);
    } else {
      setExpenseData({
        ...expenseData,
        category: value,
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setExpenseData({
        ...expenseData,
        category: newCategory,
      });
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  useEffect(() => {
    const cat: string[] = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        cat.push(data[i].name);
      }
    }

    if (transactions) {
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') continue;
        if (transactions[i].category in cat) continue;
        cat.push(transactions[i].category);
      }
    }
    const uniqueCategories = [...new Set(cat)];
    setCategories(uniqueCategories);
  }, [data, transactions]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const expenseDate = new Date(expenseData.date);
    if (
      expenseData.name &&
      expenseData.amount !== '' &&
      expenseData.category &&
      date >= expenseDate
    ) {
      const transaction: Transaction = {
        id: 1,
        name: expenseData.name,
        type: 'expense',
        amount: Number(expenseData.amount),
        date: expenseDate,
        category: expenseData.category,
        userId: user._id,
      };
      mutationTransaction.mutate(transaction);
      setExpenseData({
        name: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
      });
      alert('Expense added: ' + JSON.stringify(expenseData, null, 2));
      navigate({ to: '/', replace: true });
    } else if (!expenseData.name) {
      alert('Expense name is required');
    } else if (!expenseData.amount) {
      alert('Expense amount is required');
    } else if (!expenseData.category) {
      alert('Category is required');
    } else if (date < expenseDate) {
      alert('Expense date cannot be in the future');
    } else {
      alert('Expense not added');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block font-medium text-gray-700">
            Expense Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={expenseData.name}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            placeholder="e.g., Grocery shopping"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expenseData.amount}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            placeholder="1000"
            step="10"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={expenseData.date}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            placeholder={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={expenseData.category}
            onChange={handleCategoryChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            required={!showNewCategory}
          >
            {/* Here, required is used to ensure that when showNewCategory is false, user is not giving any new Category then user needs to fill this field
            Else not required*/}

            <option value="" disabled>
              Select Category
            </option>
            {categories !== undefined &&
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            <option value="add_new">+ Add New Category</option>
          </select>
        </div>

        {showNewCategory && (
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="mr-3 flex-grow rounded-l-md border border-gray-300 px-3 py-2 text-black"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="text-rounded rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Link to="/">
            <button
              type="button"
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
}

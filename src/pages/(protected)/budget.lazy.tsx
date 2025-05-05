import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useCreateCategory } from '@/mutations/useCreateCategory';
import useCategories from '@/hooks/useCategories';
import { useEditCategory } from '@/mutations/useEditCategory';
import { useDeleteCategory } from '@/mutations/useDeleteCategory';
import SuggestionsBox from '@/components/ui/SuggestionsBox';
import categoryUtils from '@/utils/categoryUtils';
import useAllTransactions from '@/hooks/useAllTransactions';
import useAuth from '@/hooks/useAuth';

export const Route = createLazyFileRoute('/(protected)/budget')({
  component: ManageBudgets,
});

function ManageBudgets() {
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const [newCategory, setNewCategory] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const { data: categories } = useCategories();
  const mutationCategory = useCreateCategory();
  const mutationEditCategory = useEditCategory();
  const mutationDeleteCategory = useDeleteCategory();
  const { data: transactions } = useAllTransactions();
  console.log('categories', categories);
  const budgetByCategory =
    categories?.reduce(
      (acc, category) => {
        acc[category.name] = category.monthlyLimit;
        return acc;
      },
      {} as Record<string, number>,
    ) ?? {};

  const handleBudgetChange = (category: string, value: number | string) => {
    if (value === '') return;
    if (categories === undefined) return;
    let categoryToFindId: number | undefined;
    for (let i = 0; i < categories?.length; i++) {
      if (categories[i].name === category) {
        categoryToFindId = categories[i]._id;
        break;
      }
    }
    if (!categoryToFindId) return;
    const categoryToUpdate: Category = {
      name: category,
      monthlyLimit: Number(value),
      userId: user._id,
    };

    mutationEditCategory.mutate({ id: categoryToFindId, category: categoryToUpdate });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && newBudget.trim() !== '') {
      const category: Category = {
        name: newCategory,
        monthlyLimit: Number(newBudget),
        userId: user._id,
      };
      mutationCategory.mutate(category);

      setNewCategory('');
      setNewBudget('');
      setShowAddCategory(false);
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (categories === undefined) return;
    let categoryToFindId: number | undefined;
    for (let i = 0; i < categories?.length; i++) {
      if (categories[i].name === category) {
        categoryToFindId = categories[i]._id;
        break;
      }
    }
    if (!categoryToFindId) return;
    mutationDeleteCategory.mutate(categoryToFindId);
    console.log('need to delete here');
  };

  const handleSaveChanges = () => {
    alert('Budget changes saved!');
    navigate({ to: '/' });
  };

  const handleCancel = () => {
    navigate({ to: '/' });
  };

  const onAddCategories = (suggestion: string) => {
    setNewCategory(suggestion);
    setShowAddCategory(true);
  };

  const giveSuggestions = (transactions: Transaction[]): string[] => {
    const suggestions: string[] = categoryUtils(transactions);
    const cat: string[] = [];
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        cat.push(categories[i].name);
      }
      return suggestions.filter((suggestion) => !cat.includes(suggestion));
    }
    return [];
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Manage Budgets</h2>

      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          {!showAddCategory && (
            <button
              type="button"
              onClick={() => setShowAddCategory(true)}
              className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
            >
              Add New
            </button>
          )}
        </div>

        {Object.entries(budgetByCategory).map(([category, budget]) => (
          <div key={category} className="mb-4 flex items-center">
            <div className="flex-grow">
              <label className="mb-1 block text-gray-700">{category}</label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={budget ?? 0}
                  onChange={(e) => handleBudgetChange(category, e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  min="0"
                  step="1"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDeleteCategory(category)}
              className="ml-3 mt-3 px-4 py-4 text-2xl text-red-500 hover:text-red-700"
              aria-label="Delete category"
            >
              ✕
            </button>
          </div>
        ))}

        {showAddCategory && (
          <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4">
            <h4 className="text-md mb-3 font-medium">Add New Category</h4>
            <div className="mb-3">
              <label className="mb-1 block text-gray-700">Category Name</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                placeholder="e.g., Shopping"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-gray-700">Monthly Budget</label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                  min="0"
                  step="1"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddCategory(false)}
                className="rounded-md bg-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {transactions && (
        <div className="mt-6">
          <SuggestionsBox
            onAddCategories={onAddCategories}
            suggestions={giveSuggestions(transactions)}
          />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveChanges}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

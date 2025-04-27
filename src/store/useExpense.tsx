import { create } from 'zustand';


type BudgetByCategory = {
  [key: string]: number;
};

interface ExpenseStore {
  category: string[];
  savings: number;
  spendingByCategory: spendingBycategory;
  budgetByCategory: BudgetByCategory;
  setBudgetByCategory: (budgetByCategory: BudgetByCategory) => void;
  setCategory: (category: string[]) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  category: [],
  savings: 0,
  budgetByCategory: {},



  setCategory: (category: string[]) => {
    set((state) => {
      return { ...state, category: [...new Set([...state.category, ...category])] };
    });
  },

  setBudgetByCategory: (budgetByCategory: BudgetByCategory) => {
    set((state) => ({
      ...state,
      budgetByCategory: {
        ...state.budgetByCategory,
        ...budgetByCategory,
      },
    }));
  },

  setTransactions: (transactions: Transaction[]) => {


      const category: string[] = [];
      for (let i = 0; i < transactions.length; i++) {
        if (!category.includes(transactions[i].category)) {
          category.push(transactions[i].category);
        }
      }

    });
  },

  addTransaction: (transaction: Transaction) => {
    set((state) => {
      const balance =
        transaction.type === 'income'
          ? state.balance + transaction.price
          : state.balance - transaction.price;
      const income =
        transaction.type === 'income' ? state.income + transaction.price : state.income;

      return {
        category:
          state.category.includes(transaction.category) || transaction.type === 'income'
            ? state.category
            : [...state.category, transaction.category],
        transactions: [...state.transactions, transaction],
        balance: balance,
        expenses:
          transaction.type === 'expense' ? state.expenses + transaction.price : state.expenses,
        income: income,
        savings: income === 0 ? 0 : (balance / income) * 100,
        spendingByCategory:
          transaction.type === 'expense'
            ? {
                ...state.spendingByCategory,
                [transaction.category]:
                  (state.spendingByCategory[transaction.category] || 0) + transaction.price,
              }
            : state.spendingByCategory,
      };
    });
  },

  removeTransaction: (id: number) => {
    set((state) => {
      const transactionToRemove = state.transactions.find((t) => t.id === id);
      if (!transactionToRemove) return state;
      const balance =
        transactionToRemove.type === 'expense'
          ? state.balance + transactionToRemove.price
          : state.balance - transactionToRemove.price;
      const income =
        transactionToRemove.type === 'income'
          ? state.income - transactionToRemove.price
          : state.income;
      const transactions = state.transactions.filter((t) => t.id !== id);
      return {
        category: transactions.find((t) => t.category === transactionToRemove.category)
          ? state.category
          : state.category.filter((c) => c !== transactionToRemove.category),
        transactions: transactions,
        balance: balance,
        expenses: state.expenses - transactionToRemove.price,
        income: income,
        savings: income === 0 ? 0 : (balance / income) * 100,
        spendingByCategory: {
          ...state.spendingByCategory,
          [transactionToRemove.category]: Math.max(
            (state.spendingByCategory[transactionToRemove.category] || 0) -
              transactionToRemove.price,
            0,
          ),
        },
      };
    });
  },
}));

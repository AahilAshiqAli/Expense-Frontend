import { create } from 'zustand';

export type spendingBycategory = {
  [key: string]: number;
};

type BudgetByCategory = {
  [key: string]: number;
};

interface ExpenseStore {
  allTransactions: Transaction[];
  transactions: Transaction[];
  balance: number;
  expenses: number;
  income: number;
  category: string[];
  savings: number;
  spendingByCategory: spendingBycategory;
  budgetByCategory: BudgetByCategory;
  setAllTransactions: (transactions: Transaction[]) => void;
  setBudgetByCategory: (budgetByCategory: BudgetByCategory) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
  setCategory: (category: string[]) => void;
  calculateSpendingByCategory: () => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  allTransactions: [],
  // these statistics are all by Month. Later on, i will add filter property as well which can change month to year.
  transactions: [],
  balance: 0,
  expenses: 0,
  income: 0,
  category: [],
  savings: 0,
  budgetByCategory: {},
  spendingByCategory: {},

  setAllTransactions: (transactions: Transaction[]) => {
    set((state) => ({ ...state, allTransactions: transactions }));
  },

  setCategory: (category: string[]) => {
    set((state) => {
      return { ...state, category: [...new Set([...state.category, ...category])] };
    });
  },

  calculateSpendingByCategory: () => {
    set((state) => {
      const spendingByCategory: spendingBycategory = {};
      for (let i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].category in Object.keys(spendingByCategory)) {
          spendingByCategory[state.transactions[i].category] += state.transactions[i].price;
        } else {
          spendingByCategory[state.transactions[i].category] = state.transactions[i].price;
        }
      }
      return {
        ...state,
        spendingByCategory,
      };
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
    set((state) => {
      let balance: number = 0;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'expense') {
          balance += transactions[i].price;
        } else if (transactions[i].type === 'income') {
          balance -= transactions[i].price;
        }
      }

      let expenses: number = 0;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'expense') {
          expenses += transactions[i].price;
        }
      }

      let income: number = 0;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
          income += transactions[i].price;
        }
      }

      const category: string[] = [];
      for (let i = 0; i < transactions.length; i++) {
        if (!category.includes(transactions[i].category)) {
          category.push(transactions[i].category);
        }
      }
      console.log('Hi', category);
      return {
        ...state,
        transactions,
        balance: balance,
        expenses: expenses,
        income: income,
        savings: income === 0 ? 0 : (balance / income) * 100,
        category: category,
      };
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

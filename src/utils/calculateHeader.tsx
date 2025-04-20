import { spendingBycategory } from '@/store/useExpense';

export const calculateBalance = (transactions: Transaction[]): number => {
  let balance: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'expense') {
      balance -= transactions[i].price;
    } else if (transactions[i].type === 'income') {
      balance += transactions[i].price;
    }
  }

  return balance;
};

export const calculateExpenses = (transactions: Transaction[]): number => {
  let expenses: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'expense') {
      expenses += transactions[i].price;
    }
  }

  return expenses;
};

export const calculateIncome = (transactions: Transaction[]): number => {
  let income: number = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') {
      income += transactions[i].price;
    }
  }

  return income;
};

export const calculateCatergory = (transactions: Transaction[]): string[] => {
  const category: string[] = [];
  for (let i = 0; i < transactions.length; i++) {
    if (!category.includes(transactions[i].category)) {
      category.push(transactions[i].category);
    }
  }
  return category;
};

export const calculateSpendingByCategory = (transactions: Transaction[]) => {
  const spendingByCategory: spendingBycategory = {};
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category in Object.keys(spendingByCategory)) {
      spendingByCategory[transactions[i].category] += transactions[i].price;
    } else {
      spendingByCategory[transactions[i].category] = transactions[i].price;
    }
  }
  return spendingByCategory;
};

export const calculateSavingRate = (transactions: Transaction[]) => {
  const balance = calculateBalance(transactions);
  const income = calculateIncome(transactions);
  return income === 0 ? 0 : (balance / income) * 100;
};

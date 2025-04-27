type spendingBycategory = {
  [key: string]: number;
};

export default function calculateSpendingByCategory(transactions: Transaction[]) {
  const spendingByCategory: spendingBycategory = {};
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category in Object.keys(spendingByCategory)) {
      spendingByCategory[transactions[i].category] += transactions[i].amount;
    } else {
      spendingByCategory[transactions[i].category] = transactions[i].amount;
    }
  }

  return spendingByCategory;
}

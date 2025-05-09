export default function categoryUtils(transactions: Transaction[]) {
  const category: string[] = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') continue;
    if (!category.includes(transactions[i].category)) {
      category.push(transactions[i].category);
    }
  }
  return category;
}

import getMonth from '@/utils/getMonth';
import { ChartData } from '@/components/BarChart';

export default function calculateByMonth(transactions: Transaction[]): ChartData[] {
  const chartData: ChartData[] = [];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  for (let i = 0; i < 12; i++) {
    let income = 0,
      expenses = 0;
    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].date.getMonth() === i && transactions[j].date >= oneYearAgo) {
        if (transactions[j].type === 'income') {
          income += transactions[j].price;
        } else {
          expenses += transactions[j].price;
        }
      }
    }
    chartData.push({
      month: getMonth(i),
      income: income,
      expenses: expenses,
    });
  }
  return chartData;
}

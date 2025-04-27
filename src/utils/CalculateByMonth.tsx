import getMonth from '@/utils/getMonth';
import { ChartData } from '@/components/BarChart';

export default function calculateByMonth(transactions: Transaction[]): ChartData[] {
  const chartData: ChartData[] = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const monthOrder: number[] = [];
  for (let i = 1; i <= 12; i++) {
    const monthIndex = (currentMonth + i) % 12;
    monthOrder.push(monthIndex);
  }

  for (const i of monthOrder) {
    // console.log(typeof transactions[i].date, transactions[i]);
    let income = 0,
      expenses = 0;
    for (let j = 0; j < transactions.length; j++) {
      if (typeof transactions[j].date === 'string') console.log('Date is in string format');
      if (transactions[j].date.getMonth() === i && transactions[j].date >= oneYearAgo) {
        if (transactions[j].type === 'income') {
          income += transactions[j].amount;
        } else {
          expenses += transactions[j].amount;
        }
      }
    }
    chartData.push({
      month: getMonth(i).slice(0, 3),
      income: income,
      expenses: expenses,
    });
  }

  return chartData;
}

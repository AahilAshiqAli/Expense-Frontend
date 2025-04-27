import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { CardContent, CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export interface ChartData {
  month: string;
  income: number;
  expenses: number;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

// const sampleChartData: ChartData[] = [
//   { month: 'Jan', income: 1200, expenses: 800 },
//   { month: 'Feb', income: 1500, expenses: 900 },
//   { month: 'Mar', income: 1700, expenses: 950 },
//   { month: 'Apr', income: 1800, expenses: 1100 },
//   { month: 'May', income: 1600, expenses: 1000 },
//   { month: 'Jun', income: 1900, expenses: 1200 },
//   { month: 'Jul', income: 2000, expenses: 1300 },
//   { month: 'Aug', income: 2100, expenses: 1400 },
//   { month: 'Sep', income: 2200, expenses: 1500 },
//   { month: 'Oct', income: 2300, expenses: 1600 },
//   { month: 'Nov', income: 2400, expenses: 1700 },
//   { month: 'Dec', income: 2500, expenses: 1800 },
// ];

export function Component({ chartData }: { chartData: ChartData[] }) {
  return (
    <>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="income" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </>
  );
}

export default function BarChartComponent({
  className = '',
  chartData,
}: {
  className?: string;
  chartData: ChartData[];
}) {
  return (
    <div className={className}>
      <Component chartData={chartData} />
    </div>
  );
}

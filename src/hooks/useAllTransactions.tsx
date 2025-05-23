import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');
// returns all transactions till that offset
export default function useAllTransactions() {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await axios.get<Transaction[]>(
        `http://localhost:3000/api/v1/expense/transactions/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      response.data.forEach((transaction: Transaction) => {
        transaction.date = new Date(transaction.date);
      });
      return response.data;
    },
    refetchInterval: 500000,
  });

  return query; // used to call query.loading or query.error
}

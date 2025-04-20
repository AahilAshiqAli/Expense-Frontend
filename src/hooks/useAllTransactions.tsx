import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// returns all transactions till that offset
export default function useAllTransactions({ page }: { page: number }) {
  const query = useQuery({
    queryKey: ['transactions', { page }],
    queryFn: async () => {
      const response = await axios.get<Transaction[]>('http://localhost:3000/api/all-transactions');
      return response.data;
    },
    refetchInterval: 5000,
  });

  return query; // used to call query.loading or query.error
}

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// returns transaction for the id
export default function useTransactions(id: number) {
  const query = useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const response = await axios.get<Transaction[]>(
        `http://localhost:3000/api/transaction/${id}`,
      );
      return response.data;
    },
  });

  return query; // returns query so we could call query.error and query.loading
}

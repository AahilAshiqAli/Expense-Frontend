import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');

// returns all transactions till that offset
export default function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get<Category[]>(
        `http://localhost:3000/api/v1/expense/categories/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    refetchInterval: 500000,
  });

  return query; // used to call query.loading or query.error or query.data
}

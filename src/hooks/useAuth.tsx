import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// const token = localStorage.getItem('token');
const token = localStorage.getItem('token');

export default function useAuth() {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/user/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response', response);
      return response.data;
    },
    refetchInterval: 500000,
  });

  return query;
}

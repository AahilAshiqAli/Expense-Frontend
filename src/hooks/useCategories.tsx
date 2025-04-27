import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// const token = localStorage.getItem('token');
const userID = '680d07785da0e057a10ccca6';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGQwNzc4NWRhMGUwNTdhMTBjY2NhNiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTc0NTY4NDM0NCwiZXhwIjoxNzQ4Mjc2MzQ0fQ.JWuxQ0F-weWkxrnAsqXbJgzx2oELp-FtUxYnQFEYXto';
// returns all transactions till that offset
export default function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get<Category[]>(
        `http://localhost:3000/api/v1/expense/categories/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    refetchInterval: 5000,
  });

  return query; // used to call query.loading or query.error or query.data
}

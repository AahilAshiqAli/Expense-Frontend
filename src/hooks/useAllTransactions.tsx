import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// const token = localStorage.getItem('token');
const userID = '680d07785da0e057a10ccca6';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGQwNzc4NWRhMGUwNTdhMTBjY2NhNiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTc0NTY4NDM0NCwiZXhwIjoxNzQ4Mjc2MzQ0fQ.JWuxQ0F-weWkxrnAsqXbJgzx2oELp-FtUxYnQFEYXto';
// returns all transactions till that offset
export default function useAllTransactions() {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await axios.get<Transaction[]>(
        `http://localhost:3000/api/v1/expense/transactions/${userID}`,
        {
          withCredentials: true,
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

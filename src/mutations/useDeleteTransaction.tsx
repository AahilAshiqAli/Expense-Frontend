import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGQwNzc4NWRhMGUwNTdhMTBjY2NhNiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTc0NTY4NDM0NCwiZXhwIjoxNzQ4Mjc2MzQ0fQ.JWuxQ0F-weWkxrnAsqXbJgzx2oELp-FtUxYnQFEYXto';

const deleteTransaction = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/expense/transaction/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      console.log('Transaction deleted succesfully: ', data);
    },
  });
  return mutation;
}

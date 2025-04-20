import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteTransaction = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/expense/transaction/${id}`);
  return response.data;
};

export function useDeleteTransaction() {
  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      console.log('Transaction deleted succesfully: ', data);
    },
  });
  return mutation;
}

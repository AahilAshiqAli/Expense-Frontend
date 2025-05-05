import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');

const createTransaction = async (transaction: Transaction) => {
  const response = await axios.post(
    'http://localhost:3000/api/v1/expense/transaction/',
    transaction,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // in axios, it handles error automatically. so we don't need to handle error here.
  return response.data;
};

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      console.log('Transaction created successfully: ', data);
    },
  });

  return mutation;
}

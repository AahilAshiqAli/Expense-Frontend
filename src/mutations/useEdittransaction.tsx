import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const editTransaction = async ({
  id,
  transaction,
}: {
  id: number;
  transaction: Transaction;
}): Promise<Transaction> => {
  const response = await axios.put(
    `http://localhost:3000/api/edit-transaction/${id}`,
    transaction,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};
export function useEditTransaction() {
  const mutation = useMutation({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      console.log('Transaction edited succesfully: ', data);
    },
  });

  return mutation;
}

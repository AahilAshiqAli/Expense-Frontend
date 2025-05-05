import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const token = localStorage.getItem('token');

const editCategory = async ({
  id,
  category,
}: {
  id: number;
  category: Category;
}): Promise<Transaction> => {
  const response = await axios.put(
    `http://localhost:3000/api/v1/expense/category/${id}`,
    category,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export function useEditCategory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category edited succesfully: ', data);
    },
  });

  return mutation;
}

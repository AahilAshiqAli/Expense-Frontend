import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');

const createCategory = async (category: Category) => {
  const response = await axios.post(`http://localhost:3000/api/v1/expense/category/`, category, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // in axios, it handles error automatically. so we don't need to handle error here.
  return response.data;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      console.log('Category created successfully: ', data);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return mutation;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const token = localStorage.getItem('token');
const deleteCategory = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/expense/category/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category deleted succesfully: ', data);
    },
  });
  return mutation;
}

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// const token = localStorage.getItem('token');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGQwNzc4NWRhMGUwNTdhMTBjY2NhNiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTc0NTY4NDM0NCwiZXhwIjoxNzQ4Mjc2MzQ0fQ.JWuxQ0F-weWkxrnAsqXbJgzx2oELp-FtUxYnQFEYXto';

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
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      console.log('Category created successfully: ', data);
    },
  });

  return mutation;
}

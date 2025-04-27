import { createLazyFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import dashboard from '@/assets/dashboard.png';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const Route = createLazyFileRoute('/login')({
  component: LoginScreen,
});

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (requestBody: { email: string; password: string }) => {
      const response = await axios.post(`http://localhost:3000/api/v1/auth/login`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Login successful: ', data);
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate({ to: '/', replace: true });
      }
    },
    onError: (error) => {
      console.error('Login failed: ', error);
      alert('Login failed. Please try again later.');
      setError(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      email: email,
      password: password,
    };

    mutation.mutate(requestBody);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side: Login Form */}
      <div className="flex w-full flex-col items-center bg-white p-8 md:w-1/2">
        <div className="mb-8 w-28"></div>
        <h2 className="text-primary mb-2 text-3xl font-semibold">Login</h2>
        <p className="mb-8 text-center text-gray-600">Enter Your Login Credentials Here</p>
        <form className="w-full max-w-md space-y-6 px-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="aahilashiqali@gmail.com"
              className="focus:ring-primary rounded-md border border-gray-300 p-3 text-black transition duration-200 focus:outline-none focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="***************"
                className="focus:ring-primary w-full rounded-md border border-gray-300 p-3 text-black transition duration-200 focus:outline-none focus:ring-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="hover:text-secondary absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500">
                <i className="icon-eye"></i>
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="text-secondary-100 border-primary focus:ring-secondary h-4 w-4 rounded"
              />
              <label htmlFor="rememberMe" className="text-primary ml-2">
                Remember me?
              </label>
            </div>
            <a className="text-primary hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-secondary-200 w-full rounded-md py-3 font-medium text-white transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </div>

      <div className="bg-primary-100 hidden w-full flex-col items-center justify-center p-8 md:flex md:w-1/2">
        <div className="m-auto flex w-auto items-center justify-center">
          <img src={dashboard} alt="Image of Dashboard" className="rounded-lg" />
        </div>
        <h3 className="my-5 mb-4 text-center text-2xl font-bold text-white">
          Easy-to-Use Tracker for Managing Your Personal Expenses.
        </h3>
        <p className="mb-8 px-6 text-center text-gray-200">
          Streamline Your Savings with Our User-Friendly Dashboard.
        </p>
      </div>
    </div>
  );
}

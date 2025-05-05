import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Header from '@/components/Header';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

export const Route = createFileRoute('/(protected)')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { data: user } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      navigate({
        to: '/login',
        search: { redirect: window.location.href },
      });
    }
  }, [token, user, navigate]);

  return (
    <div className="grid h-screen w-full place-items-center text-white">
      <div className="h-full max-h-screen w-full bg-gray-50 p-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Header />
          <Outlet />
        </div>
      </div>
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </div>
  );
}

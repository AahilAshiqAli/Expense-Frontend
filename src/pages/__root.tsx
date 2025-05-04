import Header from '@/components/Header';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Route = createRootRoute({ component: RootRoute });

function RootRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function authenticate() {
      const response = await axios.get(`http://localhost:3000/api/v1/user/me`);
      if (response?.status === 200) {
        setAuthenticated(true);
      }
      setAuthenticated(false);
    }

    authenticate();
  }, []);

  return (
    <>
      {true ? (
        <div className="grid h-screen w-full place-items-center text-white">
          <div className="h-full max-h-screen w-full bg-gray-50 p-4 md:px-8">
            <div className="mx-auto max-w-6xl">
              <Header />
              <Outlet />
            </div>
          </div>
          {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

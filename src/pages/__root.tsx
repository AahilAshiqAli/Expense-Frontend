import Header from '@/components/Header';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({ component: RootRoute });

function RootRoute() {
  return (
    <>
      <div className="grid h-screen w-full place-items-center text-white">
        <div className="h-full max-h-screen w-full bg-gray-50 p-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Header />
            <Outlet />
          </div>
        </div>
        {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
      </div>
    </>
  );
}

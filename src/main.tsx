import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { type AxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import {routeTree} from  './routeTree.gen'

const router = createRouter({routeTree})

const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router : typeof router
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}

if (import.meta.env.VITE_APP_TITLE) {
  document.title = import.meta.env.VITE_APP_TITLE
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)

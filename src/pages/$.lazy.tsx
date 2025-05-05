import { createLazyFileRoute } from '@tanstack/react-router';
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Route = createLazyFileRoute('/$')({
  component: NotFound,
});

function NotFound() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('not-found-content');
      if (element) {
        element.classList.remove('opacity-0', 'translate-y-4');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-gradient-to-br p-4 text-white">
      <div
        id="not-found-content"
        className="w-full max-w-md translate-y-4 rounded-xl bg-gray-800 p-8 opacity-0 shadow-2xl transition-all duration-500"
      >
        {/* Icon and Title */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-red-500">
            <AlertCircle size={64} className="text-white" />
          </div>
          <h1 className="mb-2 text-center text-4xl font-bold">404</h1>
          <p className="text-center text-xl text-gray-300">Page Not Found</p>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

        {/* Message */}
        <p className="mb-8 text-center text-gray-300">
          Oops! The page you're looking for seems to have gone on vacation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleGoBack}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-3 text-white transition-colors duration-300 hover:bg-gray-600"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <button
            onClick={handleRefresh}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white transition-colors duration-300 hover:bg-indigo-500"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

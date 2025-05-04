/// <reference types="vite-plugin-svgr/client" />

export {};

declare global {
  interface Transaction {
    id: number;
    name: string;
    type: 'expense' | 'income';
    amount: number;
    date: Date;
    category: string;
    userId: string;
  }

  interface Category {
    _id?: number;
    name: string;
    monthlyLimit: number;
    userId: string;
  }

  const userID = '680d07785da0e057a10ccca6';
}

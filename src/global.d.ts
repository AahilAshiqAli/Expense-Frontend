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
}

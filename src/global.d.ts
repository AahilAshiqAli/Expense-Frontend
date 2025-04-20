/// <reference types="vite-plugin-svgr/client" />

export {};

declare global {
  interface Transaction {
    id: number;
    name: string;
    type: 'expense' | 'income';
    price: number;
    date: Date;
    category: string;
  }
}

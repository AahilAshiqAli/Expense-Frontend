import { z } from 'zod';

// Define schema for environment variables
export const env = z.object({
  VITE_APP_TITLE: z.string().min(1).optional(),
});



type Environment = Readonly<z.infer<typeof env>>;

export type ClientEnvironment = {
  readonly [K in Extract<keyof Environment, `VITE_${string}`>]: Environment[K];
};

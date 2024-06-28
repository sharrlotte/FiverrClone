import { z } from 'zod';

const configSchema = z.object({
  url: z.object({
    base: z.string(),
    backend_url: z.string(),
  }),
});

const env = configSchema.parse({
  url: {
    base: process.env.BASE_URL,
    backend_url: 'process.env.BACKEND_URL',
  },
});

export default env;

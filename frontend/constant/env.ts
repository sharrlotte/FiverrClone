import { z } from 'zod';

const configSchema = z.object({
  url: z.object({
    base: z.string(),
    backend_url: z.string(),
  }),
});

const env = configSchema.parse({
  url: {
    base: 'http://localhost:3000',
    backend_url: 'http://localhost:8080/api/v1',
  },
});

export default env;

import { z } from 'zod';

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  q: z.string().nullable().default(''),
});

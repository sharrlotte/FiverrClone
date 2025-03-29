import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Tên thể loại phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Tên thể loại phải ít hơn 100 kí tự' }),

  description: z
    .string()
    .min(4, {
      message: 'Chú thích thể loại phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Chú thích thể loại phải ít hơn 100 kí tự' }),

  categoryId: z.number(),
});

export type CreateSkillRequest = z.infer<typeof createSkillSchema>;

export type UpdateSkillRequest = CreateSkillRequest;

export const getSkillSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Tên thể loại phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Tên thể loại phải ít hơn 100 kí tự' })
    .optional(),

  page: z.number().min(1),
  size: z.number().max(50),
});

export type GetSkillRequest = z.infer<typeof getSkillSchema>;

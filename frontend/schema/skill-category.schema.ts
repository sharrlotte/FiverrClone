import { z } from 'zod';

export const createSkillCategorySchema = z.object({
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
});

export type CreateSkillCategoryRequest = z.infer<typeof createSkillCategorySchema>;

export type UpdateSkillCategoryRequest = CreateSkillCategoryRequest;

export const getSkillCategorySchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Tên thể loại phải nhiều hơn 4 kí tự',
    })
    .max(80, { message: 'Tên thể loại phải ít hơn 100 kí tự' })
    .optional(),

  page: z.number().min(1),
  size: z.number().max(50),
});

export type GetSkillCategoryRequest = z.infer<typeof getSkillCategorySchema>;

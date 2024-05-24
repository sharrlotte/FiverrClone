import { z } from 'zod';

export const createPostCategorySchema = z.object({
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

  parentId: z.number().nullable(),
});

export type CreatePostCategoryRequest = z.infer<typeof createPostCategorySchema>;

export type UpdatePostCategoryRequest = CreatePostCategoryRequest;

export const getPostCategorySchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Tên thể loại phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Tên thể loại phải ít hơn 100 kí tự' })
    .optional(),

  page: z.number().min(0),
  size: z.number().max(50),
});

export type GetPostCategoryRequest = z.infer<typeof getPostCategorySchema>;

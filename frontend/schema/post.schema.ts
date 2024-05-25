import { z } from 'zod';

export const packageCreateSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: 'Tựa đề phải nhiều hơn 4 kí tự',
    })
    .max(200, { message: 'Tựa đề phải ít hơn 40 kí tự' }),

  description: z
    .string()
    .min(4, {
      message: 'Chú thích thể loại phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Chú thích thể loại phải ít hơn 100 kí tự' }),
  revision: z.coerce.number().int().min(0, { message: 'Số lần sửa ít nhất là 0' }),
  deliveryTime: z.date(),
  price: z.coerce.number().int().min(10000, { message: 'Giá phải lớn hơn 10000' }),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: 'Tựa đề phải nhiều hơn 4 kí tự',
    })
    .max(200, { message: 'Tựa đề phải ít hơn 200 kí tự' }),

  content: z
    .string()
    .min(100, {
      message: 'Nội dung phải nhiều hơn 100 kí tự',
    })
    .max(10000, { message: 'Nộ dung phải ít hơn 10000 kí tự' }),

  categories: z.array(z.number()).min(1, 'Phải có ít nhất 1 thể loại cho bài đăng').max(10, 'Tối đa 10 thể loại cho bài đăng'),
  package: z.array(packageCreateSchema),
});

export type CreatePostRequest = z.infer<typeof createPostSchema>;

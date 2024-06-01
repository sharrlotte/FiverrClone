import { durationTypes } from '@/constant/enum';
import { FileListSchema } from '@/schema/common.schema';
import { z } from 'zod';

export const createPackageSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: 'Tên gói phải nhiều hơn 4 kí tự',
    })
    .max(200, { message: 'Tên gói phải ít hơn 40 kí tự' }),

  description: z
    .string()
    .min(4, {
      message: 'Mô tả phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Mô tả phải ít hơn 100 kí tự' }),
  revision: z.coerce.number().int().min(0, { message: 'Số lần sửa ít nhất là 0' }),
  deliveryTime: z.coerce.number().min(1, { message: 'Thời gian phải lớn hơn 0' }),
  durationType: z.enum(durationTypes),
  price: z.coerce.number().int().min(100000, { message: 'Giá phải lớn hơn 100000' }),
});

export type CreatePackageRequest = z.infer<typeof createPackageSchema>;

export const createPostSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: 'Tựa đề phải nhiều hơn 4 kí tự',
    })
    .max(200, { message: 'Tựa đề phải ít hơn 200 kí tự' }),

  content: z.object({
    text: z
      .string()
      .min(100, {
        message: 'Nội dung phải nhiều hơn 100 kí tự',
      })
      .max(10000, { message: 'Nộ dung phải ít hơn 10000 kí tự' }),
    images: z.array(z.any()),
  }),

  categories: z.array(z.number()).min(1, 'Phải có ít nhất 1 thể loại cho bài đăng').max(10, 'Tối đa 10 thể loại cho bài đăng'),
  packages: z.array(createPackageSchema).min(1, 'Phải có ít nhất 1 đơn giá').max(10, 'Tối đa chỉ có thể có 10 đơn giá'),
  images: FileListSchema,
});

export type CreatePostRequest = z.infer<typeof createPostSchema>;

export const getPostSchema = z.object({
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

export type GetPostRequest = z.infer<typeof getPostSchema>;

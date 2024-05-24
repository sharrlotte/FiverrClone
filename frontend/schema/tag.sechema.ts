import { size } from 'lodash';
import { z } from 'zod';

export const createTagSchema = z.object({
    name: z
        .string()
        .min(4, {
            message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
        })
        .max(80, { message: 'Tên sản phẩm phải ít hơn 80 kí tự' }),

    description: z
        .string()
        .min(4, {
            message: 'Chú thích sản phẩm phải nhiều hơn 4 kí tự',
        })
        .max(1000, { message: 'Chú thích sản phẩm phải ít hơn 1000 kí tự' }),
});

export type CreateTagRequest = z.infer<typeof createTagSchema>;

export type UpdateTagRequest = CreateTagRequest;

export const getTagSchema = z.object({
    name: z
        .string()
        .min(4, {
            message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
        })
        .max(80, { message: 'Tên sản phẩm phải ít hơn 80 kí tự' })
        .optional(),

    page: z.number().min(0),
    size: z.number().max(50),
});

export type GetTagRequest = z.infer<typeof getTagSchema>;

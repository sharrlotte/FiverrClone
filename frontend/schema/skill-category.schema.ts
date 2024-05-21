import { size } from "lodash";
import { z } from "zod";

export const createSkillCategorySchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Tên sản phẩm phải nhiều hơn 4 kí tự",
    })
    .max(80, { message: "Tên sản phẩm phải ít hơn 40 kí tự" }),

  description: z
    .string()
    .min(4, {
      message: "Chú thích sản phẩm phải nhiều hơn 4 kí tự",
    })
    .max(1000, { message: "Chú thích sản phẩm phải ít hơn 200 kí tự" }),
});

export type CreateSkillCategoryRequest = z.infer<
  typeof createSkillCategorySchema
>;

export const getSkillCategorySchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Tên sản phẩm phải nhiều hơn 4 kí tự",
    })
    .max(80, { message: "Tên sản phẩm phải ít hơn 40 kí tự" })
    .optional(),

  page: z.number().min(0),
  size: z.number().max(50),
});

export type GetSkillCategoryRequest = z.infer<typeof getSkillCategorySchema>;
